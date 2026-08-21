import { copyFile, mkdir, readdir } from "node:fs/promises";
import { resolve } from "node:path";

const categorySlugs = [
  "ses-kulaklik",
  "elektronik-aksesuar",
  "kucuk-ev-aletleri",
  "kisisel-bakim",
  "canta-aksesuar",
  "kahve-mutfak",
  "ev-yasam",
  "oto-aksesuar",
  "guvenlik-seyahat",
  "ai-giyilebilir-teknoloji",
  "goruntu-eglence",
];

const staticPages = ["products", "categories", "contact", "cart", "admin"];
const productSlugs = await readdir(resolve("public/images/products"));
const routes = [
  ...staticPages,
  ...categorySlugs.map((slug) => `products/category/${slug}`),
  ...productSlugs.map((slug) => `products/${slug}`),
];

const source = resolve("dist/index.html");

await Promise.all(routes.map(async (route) => {
  const directory = resolve("dist", route);
  await mkdir(directory, { recursive: true });
  await copyFile(source, resolve(directory, "index.html"));
}));

console.log(`Generated ${routes.length} GitHub Pages route entries.`);
