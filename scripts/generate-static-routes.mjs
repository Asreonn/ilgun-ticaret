import { copyFile, mkdir } from "node:fs/promises";
import { resolve } from "node:path";

const routes = [
  "products",
  "categories",
  "contact",
  "cart",
  "admin",
  "products/category/ses-kulaklik",
  "products/category/elektronik-aksesuar",
  "products/category/kucuk-ev-aletleri",
  "products/category/kisisel-bakim",
  "products/category/canta-aksesuar",
  "products/yesido-wb65",
  "products/linkage-lkb-39",
  "products/blic-bls-92",
  "products/blic-bls-96",
  "products/blic-bls-74",
  "products/yesido-ec27",
  "products/cy-818",
];

const source = resolve("dist/index.html");

await Promise.all(routes.map(async (route) => {
  const directory = resolve("dist", route);
  await mkdir(directory, { recursive: true });
  await copyFile(source, resolve(directory, "index.html"));
}));

console.log(`Generated ${routes.length} GitHub Pages route entries.`);
