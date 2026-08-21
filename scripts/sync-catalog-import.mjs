#!/usr/bin/env node
/**
 * Build SQL migration + fallback catalog module from import spec/manifest.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const spec = JSON.parse(await readFile(join(root, "scripts/data/catalog-import.json"), "utf8"));
const manifest = JSON.parse(await readFile(join(root, "scripts/data/import-manifest.json"), "utf8"));
const bySlug = new Map(manifest.products.map((item) => [item.slug, item]));

const categories = [
  { id: "10000000-0000-0000-0000-000000000006", slug: "kahve-mutfak", name: "Kahve & Mutfak", description: "Taşınabilir kettle, espresso ve mutfak ürünleri", sort_order: 6, fallbackId: "coffee" },
  { id: "10000000-0000-0000-0000-000000000007", slug: "ev-yasam", name: "Ev & Yaşam", description: "Ütü, temizlik ve günlük yaşam ürünleri", sort_order: 7, fallbackId: "living" },
  { id: "10000000-0000-0000-0000-000000000008", slug: "oto-aksesuar", name: "Oto Aksesuar", description: "Araç içi temizlik ve lastik bakım ürünleri", sort_order: 8, fallbackId: "auto" },
  { id: "10000000-0000-0000-0000-000000000009", slug: "guvenlik-seyahat", name: "Güvenlik & Seyahat", description: "Kilit ve seyahat güvenlik ürünleri", sort_order: 9, fallbackId: "security" },
  { id: "10000000-0000-0000-0000-000000000010", slug: "ai-giyilebilir-teknoloji", name: "AI & Giyilebilir Teknoloji", description: "Akıllı gözlük ve giyilebilir cihazlar", sort_order: 10, fallbackId: "wearable" },
  { id: "10000000-0000-0000-0000-000000000011", slug: "goruntu-eglence", name: "Görüntü & Eğlence", description: "Projektör ve görüntü ürünleri", sort_order: 11, fallbackId: "display" }
];

const existingCategory = {
  "Ses & Kulaklık": { id: "10000000-0000-0000-0000-000000000001", fallbackId: "audio" },
  "Elektronik Aksesuar": { id: "10000000-0000-0000-0000-000000000002", fallbackId: "electronics" },
  "Küçük Ev Aletleri": { id: "10000000-0000-0000-0000-000000000003", fallbackId: "home" },
  "Kişisel Bakım": { id: "10000000-0000-0000-0000-000000000004", fallbackId: "care" },
  "Çanta & Aksesuar": { id: "10000000-0000-0000-0000-000000000005", fallbackId: "bags" }
};
for (const item of categories) existingCategory[item.name] = { id: item.id, fallbackId: item.fallbackId };

function sqlStr(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function dollar(value) {
  return `$d$${value}$d$`;
}

const imported = spec.filter((product) => (bySlug.get(product.slug)?.images || []).length > 0);
const skipped = spec.filter((product) => !(bySlug.get(product.slug)?.images || []).length);

let sql = `-- Add 20 imported products with local galleries and image provenance.
alter table public.product_images
  add column if not exists source_image_url text;

`;

sql += "insert into public.categories (id, slug, name, description, sort_order) values\n";
sql += categories.map((item) => `(${sqlStr(item.id)}, ${sqlStr(item.slug)}, ${sqlStr(item.name)}, ${sqlStr(item.description)}, ${item.sort_order})`).join(",\n");
sql += "\non conflict (slug) do update set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, active = true;\n\n";

for (const product of imported) {
  const images = bySlug.get(product.slug).images;
  const category = existingCategory[product.category];
  sql += `insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  ${sqlStr(product.id)}, ${sqlStr(product.slug)}, ${sqlStr(product.name)}, ${sqlStr(product.brand)}, ${sqlStr(product.model)},
  ${sqlStr(category.id)}, ${dollar(product.short_description)}, ${dollar(product.description)},
  null, null, 'TRY', 0, 'contact', ${product.featured}, true, ${sqlStr(images[0].image_path)}, ${sqlStr(product.source_url)}, ${product.sort_order}
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower(${sqlStr(product.model)})
    and coalesce(lower(existing.brand), '') = lower(${sqlStr(product.brand)})
    and existing.slug <> ${sqlStr(product.slug)}
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;\n\n`;
  sql += `delete from public.product_images where product_id = ${sqlStr(product.id)};\n`;
  sql += `delete from public.product_features where product_id = ${sqlStr(product.id)};\n`;
  sql += "insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values\n";
  sql += images.map((image, index) => `(${sqlStr(product.id)}, ${sqlStr(image.image_path)}, ${sqlStr(image.alt_text)}, ${index}, ${sqlStr(image.source_image_url)})`).join(",\n");
  sql += ";\n";
  sql += "insert into public.product_features (product_id, label, value, sort_order) values\n";
  sql += product.features.map((feature, index) => `(${sqlStr(product.id)}, ${sqlStr(feature[0])}, ${sqlStr(feature[1])}, ${index})`).join(",\n");
  sql += ";\n\n";
}

const migrationPath = join(root, "supabase/migrations/20260821193000_add_20_imported_products.sql");
await writeFile(migrationPath, sql);

const ts = `import type { Category, Product } from "../types";

export const importedCategories: Category[] = ${JSON.stringify(categories.map(({ id: _uuid, fallbackId, ...rest }) => ({ id: fallbackId, ...rest, active: true })), null, 2)};

const categoryByName: Record<string, string> = ${JSON.stringify(Object.fromEntries(Object.entries(existingCategory).map(([name, value]) => [name, value.fallbackId])), null, 2)};

export const importedProducts: Product[] = ${JSON.stringify(imported.map((product) => {
  const images = bySlug.get(product.slug).images;
  return {
    id: `seed-${product.model.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    model: product.model,
    category_id: existingCategory[product.category].fallbackId,
    short_description: product.short_description,
    description: product.description,
    price: null,
    old_price: null,
    currency: "TRY",
    stock_quantity: 0,
    stock_status: "contact",
    featured: product.featured,
    active: true,
    sort_order: product.sort_order,
    main_image: images[0].image_path,
    source_url: product.source_url,
    product_images: images.map((image, index) => ({
      image_path: image.image_path,
      alt_text: image.alt_text,
      sort_order: index,
      source_image_url: image.source_image_url
    })),
    product_features: product.features.map((feature, index) => ({ label: feature[0], value: feature[1], sort_order: index }))
  };
}), null, 2).replaceAll("\\/", "/")};

export const importedCategoryIdByName = categoryByName;
`;

await mkdir(join(root, "src/data"), { recursive: true });
await writeFile(join(root, "src/data/importedProducts.ts"), `${ts}\n`);
console.log(`Wrote ${migrationPath}`);
console.log(`Imported ${imported.length}, skipped ${skipped.length}: ${skipped.map((item) => item.model).join(", ") || "NONE"}`);
