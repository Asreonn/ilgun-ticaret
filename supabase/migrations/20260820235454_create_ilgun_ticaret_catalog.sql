create extension if not exists pgcrypto;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null default '',
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]+$'),
  name text not null,
  brand text,
  model text not null,
  category_id uuid not null references public.categories(id),
  short_description text not null default '',
  description text not null default '',
  price numeric(12,2) check (price is null or price >= 0),
  old_price numeric(12,2) check (old_price is null or old_price >= 0),
  currency text not null default 'TRY',
  stock_quantity integer not null default 0 check (stock_quantity >= 0),
  stock_status text not null default 'contact' check (stock_status in ('in_stock','low_stock','out_of_stock','contact')),
  featured boolean not null default false,
  active boolean not null default true,
  main_image text not null,
  source_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  image_path text not null,
  alt_text text not null default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.product_features (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  label text not null,
  value text not null default '',
  sort_order integer not null default 0
);

create table public.site_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  updated_at timestamptz not null default now()
);

create table public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index products_active_sort_idx on public.products(active, sort_order);
create index products_category_idx on public.products(category_id);
create index product_images_product_idx on public.product_images(product_id, sort_order);
create index product_features_product_idx on public.product_features(product_id, sort_order);

create function public.set_updated_at()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger settings_updated_at before update on public.site_settings for each row execute function public.set_updated_at();

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.product_images enable row level security;
alter table public.product_features enable row level security;
alter table public.site_settings enable row level security;
alter table public.admin_users enable row level security;

grant usage on schema public to anon, authenticated;
grant select on public.categories, public.products, public.product_images, public.product_features, public.site_settings to anon;
grant select, insert, update, delete on public.categories, public.products, public.product_images, public.product_features, public.site_settings to authenticated;
grant select on public.admin_users to authenticated;

create policy "public reads active categories" on public.categories for select to anon using (active = true);
create policy "admins read all categories" on public.categories for select to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins insert categories" on public.categories for insert to authenticated with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins update categories" on public.categories for update to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins delete categories" on public.categories for delete to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "public reads active products" on public.products for select to anon using (active = true);
create policy "admins read all products" on public.products for select to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins insert products" on public.products for insert to authenticated with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins update products" on public.products for update to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins delete products" on public.products for delete to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "public reads active product images" on public.product_images for select to anon using (exists (select 1 from public.products p where p.id = product_id and p.active = true));
create policy "admins read product images" on public.product_images for select to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins insert product images" on public.product_images for insert to authenticated with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins update product images" on public.product_images for update to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins delete product images" on public.product_images for delete to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "public reads active product features" on public.product_features for select to anon using (exists (select 1 from public.products p where p.id = product_id and p.active = true));
create policy "admins read product features" on public.product_features for select to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins insert product features" on public.product_features for insert to authenticated with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins update product features" on public.product_features for update to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins delete product features" on public.product_features for delete to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

create policy "public reads settings" on public.site_settings for select to anon using (true);
create policy "admins read settings" on public.site_settings for select to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins insert settings" on public.site_settings for insert to authenticated with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins update settings" on public.site_settings for update to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid()))) with check (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins delete settings" on public.site_settings for delete to authenticated using (exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins identify themselves" on public.admin_users for select to authenticated using (id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-images', 'product-images', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;
create policy "admins upload product images" on storage.objects for insert to authenticated with check (bucket_id = 'product-images' and exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins select product images" on storage.objects for select to authenticated using (bucket_id = 'product-images' and exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins update product images" on storage.objects for update to authenticated using (bucket_id = 'product-images' and exists (select 1 from public.admin_users a where a.id = (select auth.uid()))) with check (bucket_id = 'product-images' and exists (select 1 from public.admin_users a where a.id = (select auth.uid())));
create policy "admins delete product images" on storage.objects for delete to authenticated using (bucket_id = 'product-images' and exists (select 1 from public.admin_users a where a.id = (select auth.uid())));

insert into public.categories (id, slug, name, description, sort_order) values
('10000000-0000-0000-0000-000000000001','ses-kulaklik','Ses & Kulaklık','Kulaklıklar ve taşınabilir ses ürünleri',1),
('10000000-0000-0000-0000-000000000002','elektronik-aksesuar','Elektronik Aksesuar','Günlük kullanım için pratik elektronik aksesuarlar',2),
('10000000-0000-0000-0000-000000000003','kucuk-ev-aletleri','Küçük Ev Aletleri','Mutfak ve ev yaşamını kolaylaştıran ürünler',3),
('10000000-0000-0000-0000-000000000004','kisisel-bakim','Kişisel Bakım','Günlük bakım ve rahatlama ürünleri',4),
('10000000-0000-0000-0000-000000000005','canta-aksesuar','Çanta & Aksesuar','Teknolojiyle uyumlu çanta ve aksesuarlar',5);

insert into public.products (id,slug,name,brand,model,category_id,short_description,description,price,old_price,stock_quantity,stock_status,featured,active,main_image,source_url,sort_order) values
('20000000-0000-0000-0000-000000000001','yesido-wb65','YESIDO WB65 Parmak İzi Kilitli Akıllı Sırt Çantası','YESIDO','WB65','10000000-0000-0000-0000-000000000005','Parmak izi kilidi, düzenli cihaz bölmeleri ve dayanıklı dış yüzeyi bir araya getiren akıllı sırt çantası.','YESIDO WB65; günlük kullanım, işe gidiş ve seyahat sırasında elektronik cihazları düzenli taşımak için tasarlanmıştır. Parmak iziyle çalışan kilidi erişim kontrolünü kolaylaştırırken Oxford kumaş ve PU dış yüzey, su sıçramalarına karşı ek koruma sunar. Yaklaşık ölçüsü 300 × 430 × 140 mm''dir.',null,null,0,'contact',true,true,'images/products/yesido-wb65/main.webp','https://miot-store.com/products/yesido-wb65-fingerprint-lock-smart-backpackblack',1),
('20000000-0000-0000-0000-000000000002','linkage-lkb-39','Linkage LKB-39 Boyun Askılı Bluetooth Kulaklık','Linkage','LKB-39','10000000-0000-0000-0000-000000000001','Bluetooth 5.4, USB-C şarj ve hafıza kartı desteğine sahip boyun askılı kablosuz kulaklık.','Linkage LKB-39, boyun askılı gövdesi ve fiziksel kontrol bölümüyle hareket halindeki kullanıma odaklanır. 2800 mAh ve 600 saat ifadeleri üretici ambalajındaki bilgilerdir; gerçek kullanım süresi kullanım koşullarına göre değişebilir.',null,null,0,'contact',true,true,'images/products/linkage-lkb-39/main.webp','https://enshall.com.tr/linkage-lkb-39-bluetooth-kulaklik',2),
('20000000-0000-0000-0000-000000000003','blic-bls-92','BLIC BLS-92 Desk Sound Kablosuz Hoparlör','BLIC','BLS-92','10000000-0000-0000-0000-000000000001','6W RMS çıkış, Bluetooth 5.4 ve entegre taşıma kulbuyla kompakt masaüstü hoparlör.','BLIC BLS-92, siyah ve turuncu detaylara sahip kompakt bir kablosuz hoparlördür. Entegre kulbu taşımayı kolaylaştırır; USB ve TF kart desteği farklı ses kaynaklarıyla kullanım olanağı sunar.',null,null,0,'contact',true,true,'images/products/blic-bls-92/main.webp','https://www.hafizakartci.com/toptan-blic-bls-92-askili-6w-mini-bluetooth-speaker.html',3),
('20000000-0000-0000-0000-000000000004','blic-bls-96','BLIC BLS-96 Smooth Sound Kablosuz Hoparlör','BLIC','BLS-96','10000000-0000-0000-0000-000000000001','Telefon standı, taşıma askısı ve çoklu bağlantı seçenekleri sunan kompakt kablosuz hoparlör.','BLIC BLS-96, kompakt gövdesine telefon standı ve taşıma askısı ekleyen pratik bir ses çözümüdür. Bluetooth 5.4 bağlantısının yanında USB ve TF kart kaynaklarını destekler.',null,null,0,'contact',true,true,'images/products/blic-bls-96/main.webp','https://www.hafizakartci.com/toptan-blic-bls-96-askili-6w-mini-bluetooth-speaker-telefon-tutuculu.html',4),
('20000000-0000-0000-0000-000000000005','blic-bls-74','BLIC BLS-74 Retro RGB TWS Bluetooth Hoparlör','BLIC','BLS-74','10000000-0000-0000-0000-000000000001','Retro gövdeyi TWS stereo eşleştirme ve RGB aydınlatmayla birleştiren 7W hoparlör.','BLIC BLS-74, kompakt retro tasarımını Bluetooth bağlantısı, TWS desteği ve RGB aydınlatmayla bir araya getirir. İki uyumlu hoparlörü eşleştirme olanağı daha geniş bir stereo dinleme düzeni kurulmasını sağlar.',null,null,0,'contact',true,true,'images/products/blic-bls-74/main.webp','https://www.hafizakartci.com/toptan-blic-bls-74-rgb-tws-7w-rms-bluetooth-speaker-coklu-cihaz-uyumu.html',5),
('20000000-0000-0000-0000-000000000006','yesido-ec27','YESIDO EC27 2''si 1 Arada 800W Blender','YESIDO','EC27','10000000-0000-0000-0000-000000000003','Blender ve öğütücü işlevlerini 800W motor, iki kap ve çıkarılabilir bıçak sistemiyle sunar.','YESIDO EC27, içecek hazırlama ve öğütme işlemlerini tek gövdede buluşturur. Paslanmaz çelik bıçak sistemi çıkarılarak temizlenebilir; iki ayrı karıştırma kabı farklı porsiyonlara uyum sağlar. Kaymaz tabanı kullanım sırasında gövdenin dengede kalmasına yardımcı olur.',null,null,0,'contact',true,true,'images/products/yesido-ec27/main.webp','https://yesido.com.tr/en/products/yesido-ec27-2in1-buz-kirma-ozellikli-meyve-sikacagi-gri',6),
('20000000-0000-0000-0000-000000000007','cy-818','CY-818 Isıtmalı Derin Doku Boyun ve Omuz Masaj Aleti',null,'CY-818','10000000-0000-0000-0000-000000000004','Isıtma işlevi ve el biçimli başlıklarıyla rahatlatıcı masaj deneyimi için tasarlanmış taşınabilir cihaz.','CY-818; boyun, omuz, sırt ve bel çevresinde rahatlatıcı masaj deneyimi sunmak üzere tasarlanmıştır. Ergonomik formu ve USB ile şarj edilebilen taşınabilir yapısı evde veya seyahatte kullanımı kolaylaştırır. Bu ürün tıbbi tedavi amacı taşımaz.',null,null,0,'contact',true,true,'images/products/cy-818/main.webp','https://www.victoriastore.com.py/item/massageador-cervical-shoulder-neck-cy-818-10w-verd766311',7);

insert into public.product_images (product_id,image_path,alt_text,sort_order) values
('20000000-0000-0000-0000-000000000001','images/products/yesido-wb65/main.webp','YESIDO WB65 akıllı sırt çantası',0),('20000000-0000-0000-0000-000000000001','images/products/yesido-wb65/01.webp','YESIDO WB65 iç düzeni',1),('20000000-0000-0000-0000-000000000001','images/products/yesido-wb65/02.webp','YESIDO WB65 ürün detayı',2),
('20000000-0000-0000-0000-000000000002','images/products/linkage-lkb-39/main.webp','Linkage LKB-39 boyun askılı kulaklık',0),('20000000-0000-0000-0000-000000000002','images/products/linkage-lkb-39/01.webp','Linkage LKB-39 ürün detayı',1),
('20000000-0000-0000-0000-000000000003','images/products/blic-bls-92/main.webp','BLIC BLS-92 hoparlör',0),('20000000-0000-0000-0000-000000000003','images/products/blic-bls-92/01.webp','BLIC BLS-92 arka görünüm',1),('20000000-0000-0000-0000-000000000003','images/products/blic-bls-92/02.webp','BLIC BLS-92 özellikleri',2),
('20000000-0000-0000-0000-000000000004','images/products/blic-bls-96/main.webp','BLIC BLS-96 hoparlör',0),('20000000-0000-0000-0000-000000000004','images/products/blic-bls-96/01.webp','BLIC BLS-96 ürün detayı',1),('20000000-0000-0000-0000-000000000004','images/products/blic-bls-96/02.webp','BLIC BLS-96 telefon standı',2),
('20000000-0000-0000-0000-000000000005','images/products/blic-bls-74/main.webp','BLIC BLS-74 retro hoparlör',0),('20000000-0000-0000-0000-000000000005','images/products/blic-bls-74/01.webp','BLIC BLS-74 ürün detayı',1),
('20000000-0000-0000-0000-000000000006','images/products/yesido-ec27/main.webp','YESIDO EC27 blender seti',0),('20000000-0000-0000-0000-000000000006','images/products/yesido-ec27/01.webp','YESIDO EC27 tek ürün',1),('20000000-0000-0000-0000-000000000006','images/products/yesido-ec27/02.webp','YESIDO EC27 kullanım görseli',2),
('20000000-0000-0000-0000-000000000007','images/products/cy-818/main.webp','CY-818 yeşil masaj aleti',0),('20000000-0000-0000-0000-000000000007','images/products/cy-818/01.webp','CY-818 ürün kutusu',1);

insert into public.product_features (product_id,label,value,sort_order) values
('20000000-0000-0000-0000-000000000001','Parmak izi güvenlik kilidi','Var',0),('20000000-0000-0000-0000-000000000001','Laptop ve tablet bölmeleri','Var',1),('20000000-0000-0000-0000-000000000001','Malzeme','Oxford kumaş + PU',2),('20000000-0000-0000-0000-000000000001','Yaklaşık ölçü','300 × 430 × 140 mm',3),('20000000-0000-0000-0000-000000000001','USB bağlantısı','Var',4),
('20000000-0000-0000-0000-000000000002','Tasarım','Boyun askılı',0),('20000000-0000-0000-0000-000000000002','Bluetooth','5.4',1),('20000000-0000-0000-0000-000000000002','Şarj','USB-C',2),('20000000-0000-0000-0000-000000000002','Hafıza kartı desteği','Var',3),('20000000-0000-0000-0000-000000000002','Stereo ses','Var',4),
('20000000-0000-0000-0000-000000000003','Bluetooth','5.4',0),('20000000-0000-0000-0000-000000000003','Bağlantılar','USB, TF kart',1),('20000000-0000-0000-0000-000000000003','Batarya','1200 mAh',2),('20000000-0000-0000-0000-000000000003','Ses çıkışı','6W RMS',3),('20000000-0000-0000-0000-000000000003','Taşıma kulbu','Var',4),
('20000000-0000-0000-0000-000000000004','Bluetooth','5.4',0),('20000000-0000-0000-0000-000000000004','Bağlantılar','USB, TF kart',1),('20000000-0000-0000-0000-000000000004','Batarya','1200 mAh',2),('20000000-0000-0000-0000-000000000004','Ses çıkışı','6W RMS',3),('20000000-0000-0000-0000-000000000004','Telefon standı','Var',4),('20000000-0000-0000-0000-000000000004','Taşıma askısı','Var',5),
('20000000-0000-0000-0000-000000000005','Tasarım','Retro',0),('20000000-0000-0000-0000-000000000005','TWS stereo','Var',1),('20000000-0000-0000-0000-000000000005','Bağlantılar','TF, USB',2),('20000000-0000-0000-0000-000000000005','RGB aydınlatma','Var',3),('20000000-0000-0000-0000-000000000005','Batarya','1200 mAh',4),('20000000-0000-0000-0000-000000000005','Ses çıkışı','7W RMS',5),
('20000000-0000-0000-0000-000000000006','Motor gücü','800W',0),('20000000-0000-0000-0000-000000000006','Kullanım','Blender + öğütücü',1),('20000000-0000-0000-0000-000000000006','Buz kırma','Var',2),('20000000-0000-0000-0000-000000000006','Bıçak','Paslanmaz çelik, çıkarılabilir',3),('20000000-0000-0000-0000-000000000006','Karıştırma kabı','2 adet',4),('20000000-0000-0000-0000-000000000006','Kaymaz taban','Var',5),
('20000000-0000-0000-0000-000000000007','Isıtmalı kullanım','Var',0),('20000000-0000-0000-0000-000000000007','Derin doku masajı','Var',1),('20000000-0000-0000-0000-000000000007','Şarj','USB',2),('20000000-0000-0000-0000-000000000007','Kullanım bölgeleri','Boyun, omuz, sırt ve bel',3),('20000000-0000-0000-0000-000000000007','Taşınabilir yapı','Var',4);

insert into public.site_settings (key,value) values
('business_name','İlgün Ticaret'),('contact_name','İshak İlgün'),('phone','05434342032'),('whatsapp','905434342032');
