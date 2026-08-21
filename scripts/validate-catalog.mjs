#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const spec = JSON.parse(await readFile(join(root, "scripts/data/catalog-import.json"), "utf8"));
const manifest = JSON.parse(await readFile(join(root, "scripts/data/import-manifest.json"), "utf8"));
const catalogSource = await readFile(join(root, "src/data/catalog.ts"), "utf8");
const importedSource = await readFile(join(root, "src/data/importedProducts.ts"), "utf8");

const existingSlugs = ["yesido-wb65", "linkage-lkb-39", "blic-bls-92", "blic-bls-96", "blic-bls-74", "yesido-ec27", "cy-818"];
const failures = [];
const report = {
  productsTotal: 0,
  newProducts: spec.length,
  missingImages: [],
  brokenLocalImages: [],
  duplicateSlugs: [],
  duplicateModels: [],
  missingSourceUrl: [],
  missingProductImages: [],
  externalHotlinks: [],
  invalidCategory: [],
  zeroByte: []
};

const allowedCategories = new Set([
  "Ses & Kulaklık", "Elektronik Aksesuar", "Küçük Ev Aletleri", "Kişisel Bakım", "Çanta & Aksesuar",
  "Kahve & Mutfak", "Ev & Yaşam", "Oto Aksesuar", "Güvenlik & Seyahat", "AI & Giyilebilir Teknoloji", "Görüntü & Eğlence"
]);

const slugs = [...existingSlugs, ...spec.map((item) => item.slug)];
const models = spec.map((item) => item.model.toLowerCase());
report.duplicateSlugs = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
report.duplicateModels = models.filter((model, index) => models.indexOf(model) !== index);

for (const product of spec) {
  if (!product.source_url) report.missingSourceUrl.push(product.model);
  if (!allowedCategories.has(product.category)) report.invalidCategory.push(`${product.model}:${product.category}`);
  const imported = manifest.products.find((item) => item.slug === product.slug);
  const images = imported?.images || [];
  if (!images.length) {
    report.missingImages.push(product.model);
    report.missingProductImages.push(product.model);
    continue;
  }
  const dir = join(root, "public/images/products", product.slug);
  const files = await readdir(dir).catch(() => []);
  if (!files.includes("main.webp")) report.missingImages.push(product.model);
  for (const image of images) {
    const path = join(root, "public", image.image_path);
    try {
      const info = await stat(path);
      if (info.size === 0) report.zeroByte.push(image.image_path);
      if (info.size < 1000) report.brokenLocalImages.push(image.image_path);
    } catch {
      report.brokenLocalImages.push(image.image_path);
    }
    if (/^https?:\/\//.test(image.image_path) || /^https?:\/\//.test(product.main_image || "")) {
      report.externalHotlinks.push(product.model);
    }
  }
}

const productDirs = await readdir(join(root, "public/images/products"));
report.productsTotal = productDirs.length;
for (const slug of [...existingSlugs, ...spec.map((item) => item.slug)]) {
  if (!catalogSource.includes(slug) && !importedSource.includes(slug)) failures.push(`fallback catalog missing ${slug}`);
}

const ok = !report.missingImages.length && !report.brokenLocalImages.length && !report.duplicateSlugs.length && !report.duplicateModels.length && !report.zeroByte.length && !report.externalHotlinks.length && !failures.length;
console.log(JSON.stringify({ ok, ...report, extraFailures: failures }, null, 2));
if (!ok) process.exit(1);
