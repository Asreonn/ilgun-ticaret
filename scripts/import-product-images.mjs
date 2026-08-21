#!/usr/bin/env node
/**
 * Download product gallery images from an authoritative source page,
 * convert them to local WebP files, and write provenance metadata.
 *
 * Usage:
 *   node scripts/import-product-images.mjs
 *   node scripts/import-product-images.mjs --slug by-k36b-sarjli-akilli-seyahat-kettle
 */
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { mkdir, readFile, rm, writeFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const specPath = join(root, "scripts/data/catalog-import.json");
const manifestPath = join(root, "scripts/data/import-manifest.json");
const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";
const MAX_IMAGES = 6;
const REJECT_HOST = /micstatic|payment-method|paypal|apple-pay|google-pay|trade-assurance/i;
const REJECT_PATH = /\/206f0j00|\/312f0j00|\/313f0j00|\/318f0j00|\/229f0j00|mp4\.webp|\/logo|avatar|favicon|qr[-_]?code/i;
const SIZE_PREFIXES = ["2f0j00", "203f0j00", "226f0j00", "202f0j00"];

const args = new Set(process.argv.slice(2));
const slugArg = process.argv.includes("--slug") ? process.argv[process.argv.indexOf("--slug") + 1] : null;

function decode(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/\\u0026/g, "&")
    .replace(/\\\//g, "/");
}

function extractImageId(value) {
  const match = String(value).match(/(\d+[a-z]?\d*j00)([A-Za-z0-9]+)/i);
  return match ? { prefix: match[1], id: match[2] } : null;
}

function cdnUrl(id, prefix = "2f0j00") {
  return `https://image.made-in-china.com/${prefix}${id}/product.webp`;
}

function normalizeUrl(raw) {
  if (!raw) return null;
  let url = decode(raw).trim();
  if (url.startsWith("//")) url = `https:${url}`;
  if (!/^https?:\/\//i.test(url)) return null;
  return url.split("?")[0];
}

function imageKey(url) {
  const parsed = extractImageId(url);
  return parsed?.id || url;
}

function looksLikeProductImage(url) {
  if (!url) return false;
  const lower = url.toLowerCase();
  if (REJECT_HOST.test(lower) || REJECT_PATH.test(lower)) return false;
  if (!/image\.made-in-china\.com|img\.made-in-china\.com/i.test(lower)) return false;
  return Boolean(extractImageId(url));
}

function extractJsonLd(html) {
  const blocks = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  for (const match of html.matchAll(re)) {
    try { blocks.push(JSON.parse(match[1])); } catch { /* ignore malformed */ }
  }
  return blocks.flatMap((block) => Array.isArray(block) ? block : [block]);
}

function flatten(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.flatMap(flatten);
  if (typeof value === "object") return Object.values(value).flatMap(flatten);
  return [String(value)];
}

function extractPageModel(html) {
  const decoded = decode(html);
  const models = new Set();
  const jsonLd = extractJsonLd(decoded);
  for (const block of jsonLd) {
    for (const prop of block.additionalProperty || []) {
      if (/model/i.test(prop.name || "") && prop.value) models.add(decode(String(prop.value)).trim());
    }
    if (block.model) models.add(decode(String(block.model)).trim());
    if (block.sku) models.add(decode(String(block.sku)).trim());
    if (block.mpn) models.add(decode(String(block.mpn)).trim());
    if (block.name) models.add(decode(String(block.name)).trim());
  }
  const attr = decoded.match(/<dt[^>]*>\s*Model\s*NO\.?\s*<\/dt>\s*<dd[^>]*>\s*([^<]+)/i);
  if (attr) models.add(attr[1].replace(/<[^>]+>/g, " ").trim());
  for (const match of decoded.matchAll(/Model\s*(?:NO\.?|Number|Code)\s*[:：</\w\s"=-]{0,80}>\s*([^<]{1,40})/gi)) {
    models.add(match[1].replace(/<[^>]+>/g, " ").trim());
  }
  const title = decoded.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "";
  const h1 = decoded.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, " ") || "";
  return { models: [...models].filter(Boolean), title: `${title} ${h1}`.replace(/\s+/g, " ").trim(), jsonLd, text: decoded };
}

function modelMatches(expected, found, haystack) {
  const want = expected.trim().toUpperCase();
  const escaped = want.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const compact = want.replace(/[\s_-]/g, "");
  const token = new RegExp(`(?:^|[^A-Z0-9])${escaped}(?:[^A-Z0-9]|$)`, "i");
  const candidates = found.map((item) => decode(item).trim().toUpperCase());
  if (candidates.some((item) => item === want || item.replace(/[\s_-]/g, "") === compact || token.test(item))) return true;
  return token.test(decode(haystack).toUpperCase());
}

function collectRawUrls(html) {
  const urls = [];
  const push = (raw) => {
    const url = normalizeUrl(raw);
    if (looksLikeProductImage(url)) urls.push(url);
  };
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const isGallery = /J-picImg-zoom-in|sr-proMainImg|pro-gallery|J-picImg|data-index=["']\d/.test(tag);
    if (!isGallery) continue;
    for (const attr of ["src", "data-src", "data-original", "data-lazy", "data-zoom-image"]) {
      const value = tag.match(new RegExp(`${attr}=["']([^"']+)["']`, "i"));
      if (value) push(value[1]);
    }
    const srcset = tag.match(/srcset=["']([^"']+)["']/i);
    if (srcset) srcset[1].split(",").forEach((part) => push(part.trim().split(/\s+/)[0]));
  }
  for (const block of extractJsonLd(html)) {
    if (String(block["@type"] || "").includes("Product")) flatten(block.image).forEach(push);
  }
  const og = html.match(/property=["']og:image["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/content=["']([^"']+)["'][^>]*property=["']og:image["']/i);
  if (og) push(og[1]);
  return urls;
}

function extractGallery(html) {
  const seen = new Set();
  const unique = [];
  for (const url of collectRawUrls(html)) {
    const parsed = extractImageId(url);
    if (!parsed || seen.has(parsed.id)) continue;
    seen.add(parsed.id);
    unique.push(cdnUrl(parsed.id));
  }
  return unique.slice(0, MAX_IMAGES);
}

function extractNotes(html, product) {
  const notes = [];
  const text = html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (/40\s*langu/i.test(text) || /40 languages/i.test(text)) notes.push("source mentions 40 languages");
  if (/turkish|türkçe|turkish language/i.test(text)) notes.push("source mentions Turkish language");
  if (/us plug|usa plug|american plug/i.test(text)) notes.push("source lists US plug variant");
  if (/220-?240\s*v/i.test(text)) notes.push("source lists 220-240V");
  if (/110\s*v/i.test(text)) notes.push("source lists 110V");
  if (product.model === "EG12" && !/40/.test(text)) notes.push("40-language claim not clearly listed on source page");
  return notes;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "text/html,application/xhtml+xml", "Accept-Language": "en-US,en;q=0.9" },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return response.text();
}

async function fetchBinary(url) {
  const response = await fetch(url, {
    headers: { "User-Agent": UA, Accept: "image/avif,image/webp,image/apng,image/*,*/*;q=0.8", Referer: "https://www.made-in-china.com/" },
    redirect: "follow"
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  return Buffer.from(await response.arrayBuffer());
}

function convertWebp(inputPath, outputPath) {
  execFileSync("magick", [
    inputPath,
    "-auto-orient",
    "-resize", "1600x1600>",
    "-strip",
    "-quality", "82",
    "-define", "webp:method=6",
    outputPath
  ], { stdio: "pipe" });
}

function imageInfo(path) {
  const raw = execFileSync("magick", ["identify", "-format", "%w %h %b", path], { encoding: "utf8" }).trim();
  const [width, height, bytes] = raw.split(/\s+/);
  return { width: Number(width), height: Number(height), bytes: Number(String(bytes).replace(/[^\d]/g, "")) || 0 };
}

async function downloadProduct(product) {
  const html = await fetchText(product.image_source_page);
  const page = extractPageModel(html);
  const haystack = `${page.title}\n${page.models.join("\n")}\n${page.text}`;
  if (!modelMatches(product.model, page.models, haystack)) {
    return {
      slug: product.slug,
      model: product.model,
      status: "SKIPPED_MODEL_VERIFICATION_FAILED",
      foundModels: page.models,
      title: page.title,
      images: []
    };
  }
  let gallery = extractGallery(html);
  if (product.known_image_candidate) {
    const candidate = extractImageId(product.known_image_candidate);
    const onPage = candidate && (gallery.some((url) => imageKey(url) === candidate.id) || html.includes(candidate.id));
    if (onPage && !gallery.some((url) => imageKey(url) === candidate.id)) {
      gallery = [cdnUrl(candidate.id), ...gallery].slice(0, MAX_IMAGES);
    }
  }
  const dir = join(root, "public/images/products", product.slug);
  await rm(dir, { recursive: true, force: true });
  await mkdir(dir, { recursive: true });
  const saved = [];
  const hashes = new Set();
  const tmpDir = join(dir, ".tmp");
  await mkdir(tmpDir, { recursive: true });
  for (const sourceUrl of gallery) {
    try {
      let buffer = null;
      let usedUrl = sourceUrl;
      const id = imageKey(sourceUrl);
      const candidates = SIZE_PREFIXES.map((prefix) => cdnUrl(id, prefix));
      for (const candidate of candidates) {
        try {
          const next = await fetchBinary(candidate);
          if (!buffer || next.length > buffer.length) {
            buffer = next;
            usedUrl = candidate;
          }
          if (buffer.length >= 20_000) break;
        } catch { /* try next CDN size */ }
      }
      if (!buffer || buffer.length < 4_000) continue;
      const sha = createHash("sha256").update(buffer).digest("hex");
      if (hashes.has(sha)) continue;
      hashes.add(sha);
      const tmp = join(tmpDir, `${saved.length}.bin`);
      await writeFile(tmp, buffer);
      const name = saved.length === 0 ? "main.webp" : `${String(saved.length).padStart(2, "0")}.webp`;
      const dest = join(dir, name);
      convertWebp(tmp, dest);
      const info = imageInfo(dest);
      if (info.width < 200 || info.height < 200) {
        await rm(dest, { force: true });
        continue;
      }
      const alt = saved.length === 0
        ? product.alt_main
        : `${product.model} ${product.name.split(" ").slice(0, 4).join(" ").toLocaleLowerCase("tr-TR")} görünüm ${saved.length}`;
      saved.push({
        file: name,
        image_path: `images/products/${product.slug}/${name}`,
        source_image_url: usedUrl,
        alt_text: alt,
        sort_order: saved.length,
        width: info.width,
        height: info.height,
        bytes: (await stat(dest)).size,
        sha256: sha
      });
    } catch (error) {
      console.warn(`  skip image ${sourceUrl}: ${error.message}`);
    }
  }
  await rm(tmpDir, { recursive: true, force: true });
  return {
    slug: product.slug,
    model: product.model,
    status: saved.length ? "IMPORTED" : "NO_IMAGES",
    foundModels: page.models,
    notes: extractNotes(html, product),
    imageCount: saved.length,
    images: saved
  };
}

const products = JSON.parse(await readFile(specPath, "utf8"));
const selected = slugArg ? products.filter((item) => item.slug === slugArg) : products;
if (!selected.length) {
  console.error("No matching products.");
  process.exit(1);
}

const results = [];
for (const product of selected) {
  process.stdout.write(`Importing ${product.model} (${product.slug})… `);
  try {
    const result = await downloadProduct(product);
    results.push(result);
    console.log(`${result.status} (${result.imageCount || 0} images)${result.foundModels?.length ? ` models=${result.foundModels.join("|")}` : ""}`);
    if (result.notes?.length) console.log(`  notes: ${result.notes.join("; ")}`);
  } catch (error) {
    results.push({ slug: product.slug, model: product.model, status: "ERROR", error: error.message, images: [] });
    console.log(`ERROR ${error.message}`);
  }
}

let manifest = { generatedAt: new Date().toISOString(), products: results };
if (slugArg) {
  try {
    const previous = JSON.parse(await readFile(manifestPath, "utf8"));
    const map = new Map((previous.products || []).map((item) => [item.slug, item]));
    for (const item of results) map.set(item.slug, item);
    manifest = { generatedAt: new Date().toISOString(), products: [...map.values()] };
  } catch { /* first run */ }
}
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Wrote ${manifestPath}`);
