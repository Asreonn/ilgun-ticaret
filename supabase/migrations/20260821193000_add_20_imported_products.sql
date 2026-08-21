-- Add 20 imported products with local galleries and image provenance.
alter table public.product_images
  add column if not exists source_image_url text;

insert into public.categories (id, slug, name, description, sort_order) values
('10000000-0000-0000-0000-000000000006', 'kahve-mutfak', 'Kahve & Mutfak', 'Taşınabilir kettle, espresso ve mutfak ürünleri', 6),
('10000000-0000-0000-0000-000000000007', 'ev-yasam', 'Ev & Yaşam', 'Ütü, temizlik ve günlük yaşam ürünleri', 7),
('10000000-0000-0000-0000-000000000008', 'oto-aksesuar', 'Oto Aksesuar', 'Araç içi temizlik ve lastik bakım ürünleri', 8),
('10000000-0000-0000-0000-000000000009', 'guvenlik-seyahat', 'Güvenlik & Seyahat', 'Kilit ve seyahat güvenlik ürünleri', 9),
('10000000-0000-0000-0000-000000000010', 'ai-giyilebilir-teknoloji', 'AI & Giyilebilir Teknoloji', 'Akıllı gözlük ve giyilebilir cihazlar', 10),
('10000000-0000-0000-0000-000000000011', 'goruntu-eglence', 'Görüntü & Eğlence', 'Projektör ve görüntü ürünleri', 11)
on conflict (slug) do update set name = excluded.name, description = excluded.description, sort_order = excluded.sort_order, active = true;

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000008', 'by-k36b-sarjli-akilli-seyahat-kettle', 'BY-K36B Şarjlı Akıllı Seyahat Kettle', 'OEM', 'BY-K36B',
  '10000000-0000-0000-0000-000000000006', $d$500 ml kapasiteli, Type-C şarjlı ve dijital sıcaklık göstergeli taşınabilir seyahat kettle.$d$, $d$BY-K36B, priz bağlantısı olmadan su ısıtmayı amaçlayan şarjlı bir seyahat kettle'ıdır. 500 ml iç haznesi kahve, çay ve sıcak içecek hazırlığı için yeterlidir. 2600mAh × 4 batarya paketi ve Type-C şarj, ev, ofis ve outdoor kullanımına yöneliktir.

Dijital sıcaklık göstergesi ve 7 sıcaklık kademesi, suyu farklı içecekler için ayarlamayı kolaylaştırır. Paslanmaz çelik iç hazne günlük kullanıma uygundur. Gerçek ısıtma süresi ve batarya ömrü ortam sıcaklığına göre değişebilir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/main.webp', 'https://boyaelectrics.en.made-in-china.com/product/tPzpcZxWvmVD/China-Portable-Boil-Water-Cup-Portable-Kettle-Digital-Water-Heating-Cup-with-Battery.html', 8
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('BY-K36B')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'by-k36b-sarjli-akilli-seyahat-kettle'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000008';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000008';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000008', 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/main.webp', 'BY-K36B şarjlı akıllı seyahat kettle ön görünüm', 0, 'https://image.made-in-china.com/2f0j00wGcsNjgKyEqS/product.webp'),
('20000000-0000-0000-0000-000000000008', 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/01.webp', 'BY-K36B by-k36b şarjlı akıllı seyahat görünüm 1', 1, 'https://image.made-in-china.com/2f0j00dUbKyRuzZtcS/product.webp'),
('20000000-0000-0000-0000-000000000008', 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/02.webp', 'BY-K36B by-k36b şarjlı akıllı seyahat görünüm 2', 2, 'https://image.made-in-china.com/2f0j00JUbZNHrqrEcK/product.webp'),
('20000000-0000-0000-0000-000000000008', 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/03.webp', 'BY-K36B by-k36b şarjlı akıllı seyahat görünüm 3', 3, 'https://image.made-in-china.com/2f0j00JGoKFqrhLtbZ/product.webp'),
('20000000-0000-0000-0000-000000000008', 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/04.webp', 'BY-K36B by-k36b görünüm 4', 4, 'https://image.made-in-china.com/2f0j00NGcSyApdGTbZ/product.webp'),
('20000000-0000-0000-0000-000000000008', 'images/products/by-k36b-sarjli-akilli-seyahat-kettle/05.webp', 'BY-K36B by-k36b şarjlı akıllı seyahat görünüm 5', 5, 'https://image.made-in-china.com/2f0j00wYbSOJptLQqj/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000008', 'Kapasite', '500 ml', 0),
('20000000-0000-0000-0000-000000000008', 'Batarya', '2600mAh × 4', 1),
('20000000-0000-0000-0000-000000000008', 'Şarj', 'Type-C', 2),
('20000000-0000-0000-0000-000000000008', 'Güç', '100W', 3),
('20000000-0000-0000-0000-000000000008', 'Gösterge', 'Dijital sıcaklık göstergesi', 4),
('20000000-0000-0000-0000-000000000008', 'Sıcaklık kademesi', '7 seviye', 5),
('20000000-0000-0000-0000-000000000008', 'İç hazne', 'Paslanmaz çelik', 6);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000009', 'mdl-16-sarjli-tasinabilir-blender', 'MDL-16 Şarjlı Taşınabilir Blender', 'OEM', 'MDL-16',
  '10000000-0000-0000-0000-000000000003', $d$Altı paslanmaz çelik bıçaklı, USB ile şarj edilen taşınabilir smoothie blender.$d$, $d$MDL-16, smoothie ve shake hazırlığı için tasarlanmış şarjlı bir taşınabilir blenderdır. Altı paslanmaz çelik bıçak, meyve ve benzeri yumuşak malzemeleri karıştırmaya yöneliktir. Yaklaşık 500 ml kapasite tek kişilik porsiyonlar için uygundur.

USB şarj ve kompakt gövde, mutfak dışında da kullanımı kolaylaştırır. Batarya süresi karıştırılan malzeme ve kullanım sıklığına göre değişir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/mdl-16-sarjli-tasinabilir-blender/main.webp', 'https://mdjuicer.en.made-in-china.com/product/VMWJklQdhRDh/China-Electric-Kitchen-Appliance-Mini-Portable-and-Rechargeable-Battery-Juicer-Blender.html', 9
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('MDL-16')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'mdl-16-sarjli-tasinabilir-blender'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000009';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000009';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000009', 'images/products/mdl-16-sarjli-tasinabilir-blender/main.webp', 'MDL-16 şarjlı taşınabilir blender ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00SZVEIynGZalc/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000009', 'Kullanım', 'Şarjlı', 0),
('20000000-0000-0000-0000-000000000009', 'Bıçak', '6 paslanmaz çelik bıçak', 1),
('20000000-0000-0000-0000-000000000009', 'Kullanım amacı', 'Smoothie ve shake', 2),
('20000000-0000-0000-0000-000000000009', 'Kapasite', 'Yaklaşık 500 ml', 3),
('20000000-0000-0000-0000-000000000009', 'Tasarım', 'Taşınabilir', 4),
('20000000-0000-0000-0000-000000000009', 'Şarj', 'USB', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000010', 'fs-yd03-katlanabilir-seyahat-buharli-utu', 'FS-YD03 Katlanabilir Seyahat Buharlı Ütü', 'OEM', 'FS-YD03',
  '10000000-0000-0000-0000-000000000007', $d$1200W gücünde, 140 ml su tanklı katlanabilir seyahat buharlı ütü.$d$, $d$FS-YD03, seyahat ve günlük kullanım için tasarlanmış katlanabilir bir buharlı ütüdür. 1200W ısıtma gücü ve 20-25 saniyelik ısınma süresi, kısa sürede kullanıma geçmeyi amaçlar. Kuru ve buharlı çalışma seçenekleri kumaş türüne göre ayarlanabilir.

140 ml su tankı taşınabilir kullanım için yeterlidir. Kaynak sayfasında 110V / 220-240V desteği belirtilmiştir; fiş tipi ve yerel priz uyumu sipariş öncesinde teyit edilmelidir.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/main.webp', 'https://fusheng-electronic.en.made-in-china.com/product/OJPrEyRURfhQ/China-2026-New-Style-Portable-1200W-Handheld-Garment-Steamer-and-Iron-Instant-Heating-Foldable-Travel-Iron-Machine-for-Clothes.html', 10
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('FS-YD03')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'fs-yd03-katlanabilir-seyahat-buharli-utu'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000010';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000010';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000010', 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/main.webp', 'FS-YD03 katlanabilir seyahat buharlı ütü ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00qdhbukojQApS/product.webp'),
('20000000-0000-0000-0000-000000000010', 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/01.webp', 'FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 1', 1, 'https://image.made-in-china.com/2f0j00qAVcgjoEkmzZ/product.webp'),
('20000000-0000-0000-0000-000000000010', 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/02.webp', 'FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 2', 2, 'https://image.made-in-china.com/2f0j00bdhcrmoIQJgj/product.webp'),
('20000000-0000-0000-0000-000000000010', 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/03.webp', 'FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 3', 3, 'https://image.made-in-china.com/2f0j00BmWkzfcCMJuj/product.webp'),
('20000000-0000-0000-0000-000000000010', 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/04.webp', 'FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 4', 4, 'https://image.made-in-china.com/2f0j00vdikzLcMympZ/product.webp'),
('20000000-0000-0000-0000-000000000010', 'images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/05.webp', 'FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 5', 5, 'https://image.made-in-china.com/2f0j00MAiozcqFpwus/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000010', 'Güç', '1200W', 0),
('20000000-0000-0000-0000-000000000010', 'Isınma', '20-25 saniye', 1),
('20000000-0000-0000-0000-000000000010', 'Kullanım', 'Kuru ve buharlı', 2),
('20000000-0000-0000-0000-000000000010', 'Yapı', 'Katlanabilir', 3),
('20000000-0000-0000-0000-000000000010', 'Su tankı', '140 ml', 4),
('20000000-0000-0000-0000-000000000010', 'Voltaj', '110V / 220-240V', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000011', 'aby-318a-isitmali-yemek-kutusu', 'ABY-318A 1.5L Elektrikli Isıtmalı Yemek Kutusu', 'OEM', 'ABY-318A',
  '10000000-0000-0000-0000-000000000003', $d$1.5 litre 304 çelik hazneli, ev, ofis ve araç kullanımına yönelik ısıtmalı yemek kutusu.$d$, $d$ABY-318A, hazır yemeği sıcak tutmak veya ısıtmak için tasarlanmış 1.5 litrelik elektrikli bir yemek kutusudur. 304 paslanmaz çelik hazne ve 80W ısıtma gücü ofis, ev ve yolculuk kullanımına yöneliktir.

Kaynak sayfasında 12V / 24V araç ile 110V / 220V ev-ofis desteği belirtilmiştir. Fiş tipi, kablo seti ve yerel priz uyumu sipariş öncesinde teyit edilmelidir.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/aby-318a-isitmali-yemek-kutusu/main.webp', 'https://fineaquarium.en.made-in-china.com/product/VaBRJXQxOwcg/China-1-5L-CE-ETL-Approved-Portable-Electric-Heated-Lunch-Box-Food-Heater.html', 11
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('ABY-318A')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'aby-318a-isitmali-yemek-kutusu'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000011';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000011';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000011', 'images/products/aby-318a-isitmali-yemek-kutusu/main.webp', 'ABY-318A elektrikli ısıtmalı yemek kutusu ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00mDlvCBsJUykO/product.webp'),
('20000000-0000-0000-0000-000000000011', 'images/products/aby-318a-isitmali-yemek-kutusu/01.webp', 'ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 1', 1, 'https://image.made-in-china.com/2f0j00mLiCeySHKnkO/product.webp'),
('20000000-0000-0000-0000-000000000011', 'images/products/aby-318a-isitmali-yemek-kutusu/02.webp', 'ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 2', 2, 'https://image.made-in-china.com/2f0j00tLWCvTjcLOqA/product.webp'),
('20000000-0000-0000-0000-000000000011', 'images/products/aby-318a-isitmali-yemek-kutusu/03.webp', 'ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 3', 3, 'https://image.made-in-china.com/2f0j00QLlMCpsBMObJ/product.webp'),
('20000000-0000-0000-0000-000000000011', 'images/products/aby-318a-isitmali-yemek-kutusu/04.webp', 'ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 4', 4, 'https://image.made-in-china.com/2f0j00tDWvMVSPknbw/product.webp'),
('20000000-0000-0000-0000-000000000011', 'images/products/aby-318a-isitmali-yemek-kutusu/05.webp', 'ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 5', 5, 'https://image.made-in-china.com/2f0j00tPVvCMjalNkw/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000011', 'Kapasite', '1.5 litre', 0),
('20000000-0000-0000-0000-000000000011', 'Hazne', '304 paslanmaz çelik', 1),
('20000000-0000-0000-0000-000000000011', 'Güç', '80W', 2),
('20000000-0000-0000-0000-000000000011', 'Araç kullanımı', '12V / 24V', 3),
('20000000-0000-0000-0000-000000000011', 'Ev ve ofis', '110V / 220V', 4),
('20000000-0000-0000-0000-000000000011', 'Yapı', 'Taşınabilir', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000012', 'euhomy-im005-buz-makinesi', 'EUHOMY IM005 Akıllı Tezgah Üstü Buz Makinesi', 'EUHOMY', 'IM005',
  '10000000-0000-0000-0000-000000000003', $d$2L su tanklı, dokunmatik kontrollü tezgah üstü buz makinesi.$d$, $d$EUHOMY IM005, ev ve küçük ofis kullanımı için tasarlanmış tezgah üstü bir buz makinesidir. Üretici verisine göre yaklaşık 13 dakikada 16 küp buz üretir; günlük kapasite ifadesi yaklaşık 34 lb'dir. 2L dahili su tankı harici su hattı olmadan çalışmayı amaçlar.

Dokunmatik kontrol, buz kalınlığı ayarı, zamanlayıcı ve otomatik temizleme günlük kullanımı kolaylaştırır. Gerçek üretim miktarı oda sıcaklığı ve su sıcaklığına göre değişebilir. Fiş tipi sipariş öncesinde teyit edilmelidir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/euhomy-im005-buz-makinesi/main.webp', 'https://hommio.en.made-in-china.com/product/cAgpTUBjaRrC/China-Versatile-Mini-Ice-Maker-for-Convenient-Ice-Making-Experience.html', 12
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('IM005')
    and coalesce(lower(existing.brand), '') = lower('EUHOMY')
    and existing.slug <> 'euhomy-im005-buz-makinesi'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000012';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000012';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000012', 'images/products/euhomy-im005-buz-makinesi/main.webp', 'EUHOMY IM005 tezgah üstü buz makinesi ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00GOroefNnrmzu/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000012', 'Üretim', '13 dakikada 16 küp', 0),
('20000000-0000-0000-0000-000000000012', 'Günlük kapasite', 'Yaklaşık 34 lb', 1),
('20000000-0000-0000-0000-000000000012', 'Su tankı', '2L', 2),
('20000000-0000-0000-0000-000000000012', 'Temizlik', 'Otomatik temizleme', 3),
('20000000-0000-0000-0000-000000000012', 'Ayar', 'Buz kalınlığı ayarı', 4),
('20000000-0000-0000-0000-000000000012', 'Kontrol', 'Dokunmatik', 5),
('20000000-0000-0000-0000-000000000012', 'Zamanlayıcı', 'Var', 6);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000013', 'me2409-tasinabilir-espresso-makinesi', 'ME2409 19 Bar Şarjlı Taşınabilir Espresso Makinesi', 'Capadeli', 'ME2409',
  '10000000-0000-0000-0000-000000000006', $d$19 bar pompalı, 7800mAh bataryalı şarjlı taşınabilir espresso makinesi.$d$, $d$ME2409, priz bağlantısına ihtiyaç duymadan espresso hazırlamayı amaçlayan 7800mAh bataryalı taşınabilir bir kahve makinesidir. 19 bar pompa sistemi ve farklı kahve adaptörleri sayesinde seyahat, ofis ve outdoor kullanımına yöneliktir.

80 ml su tankı ve 250 ml bardak tek fincan hazırlığı için tasarlanmıştır. Type-C şarj ve 100W güç tüketimi kablosuz kullanımı destekler. Kapsül ve öğütülmüş kahve adaptörleri kaynak sayfasında belirtilmiştir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/me2409-tasinabilir-espresso-makinesi/main.webp', 'https://seamaxtech.en.made-in-china.com/product/ftJrTNBgRlpP/China-Compact-Portable-Coffeemaker-for-Outdoor-and-Travel-Use.html', 13
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('ME2409')
    and coalesce(lower(existing.brand), '') = lower('Capadeli')
    and existing.slug <> 'me2409-tasinabilir-espresso-makinesi'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000013';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000013';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000013', 'images/products/me2409-tasinabilir-espresso-makinesi/main.webp', 'ME2409 taşınabilir espresso makinesi ürün görünümü', 0, 'https://image.made-in-china.com/203f0j00LQnezYbPREuf/product.webp'),
('20000000-0000-0000-0000-000000000013', 'images/products/me2409-tasinabilir-espresso-makinesi/01.webp', 'ME2409 me2409 19 bar şarjlı görünüm 1', 1, 'https://image.made-in-china.com/2f0j00gENerIoJOtpG/product.webp'),
('20000000-0000-0000-0000-000000000013', 'images/products/me2409-tasinabilir-espresso-makinesi/02.webp', 'ME2409 me2409 19 bar şarjlı görünüm 2', 2, 'https://image.made-in-china.com/2f0j00rTNeukoKOazR/product.webp'),
('20000000-0000-0000-0000-000000000013', 'images/products/me2409-tasinabilir-espresso-makinesi/03.webp', 'ME2409 me2409 19 bar şarjlı görünüm 3', 3, 'https://image.made-in-china.com/2f0j00rEFvgjqDvQuU/product.webp'),
('20000000-0000-0000-0000-000000000013', 'images/products/me2409-tasinabilir-espresso-makinesi/04.webp', 'ME2409 me2409 19 bar şarjlı görünüm 4', 4, 'https://image.made-in-china.com/2f0j00zQFBumqRvTgG/product.webp'),
('20000000-0000-0000-0000-000000000013', 'images/products/me2409-tasinabilir-espresso-makinesi/05.webp', 'ME2409 me2409 görünüm 5', 5, 'https://image.made-in-china.com/2f0j00gQnvpGqPTtzf/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000013', 'Basınç', '19 Bar', 0),
('20000000-0000-0000-0000-000000000013', 'Batarya', '7800mAh', 1),
('20000000-0000-0000-0000-000000000013', 'Su tankı', '80 ml', 2),
('20000000-0000-0000-0000-000000000013', 'Bardak', '250 ml', 3),
('20000000-0000-0000-0000-000000000013', 'Güç', '100W', 4),
('20000000-0000-0000-0000-000000000013', 'Şarj', 'Type-C', 5),
('20000000-0000-0000-0000-000000000013', 'Kahve tipi', 'Kapsül ve öğütülmüş kahve', 6);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000014', 'kh-550-mini-masaj-tabancasi', 'KH-550 Cep Boy Mini Masaj Tabancası', 'OEM', 'KH-550',
  '10000000-0000-0000-0000-000000000004', $d$24W fırçasız motorlu, yaklaşık 420g ağırlığında cep boy masaj tabancası.$d$, $d$KH-550, günlük rahatlama ve spor sonrası kullanım için tasarlanmış kompakt bir masaj tabancasıdır. 24W fırçasız motor ve 2000mAh batarya kablosuz kullanıma yöneliktir. Yaklaşık 420g ağırlığı taşımayı kolaylaştırır.

USB ile şarj edilir. Bu ürün tıbbi teşhis veya tedavi amacı taşımaz; rahatlama ve kişisel bakım içindir.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/kh-550-mini-masaj-tabancasi/main.webp', 'https://wuyumassageequipment.en.made-in-china.com/product/MZoGgFacEjfP/China-2026-Mini-Gun-Massage-Gun-Smaller-Than-Phone-99-Speeds-Deep-Tissue-OEM-ODM-Wholesale-Produto-Massageador-Gun-Massage-Gun.html', 14
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('KH-550')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'kh-550-mini-masaj-tabancasi'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000014';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000014';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000014', 'images/products/kh-550-mini-masaj-tabancasi/main.webp', 'KH-550 cep boy mini masaj tabancası ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00tNEVYGhDRdUT/product.webp'),
('20000000-0000-0000-0000-000000000014', 'images/products/kh-550-mini-masaj-tabancasi/01.webp', 'KH-550 kh-550 cep boy mini görünüm 1', 1, 'https://image.made-in-china.com/2f0j00QyTWYDltTmGE/product.webp'),
('20000000-0000-0000-0000-000000000014', 'images/products/kh-550-mini-masaj-tabancasi/02.webp', 'KH-550 kh-550 cep boy mini görünüm 2', 2, 'https://image.made-in-china.com/2f0j00anTVfkWrVwRt/product.webp'),
('20000000-0000-0000-0000-000000000014', 'images/products/kh-550-mini-masaj-tabancasi/03.webp', 'KH-550 kh-550 cep boy mini görünüm 3', 3, 'https://image.made-in-china.com/2f0j00tFaVfKhAHmRT/product.webp'),
('20000000-0000-0000-0000-000000000014', 'images/products/kh-550-mini-masaj-tabancasi/04.webp', 'KH-550 kh-550 cep boy mini görünüm 4', 4, 'https://image.made-in-china.com/2f0j00tNQhGwWBgAUT/product.webp'),
('20000000-0000-0000-0000-000000000014', 'images/products/kh-550-mini-masaj-tabancasi/05.webp', 'KH-550 kh-550 cep boy mini görünüm 5', 5, 'https://image.made-in-china.com/2f0j00GFtWfUlPuAYa/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000014', 'Motor', '24W brushless', 0),
('20000000-0000-0000-0000-000000000014', 'Batarya', '2000mAh', 1),
('20000000-0000-0000-0000-000000000014', 'Kullanım', 'Şarjlı', 2),
('20000000-0000-0000-0000-000000000014', 'Ağırlık', 'Yaklaşık 420g', 3),
('20000000-0000-0000-0000-000000000014', 'Tasarım', 'Kompakt', 4),
('20000000-0000-0000-0000-000000000014', 'Şarj', 'USB', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000015', 'pm69-isitmali-mini-masaj-tabancasi', 'PM69 Isıtmalı Mini Masaj Tabancası', 'OEM', 'PM69',
  '10000000-0000-0000-0000-000000000004', $d$Isıtmalı başlıklı, dört hız kademeli ve Type-C şarjlı mini masaj tabancası.$d$, $d$PM69, ısıtmalı masaj başlığı ve dört hız kademesi sunan kompakt bir masaj tabancasıdır. Fırçasız motor ve yaklaşık 240g gövde ağırlığı günlük taşımaya yöneliktir. Type-C şarj kablosuz kullanımı destekler.

Bu ürün tıbbi teşhis veya tedavi amacı taşımaz. Kas rahatlatma ve kişisel bakım için tasarlanmıştır.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/pm69-isitmali-mini-masaj-tabancasi/main.webp', 'https://baichangtech.en.made-in-china.com/product/fUwRvpoYYMhm/China-Electric-Mini-Muscle-Massage-Gun-with-Heat-Function.html', 15
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('PM69')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'pm69-isitmali-mini-masaj-tabancasi'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000015';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000015';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000015', 'images/products/pm69-isitmali-mini-masaj-tabancasi/main.webp', 'PM69 ısıtmalı mini masaj tabancası ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00rFbvcYCqEuko/product.webp'),
('20000000-0000-0000-0000-000000000015', 'images/products/pm69-isitmali-mini-masaj-tabancasi/01.webp', 'PM69 pm69 ısıtmalı mini masaj görünüm 1', 1, 'https://image.made-in-china.com/2f0j00UnbBoKCJwrkq/product.webp'),
('20000000-0000-0000-0000-000000000015', 'images/products/pm69-isitmali-mini-masaj-tabancasi/02.webp', 'PM69 pm69 ısıtmalı mini masaj görünüm 2', 2, 'https://image.made-in-china.com/2f0j00YykvqmCrlzbo/product.webp'),
('20000000-0000-0000-0000-000000000015', 'images/products/pm69-isitmali-mini-masaj-tabancasi/03.webp', 'PM69 pm69 görünüm 3', 3, 'https://image.made-in-china.com/2f0j00UFkCqcBWrgbo/product.webp'),
('20000000-0000-0000-0000-000000000015', 'images/products/pm69-isitmali-mini-masaj-tabancasi/04.webp', 'PM69 pm69 ısıtmalı mini masaj görünüm 4', 4, 'https://image.made-in-china.com/2f0j00pNqCcIMDErkb/product.webp'),
('20000000-0000-0000-0000-000000000015', 'images/products/pm69-isitmali-mini-masaj-tabancasi/05.webp', 'PM69 pm69 ısıtmalı mini masaj görünüm 5', 5, 'https://image.made-in-china.com/2f0j00unkvcqCMkgob/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000015', 'Başlık', 'Isıtmalı masaj başlığı', 0),
('20000000-0000-0000-0000-000000000015', 'Hız', '4 seviye', 1),
('20000000-0000-0000-0000-000000000015', 'Motor', 'Brushless', 2),
('20000000-0000-0000-0000-000000000015', 'Şarj', 'Type-C', 3),
('20000000-0000-0000-0000-000000000015', 'Ağırlık', 'Yaklaşık 240g', 4),
('20000000-0000-0000-0000-000000000015', 'Gövde', 'Kompakt', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000016', 'f029-katlanabilir-boyun-fani', 'F029 Katlanabilir Bladeless Boyun Fanı', 'OEM', 'F029',
  '10000000-0000-0000-0000-000000000004', $d$4000mAh bataryalı, katlanabilir bladeless boyun fanı.$d$, $d$F029, boyuna takılarak kullanılan katlanabilir bir kişisel soğutma fanıdır. Bladeless gövde tasarımı ve 4000mAh batarya, hareket halinde serinlemeyi amaçlar. Type-C şarj günlük kullanıma uygundur.

Üretici ifadesine göre çalışma süresi yaklaşık 5-12 saattir; gerçek süre kademe ve ortam koşullarına göre değişir. Giyilebilir ve katlanabilir yapı seyahat çantasında yer tutmayı azaltır.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/f029-katlanabilir-boyun-fani/main.webp', 'https://leyu-conn.en.made-in-china.com/product/yGNpQkSTCcWe/China-Bladeless-4000mAh-Personal-Portable-Neck-Rechargeable-Fan-Foldable-Fan-Air-Conditioner-Cooling-Wearable-Fans.html', 16
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('F029')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'f029-katlanabilir-boyun-fani'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000016';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000016';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000016', 'images/products/f029-katlanabilir-boyun-fani/main.webp', 'F029 katlanabilir bladeless boyun fanı ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00SYuCLodMrVkl/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000016', 'Tasarım', 'Bladeless', 0),
('20000000-0000-0000-0000-000000000016', 'Batarya', '4000mAh', 1),
('20000000-0000-0000-0000-000000000016', 'Şarj', 'Type-C', 2),
('20000000-0000-0000-0000-000000000016', 'Gövde', 'Katlanabilir', 3),
('20000000-0000-0000-0000-000000000016', 'Kullanım', 'Giyilebilir', 4),
('20000000-0000-0000-0000-000000000016', 'Çalışma süresi', 'Yaklaşık 5-12 saat', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000017', 'hw05-el-isitici-powerbank', 'HW05 5000mAh El Isıtıcı ve Powerbank', 'OEM', 'HW05',
  '10000000-0000-0000-0000-000000000002', $d$5000mAh powerbank işlevli, USB şarjlı taşınabilir el ısıtıcı.$d$, $d$HW05, el ısıtıcı ve 5000mAh powerbank işlevlerini tek gövdede toplayan taşınabilir bir aksesuardır. USB şarj ile tekrar kullanılabilir. Soğuk havalarda cepte taşımak ve düşük kapasiteli cihaz şarjı için tasarlanmıştır.

Isıtma süresi ve powerbank çıkışı kullanım koşullarına göre değişir. Çift işlevli yapı ayrı bir powerbank taşıma ihtiyacını azaltır.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/hw05-el-isitici-powerbank/main.webp', 'https://wstwosi.en.made-in-china.com/product/SFmftIUgOrhk/China-USB-Rechargeable-Hand-Warmer-Reusable-Electric-Handwarmer-with-Mobile-Power-Bank.html', 17
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('HW05')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'hw05-el-isitici-powerbank'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000017';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000017';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000017', 'images/products/hw05-el-isitici-powerbank/main.webp', 'HW05 el ısıtıcı ve powerbank ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00LqPuDRrdgebI/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000017', 'İşlev', 'Elektrikli el ısıtıcı', 0),
('20000000-0000-0000-0000-000000000017', 'Powerbank', '5000mAh', 1),
('20000000-0000-0000-0000-000000000017', 'Şarj', 'USB', 2),
('20000000-0000-0000-0000-000000000017', 'Yapı', 'Taşınabilir', 3),
('20000000-0000-0000-0000-000000000017', 'Kullanım', 'Çift işlevli', 4);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000018', 'xz-bt512-akilli-masa-istasyonu', 'XZ-BT512 Kablosuz Şarjlı Alarm Saatli Bluetooth Hoparlör', 'OEM', 'XZ-BT512',
  '10000000-0000-0000-0000-000000000001', $d$Bluetooth hoparlör, dijital alarm saati ve kablosuz şarjı bir araya getiren masa istasyonu.$d$, $d$XZ-BT512, yatak odası veya masaüstü kullanımına yönelik çok işlevli bir istasyondur. Bluetooth 5.3 bağlantılı 5W hoparlör, dijital saat ve alarm temel kullanım senaryolarını karşılar. Kablosuz telefon şarj alanı gece standı ihtiyacını azaltır.

Type-C şarj ve 1200mAh batarya kablosuz dinlemeyi destekler. Gerçek şarj hızı telefon modeline göre değişir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/xz-bt512-akilli-masa-istasyonu/main.webp', 'https://sachikoo.en.made-in-china.com/product/NRbYCJzDbncs/China-Magnetic-Wireless-Charging-Station-with-Bluetooth-Speaker-and-Alarm.html', 18
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('XZ-BT512')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'xz-bt512-akilli-masa-istasyonu'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000018';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000018';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000018', 'images/products/xz-bt512-akilli-masa-istasyonu/main.webp', 'XZ-BT512 kablosuz şarjlı alarm saatli hoparlör ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00MLcBeFInpmbP/product.webp'),
('20000000-0000-0000-0000-000000000018', 'images/products/xz-bt512-akilli-masa-istasyonu/01.webp', 'XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 1', 1, 'https://image.made-in-china.com/2f0j00jPceCaIWfdkD/product.webp'),
('20000000-0000-0000-0000-000000000018', 'images/products/xz-bt512-akilli-masa-istasyonu/02.webp', 'XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 2', 2, 'https://image.made-in-china.com/2f0j00jLoMvzIEAAcD/product.webp'),
('20000000-0000-0000-0000-000000000018', 'images/products/xz-bt512-akilli-masa-istasyonu/03.webp', 'XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 3', 3, 'https://image.made-in-china.com/2f0j00sIcMBWHgLAoD/product.webp'),
('20000000-0000-0000-0000-000000000018', 'images/products/xz-bt512-akilli-masa-istasyonu/04.webp', 'XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 4', 4, 'https://image.made-in-china.com/2f0j00SPoMBvLJpmkD/product.webp'),
('20000000-0000-0000-0000-000000000018', 'images/products/xz-bt512-akilli-masa-istasyonu/05.webp', 'XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 5', 5, 'https://image.made-in-china.com/2f0j00jLqBCOHMGJcD/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000018', 'Bluetooth', '5.3', 0),
('20000000-0000-0000-0000-000000000018', 'Hoparlör', '5W', 1),
('20000000-0000-0000-0000-000000000018', 'Saat', 'Dijital', 2),
('20000000-0000-0000-0000-000000000018', 'Alarm', 'Var', 3),
('20000000-0000-0000-0000-000000000018', 'Şarj', 'Kablosuz telefon şarjı', 4),
('20000000-0000-0000-0000-000000000018', 'Bağlantı', 'Type-C', 5),
('20000000-0000-0000-0000-000000000018', 'Batarya', '1200mAh', 6);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000019', 'xg-230-mini-supurge-hava-ufleyici', 'XG-230 4''ü 1 Arada Mini Süpürge ve Hava Üfleyici', 'OEM', 'XG-230',
  '10000000-0000-0000-0000-000000000008', $d$12 kPa emişli, süpürme, üfleme, şişirme ve vakumlama işlevli kablosuz mini süpürge.$d$, $d$XG-230, araç içi ve masaüstü temizlik için tasarlanmış 4 işlevli kablosuz bir mini süpürgedir. 80W BLDC motor, 12 kPa emiş ve 75.000 RPM değerleri üretici teknik verisidir. Süpürme, hava üfleme, şişirme ve vakumlama başlıkları farklı yüzeylere yöneliktir.

4000mAh batarya ve HEPA filtre kablosuz kullanımı destekler. Gerçek emiş performansı başlık ve yüzey türüne göre değişir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/xg-230-mini-supurge-hava-ufleyici/main.webp', 'https://xg-electronic.en.made-in-china.com/product/DxnUCvdrZVcS/China-Compressed-Air-Duster-BLDC-Handheld-Vacuum-Cordless-Cleaner-in-Rechargeable-Battery-Ultra-Lightweight-Mini-Car-Vacuum-for-Car-Home-Pet-and-Other-Crevices.html', 19
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('XG-230')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'xg-230-mini-supurge-hava-ufleyici'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000019';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000019';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000019', 'images/products/xg-230-mini-supurge-hava-ufleyici/main.webp', 'XG-230 kablosuz mini süpürge ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00DHAbePQjfFoz/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000019', 'Emiş', '12 kPa', 0),
('20000000-0000-0000-0000-000000000019', 'Motor', '80W BLDC', 1),
('20000000-0000-0000-0000-000000000019', 'Devir', '75.000 RPM', 2),
('20000000-0000-0000-0000-000000000019', 'İşlevler', 'Süpürme, üfleme, şişirme, vakumlama', 3),
('20000000-0000-0000-0000-000000000019', 'Batarya', '4000mAh', 4),
('20000000-0000-0000-0000-000000000019', 'Filtre', 'HEPA', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000020', 'ms-e004-5-elektrikli-tornavida', 'MS-E004-5 Şarjlı Hassas Elektrikli Tornavida Seti', 'OEM', 'MS-E004-5',
  '10000000-0000-0000-0000-000000000002', $d$3.7V şarjlı, manyetik uçlu hassas elektrikli tornavida seti.$d$, $d$MS-E004-5, telefon, laptop ve küçük elektronik tamiri için tasarlanmış şarjlı bir hassas tornavida setidir. 3.7V gövde ve manyetik uçlar vidaları tutmayı kolaylaştırır. Set, taşıma kutusu içinde gelir.

Hassas bitler ince vida başları içindir. Tork değeri kullanım sırasında kademeli uygulanmalıdır; bu ürün ağır yapı işleri için tasarlanmamıştır.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/ms-e004-5-elektrikli-tornavida/main.webp', 'https://modagel.en.made-in-china.com/product/yUVrnmCxOpcS/China-China-Factory-Mini-Electric-Tools-Precision-Screwdriver-Set-3-7V-Rechargeable-Screwdriver-Lithium-Battery.html', 20
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('MS-E004-5')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'ms-e004-5-elektrikli-tornavida'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000020';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000020';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000020', 'images/products/ms-e004-5-elektrikli-tornavida/main.webp', 'MS-E004-5 şarjlı hassas elektrikli tornavida seti', 0, 'https://image.made-in-china.com/2f0j00AohMCWHRLLqj/product.webp'),
('20000000-0000-0000-0000-000000000020', 'images/products/ms-e004-5-elektrikli-tornavida/01.webp', 'MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 1', 1, 'https://image.made-in-china.com/2f0j00wcVeCvHhyLqj/product.webp'),
('20000000-0000-0000-0000-000000000020', 'images/products/ms-e004-5-elektrikli-tornavida/02.webp', 'MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 2', 2, 'https://image.made-in-china.com/2f0j00JoVMvOHryPbs/product.webp'),
('20000000-0000-0000-0000-000000000020', 'images/products/ms-e004-5-elektrikli-tornavida/03.webp', 'MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 3', 3, 'https://image.made-in-china.com/2f0j00aciMCQPBCHqO/product.webp'),
('20000000-0000-0000-0000-000000000020', 'images/products/ms-e004-5-elektrikli-tornavida/04.webp', 'MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 4', 4, 'https://image.made-in-china.com/2f0j00QohMeuLagPky/product.webp'),
('20000000-0000-0000-0000-000000000020', 'images/products/ms-e004-5-elektrikli-tornavida/05.webp', 'MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 5', 5, 'https://image.made-in-china.com/2f0j00EkVBeWDrCHcN/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000020', 'Voltaj', '3.7V', 0),
('20000000-0000-0000-0000-000000000020', 'Kullanım', 'Şarjlı', 1),
('20000000-0000-0000-0000-000000000020', 'Uçlar', 'Hassas tornavida bitleri', 2),
('20000000-0000-0000-0000-000000000020', 'Uç tipi', 'Manyetik', 3),
('20000000-0000-0000-0000-000000000020', 'Uygulama', 'Telefon ve laptop tamiri', 4),
('20000000-0000-0000-0000-000000000020', 'Aksesuar', 'Taşıma kutusu', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000021', 'pt-9bf-parmak-izli-akilli-kilit', 'PT-9BF Parmak İzli USB Şarjlı Akıllı Asma Kilit', 'OEM', 'PT-9BF',
  '10000000-0000-0000-0000-000000000009', $d$20 parmak izi kaydı ve USB şarj destekli metal gövdeli akıllı asma kilit.$d$, $d$PT-9BF, anahtarsız açılmayı amaçlayan parmak izli bir asma kilittir. Üretici verisine göre 20 parmak izi kaydı ve yaklaşık 0.5 saniyelik tanıma süresi bulunur. USB ile şarj edilir.

Metal gövde çanta, dolap ve bisiklet gibi taşınabilir kullanım senaryolarına yöneliktir. Parmak izi tanıma performansı kayıt kalitesi ve ortam koşullarına göre değişebilir.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/pt-9bf-parmak-izli-akilli-kilit/main.webp', 'https://jethoo2021.en.made-in-china.com/product/LFGagjiVbARd/China-Safety-Keyless-Fingerprint-USB-Rechargeable-Electric-Smart-Door-Lock.html', 21
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('PT-9BF')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'pt-9bf-parmak-izli-akilli-kilit'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000021';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000021';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000021', 'images/products/pt-9bf-parmak-izli-akilli-kilit/main.webp', 'PT-9BF parmak izli akıllı asma kilit ürün görünümü', 0, 'https://image.made-in-china.com/203f0j00lbupGBcrIUgD/product.webp'),
('20000000-0000-0000-0000-000000000021', 'images/products/pt-9bf-parmak-izli-akilli-kilit/01.webp', 'PT-9BF pt-9bf parmak izli usb görünüm 1', 1, 'https://image.made-in-china.com/203f0j00hbupGncJgRzP/product.webp'),
('20000000-0000-0000-0000-000000000021', 'images/products/pt-9bf-parmak-izli-akilli-kilit/02.webp', 'PT-9BF pt-9bf parmak izli usb görünüm 2', 2, 'https://image.made-in-china.com/203f0j00okpgfQqBuUzL/product.webp'),
('20000000-0000-0000-0000-000000000021', 'images/products/pt-9bf-parmak-izli-akilli-kilit/03.webp', 'PT-9BF pt-9bf parmak izli usb görünüm 3', 3, 'https://image.made-in-china.com/203f0j00qoupGrkyvfgL/product.webp'),
('20000000-0000-0000-0000-000000000021', 'images/products/pt-9bf-parmak-izli-akilli-kilit/04.webp', 'PT-9BF pt-9bf parmak izli usb görünüm 4', 4, 'https://image.made-in-china.com/2f0j00qkgrflbtTUuI/product.webp'),
('20000000-0000-0000-0000-000000000021', 'images/products/pt-9bf-parmak-izli-akilli-kilit/05.webp', 'PT-9BF pt-9bf parmak izli usb görünüm 5', 5, 'https://image.made-in-china.com/2f0j00ckprYBbKJRzP/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000021', 'Açılma', 'Parmak izi', 0),
('20000000-0000-0000-0000-000000000021', 'Kayıt', '20 parmak izi', 1),
('20000000-0000-0000-0000-000000000021', 'Tanıma', 'Yaklaşık 0.5 sn', 2),
('20000000-0000-0000-0000-000000000021', 'Şarj', 'USB', 3),
('20000000-0000-0000-0000-000000000021', 'Gövde', 'Metal', 4),
('20000000-0000-0000-0000-000000000021', 'Kullanım', 'Çanta, dolap ve bisiklet', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000022', 'eg12-ai-akilli-gozluk', 'EG12 AI Kamera ve Anlık Çeviri Akıllı Gözlük', 'OEM', 'EG12',
  '10000000-0000-0000-0000-000000000010', $d$8MP kameralı, Wi-Fi aktarımlı ve gerçek zamanlı çeviri özellikli akıllı gözlük.$d$, $d$EG12, fotoğraf, video ve sesli asistan işlevlerini bir araya getiren kamera destekli bir akıllı gözlüktür. 8MP kamera, çift mikrofon ve Wi-Fi veri aktarımı kaynak sayfasında belirtilmiştir. Nesne tanıma ve gerçek zamanlı çeviri, üreticinin tanımladığı yazılım özellikleridir.

Kaynak sayfası çeviri için 40 dil desteği listeler; bu listede Türkçe de yer alır. Çeviri kalitesi bağlı uygulamaya ve bağlantıya göre değişebilir. Doğrulanmayan ek özellik eklenmemiştir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/eg12-ai-akilli-gozluk/main.webp', 'https://4p-touch.en.made-in-china.com/product/mUaYvEQysXhM/China-2026-new-launched-waterproof-realtime-translation-smart-camera-glasses-with-AI-voice-assistant-object-recognition-voice-recording-EG12.html', 22
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('EG12')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'eg12-ai-akilli-gozluk'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000022';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000022';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000022', 'images/products/eg12-ai-akilli-gozluk/main.webp', 'EG12 AI kamera ve çeviri akıllı gözlük ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00PykCdgJGMHbo/product.webp'),
('20000000-0000-0000-0000-000000000022', 'images/products/eg12-ai-akilli-gozluk/01.webp', 'EG12 eg12 aı kamera ve görünüm 1', 1, 'https://image.made-in-china.com/226f0j00cFlMLyYfEPbe/product.webp'),
('20000000-0000-0000-0000-000000000022', 'images/products/eg12-ai-akilli-gozluk/02.webp', 'EG12 eg12 aı kamera ve görünüm 2', 2, 'https://image.made-in-china.com/226f0j00MyhCIQRnELcB/product.webp'),
('20000000-0000-0000-0000-000000000022', 'images/products/eg12-ai-akilli-gozluk/03.webp', 'EG12 eg12 aı kamera ve görünüm 3', 3, 'https://image.made-in-china.com/226f0j00CnheHpYthPkM/product.webp'),
('20000000-0000-0000-0000-000000000022', 'images/products/eg12-ai-akilli-gozluk/04.webp', 'EG12 eg12 aı kamera ve görünüm 4', 4, 'https://image.made-in-china.com/226f0j00CNhMPifKLDbe/product.webp'),
('20000000-0000-0000-0000-000000000022', 'images/products/eg12-ai-akilli-gozluk/05.webp', 'EG12 eg12 aı kamera ve görünüm 5', 5, 'https://image.made-in-china.com/226f0j00BOVMPCRhrDbe/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000022', 'Kamera', '8MP', 0),
('20000000-0000-0000-0000-000000000022', 'Asistan', 'AI sesli asistan', 1),
('20000000-0000-0000-0000-000000000022', 'Tanıma', 'Nesne tanıma', 2),
('20000000-0000-0000-0000-000000000022', 'Kayıt', 'Fotoğraf ve video', 3),
('20000000-0000-0000-0000-000000000022', 'Aktarım', 'Wi-Fi', 4),
('20000000-0000-0000-0000-000000000022', 'Mikrofon', 'Çift mikrofon', 5),
('20000000-0000-0000-0000-000000000022', 'Çeviri', 'Gerçek zamanlı, 40 dil', 6),
('20000000-0000-0000-0000-000000000022', 'Dil desteği', 'Türkçe dahil (üretici listesi)', 7);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000023', 'yt600-android-mini-projektor', 'YT600 Android 13 Wi-Fi 6 Mini Projektör', 'OEM', 'YT600',
  '10000000-0000-0000-0000-000000000011', $d$Android 13, Wi-Fi 6 ve 170 ANSI parlaklıklı 720p mini projektör.$d$, $d$YT600, 720p doğal çözünürlük ve 170 ANSI parlaklık sunan Android 13 tabanlı bir mini projektördür. Wi-Fi 6, Bluetooth 5.4, elektronik odak ve keystone düzeltme temel kurulum ihtiyaçlarını karşılar. 4K decode ifadesi üretici yazılım desteğine aittir; native çözünürlük 720p'dir.

Kaynak sayfası US plug varyantını göstermektedir. Türkiye priz ve voltaj uyumu sipariş öncesinde ayrıca teyit edilmelidir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/yt600-android-mini-projektor/main.webp', 'https://tvcmall.en.made-in-china.com/product/awlfOPkCEZGY/China-Yt600-Football-Projector-720p-Android-13-170-ANSI-WiFi-6-Us-Plug.html', 23
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('YT600')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'yt600-android-mini-projektor'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000023';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000023';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000023', 'images/products/yt600-android-mini-projektor/main.webp', 'YT600 Android mini projektör ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00OJHhbifGaVRa/product.webp'),
('20000000-0000-0000-0000-000000000023', 'images/products/yt600-android-mini-projektor/01.webp', 'YT600 yt600 android 13 wi-fi görünüm 1', 1, 'https://image.made-in-china.com/2f0j00ywDhcCfqCiRa/product.webp'),
('20000000-0000-0000-0000-000000000023', 'images/products/yt600-android-mini-projektor/02.webp', 'YT600 yt600 android 13 wi-fi görünüm 2', 2, 'https://image.made-in-china.com/2f0j00OwHhcyYPClRT/product.webp'),
('20000000-0000-0000-0000-000000000023', 'images/products/yt600-android-mini-projektor/03.webp', 'YT600 yt600 android 13 wi-fi görünüm 3', 3, 'https://image.made-in-china.com/2f0j00JALWkTfMgiYa/product.webp'),
('20000000-0000-0000-0000-000000000023', 'images/products/yt600-android-mini-projektor/04.webp', 'YT600 yt600 android 13 wi-fi görünüm 4', 4, 'https://image.made-in-china.com/2f0j00mAIWcuYJZhRT/product.webp'),
('20000000-0000-0000-0000-000000000023', 'images/products/yt600-android-mini-projektor/05.webp', 'YT600 yt600 android 13 wi-fi görünüm 5', 5, 'https://image.made-in-china.com/2f0j00AJIhqWYggVUt/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000023', 'Çözünürlük', '720p doğal', 0),
('20000000-0000-0000-0000-000000000023', 'İşletim sistemi', 'Android 13', 1),
('20000000-0000-0000-0000-000000000023', 'Kablosuz', 'Wi-Fi 6', 2),
('20000000-0000-0000-0000-000000000023', 'Bluetooth', '5.4', 3),
('20000000-0000-0000-0000-000000000023', 'Parlaklık', '170 ANSI', 4),
('20000000-0000-0000-0000-000000000023', 'Decode', '4K decode desteği', 5),
('20000000-0000-0000-0000-000000000023', 'Odak', 'Elektronik focus', 6),
('20000000-0000-0000-0000-000000000023', 'Keystone', 'Keystone düzeltme', 7);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000024', 'sh861-kablosuz-lastik-pompasi', 'SH861 Dijital Kablosuz Lastik Şişirme Pompası', 'OEM', 'SH861',
  '10000000-0000-0000-0000-000000000008', $d$100 PSI dijital ekranlı, otomatik durduran kablosuz lastik pompası.$d$, $d$SH861, araç, motosiklet ve bisiklet lastikleri için tasarlanmış kablosuz bir şişirme pompasıdır. 100 PSI azami basınç, 25 L/dk debi ve dijital basınç ekranı üretici teknik verisidir. Hedef basınca ulaşınca otomatik durdurma lastik basıncını kontrol etmeyi kolaylaştırır.

PSI, BAR ve KPA birimleri arasında geçiş yapılabilir. Type-C şarj, LED / SOS ışık ve powerbank işlevi yol kenarı kullanımına yöneliktir. Gerçek şişirme süresi lastik hacmine göre değişir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/sh861-kablosuz-lastik-pompasi/main.webp', 'https://nbshers.en.made-in-china.com/product/mnWYhOldOtRp/China-Smart-Digital-Cordless-Wireless-Rechargeable-Tyre-Inflator-Air-Pump.html', 24
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('SH861')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'sh861-kablosuz-lastik-pompasi'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000024';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000024';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000024', 'images/products/sh861-kablosuz-lastik-pompasi/main.webp', 'SH861 kablosuz lastik şişirme pompası ürün görünümü', 0, 'https://image.made-in-china.com/203f0j00UfMoqaBdAcgw/product.webp'),
('20000000-0000-0000-0000-000000000024', 'images/products/sh861-kablosuz-lastik-pompasi/01.webp', 'SH861 sh861 dijital kablosuz lastik görünüm 1', 1, 'https://image.made-in-china.com/2f0j00fYCbcpBRHogm/product.webp'),
('20000000-0000-0000-0000-000000000024', 'images/products/sh861-kablosuz-lastik-pompasi/02.webp', 'SH861 sh861 dijital kablosuz lastik görünüm 2', 2, 'https://image.made-in-china.com/2f0j00UYCbqlMyrouJ/product.webp'),
('20000000-0000-0000-0000-000000000024', 'images/products/sh861-kablosuz-lastik-pompasi/03.webp', 'SH861 sh861 dijital kablosuz lastik görünüm 3', 3, 'https://image.made-in-china.com/203f0j00fYMqbCBcfkpJ/product.webp'),
('20000000-0000-0000-0000-000000000024', 'images/products/sh861-kablosuz-lastik-pompasi/04.webp', 'SH861 sh861 dijital kablosuz lastik görünüm 4', 4, 'https://image.made-in-china.com/2f0j00UGBcqOMzEbrw/product.webp'),
('20000000-0000-0000-0000-000000000024', 'images/products/sh861-kablosuz-lastik-pompasi/05.webp', 'SH861 sh861 dijital kablosuz lastik görünüm 5', 5, 'https://image.made-in-china.com/2f0j00gUvqkTBEYbzw/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000024', 'Basınç', '100 PSI', 0),
('20000000-0000-0000-0000-000000000024', 'Batarya', '2600mAh', 1),
('20000000-0000-0000-0000-000000000024', 'Debi', '25 L/dk', 2),
('20000000-0000-0000-0000-000000000024', 'Ekran', 'Dijital basınç', 3),
('20000000-0000-0000-0000-000000000024', 'Durdurma', 'Otomatik', 4),
('20000000-0000-0000-0000-000000000024', 'Birimler', 'PSI / BAR / KPA', 5),
('20000000-0000-0000-0000-000000000024', 'Şarj', 'Type-C', 6),
('20000000-0000-0000-0000-000000000024', 'Ek işlev', 'LED / SOS ve powerbank', 7);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000025', 'eraclean-ga02-ultrasonik-temizleyici', 'EraClean GA02 Şarjlı Ultrasonik Temizleyici', 'EraClean', 'GA02',
  '10000000-0000-0000-0000-000000000007', $d$45 kHz, 340 ml SUS304 hazneli şarjlı ultrasonik temizleyici.$d$, $d$EraClean GA02, takı, gözlük ve benzeri küçük metal/cam parçalar için tasarlanmış taşınabilir bir ultrasonik temizleyicidir. 45 kHz ultrasonik frekans, 340 ml SUS304 hazne ve 15W güç üretici teknik verisidir. 3 dakikalık otomatik program kısa temizlik döngüsü sunar.

Type-C şarj ve 840mAh batarya prizden bağımsız kullanıma yöneliktir. Su ve temizleme solüsyonu seçimi malzeme türüne göre yapılmalıdır.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/eraclean-ga02-ultrasonik-temizleyici/main.webp', 'https://eraclean.en.made-in-china.com/product/hwaGzogPXrkZ/China-SUS304-Stainless-Steel-Lithium-Battery-Portable-Mini-Ultrasonic-Cleaner-for-Jewelry-Watches-Rings-with-USB-Charging.html', 25
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('GA02')
    and coalesce(lower(existing.brand), '') = lower('EraClean')
    and existing.slug <> 'eraclean-ga02-ultrasonik-temizleyici'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000025';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000025';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000025', 'images/products/eraclean-ga02-ultrasonik-temizleyici/main.webp', 'EraClean GA02 şarjlı ultrasonik temizleyici ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00IWdljGqmMbUO/product.webp'),
('20000000-0000-0000-0000-000000000025', 'images/products/eraclean-ga02-ultrasonik-temizleyici/01.webp', 'GA02 eraclean ga02 şarjlı ultrasonik görünüm 1', 1, 'https://image.made-in-china.com/2f0j00DWwVjLcrfqRn/product.webp'),
('20000000-0000-0000-0000-000000000025', 'images/products/eraclean-ga02-ultrasonik-temizleyici/02.webp', 'GA02 eraclean ga02 şarjlı ultrasonik görünüm 2', 2, 'https://image.made-in-china.com/2f0j00DiJVSbcqMoYF/product.webp'),
('20000000-0000-0000-0000-000000000025', 'images/products/eraclean-ga02-ultrasonik-temizleyici/03.webp', 'GA02 eraclean ga02 şarjlı ultrasonik görünüm 3', 3, 'https://image.made-in-china.com/226f0j00PhAiZjcyGofN/product.webp'),
('20000000-0000-0000-0000-000000000025', 'images/products/eraclean-ga02-ultrasonik-temizleyici/04.webp', 'GA02 eraclean ga02 şarjlı ultrasonik görünüm 4', 4, 'https://image.made-in-china.com/226f0j00HVAiSdbGMqYn/product.webp'),
('20000000-0000-0000-0000-000000000025', 'images/products/eraclean-ga02-ultrasonik-temizleyici/05.webp', 'GA02 eraclean ga02 şarjlı ultrasonik görünüm 5', 5, 'https://image.made-in-china.com/226f0j00WlmiKfohrbYN/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000025', 'Frekans', '45 kHz', 0),
('20000000-0000-0000-0000-000000000025', 'Kapasite', '340 ml', 1),
('20000000-0000-0000-0000-000000000025', 'Güç', '15W', 2),
('20000000-0000-0000-0000-000000000025', 'Şarj', 'Type-C', 3),
('20000000-0000-0000-0000-000000000025', 'Batarya', '840mAh', 4),
('20000000-0000-0000-0000-000000000025', 'Hazne', 'SUS304', 5),
('20000000-0000-0000-0000-000000000025', 'Program', '3 dakika otomatik', 6),
('20000000-0000-0000-0000-000000000025', 'Kullanım', 'Takı ve gözlük', 7);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000026', 'bt3031-mini-camasir-makinesi', 'BT3031 USB Şarjlı Mini Çamaşır Makinesi', 'OEM', 'BT3031',
  '10000000-0000-0000-0000-000000000007', $d$5 litre kapasiteli, 10W USB şarjlı mini çamaşır makinesi.$d$, $d$BT3031, çorap, iç çamaşırı ve benzeri küçük tekstil ürünleri için tasarlanmış kompakt bir mini yıkama cihazıdır. 5 litre hazne ve 10W güç tüketimi ev tipi çamaşır makinesinin yerine geçmez; küçük porsiyonlar içindir.

USB şarj ve taşınabilir gövde yurt, ofis ve seyahat kullanımına yöneliktir. Yıkama performansı kumaş türü ve doluluk oranına göre değişir.$d$,
  null, null, 'TRY', 0, 'contact', false, true, 'images/products/bt3031-mini-camasir-makinesi/main.webp', 'https://ibriter888.en.made-in-china.com/product/eAaYfGHruZWt/China-Portable-Mini-Washer-Best-Wireless-Portable-Baby-Underclothes-Socks-Small-Washing-Machine-Automatic-Washing-Machine.html', 26
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('BT3031')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'bt3031-mini-camasir-makinesi'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000026';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000026';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000026', 'images/products/bt3031-mini-camasir-makinesi/main.webp', 'BT3031 USB şarjlı mini çamaşır makinesi ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00hPECDJHMrobN/product.webp'),
('20000000-0000-0000-0000-000000000026', 'images/products/bt3031-mini-camasir-makinesi/01.webp', 'BT3031 bt3031 usb şarjlı mini görünüm 1', 1, 'https://image.made-in-china.com/2f0j00oLQCHRDWHkbF/product.webp'),
('20000000-0000-0000-0000-000000000026', 'images/products/bt3031-mini-camasir-makinesi/02.webp', 'BT3031 bt3031 usb şarjlı mini görünüm 2', 2, 'https://image.made-in-china.com/2f0j00qPaBDIHZnkcN/product.webp'),
('20000000-0000-0000-0000-000000000026', 'images/products/bt3031-mini-camasir-makinesi/03.webp', 'BT3031 bt3031 usb şarjlı mini görünüm 3', 3, 'https://image.made-in-china.com/2f0j00qDaBPbIEHckN/product.webp'),
('20000000-0000-0000-0000-000000000026', 'images/products/bt3031-mini-camasir-makinesi/04.webp', 'BT3031 bt3031 usb şarjlı mini görünüm 4', 4, 'https://image.made-in-china.com/2f0j00qIEvPSLnLcoF/product.webp'),
('20000000-0000-0000-0000-000000000026', 'images/products/bt3031-mini-camasir-makinesi/05.webp', 'BT3031 bt3031 usb şarjlı mini görünüm 5', 5, 'https://image.made-in-china.com/2f0j00kDavPmIMLboy/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000026', 'Kapasite', '5 litre', 0),
('20000000-0000-0000-0000-000000000026', 'Güç', '10W', 1),
('20000000-0000-0000-0000-000000000026', 'Tasarım', 'Kompakt', 2),
('20000000-0000-0000-0000-000000000026', 'Kullanım', 'Küçük çamaşırlar', 3),
('20000000-0000-0000-0000-000000000026', 'Uygulama', 'Çorap ve küçük tekstil', 4),
('20000000-0000-0000-0000-000000000026', 'Yapı', 'Taşınabilir', 5);

insert into public.products (
  id, slug, name, brand, model, category_id, short_description, description,
  price, old_price, currency, stock_quantity, stock_status, featured, active, main_image, source_url, sort_order
)
select
  '20000000-0000-0000-0000-000000000027', 'mr-hx03-ayakkabi-kurutucu', 'MR-HX03 Katlanabilir Akıllı Ayakkabı Kurutucu', 'OEM', 'MR-HX03',
  '10000000-0000-0000-0000-000000000007', $d$150W, 40-45°C sabit sıcaklıklı katlanabilir ayakkabı kurutucu.$d$, $d$MR-HX03, ayakkabı, bot ve eldiven kurutmaya yönelik katlanabilir bir sıcak hava cihazıdır. 150W güç ve 40-45°C çalışma sıcaklığı üretici teknik verisidir. Zamanlayıcı ve çok yönlü hava çıkışı nemin dağılmasına yardımcı olur.

Katlanabilir gövde depolamayı kolaylaştırır. Fiş tipi ve voltaj bilgisi sipariş öncesinde teyit edilmelidir.$d$,
  null, null, 'TRY', 0, 'contact', true, true, 'images/products/mr-hx03-ayakkabi-kurutucu/main.webp', 'https://muren-tech.en.made-in-china.com/product/UaCYnAGVVvpM/China-2026-Multi-Hole-Heat-Dissipation-Constant-Deodorizer-Temperature-Warmer-Shoes-Dryer.html', 27
where not exists (
  select 1 from public.products existing
  where lower(existing.model) = lower('MR-HX03')
    and coalesce(lower(existing.brand), '') = lower('OEM')
    and existing.slug <> 'mr-hx03-ayakkabi-kurutucu'
)
on conflict (slug) do update set
  name = excluded.name, brand = excluded.brand, model = excluded.model, category_id = excluded.category_id,
  short_description = excluded.short_description, description = excluded.description,
  price = null, old_price = null, featured = excluded.featured, active = true,
  main_image = excluded.main_image, source_url = excluded.source_url, sort_order = excluded.sort_order;

delete from public.product_images where product_id = '20000000-0000-0000-0000-000000000027';
delete from public.product_features where product_id = '20000000-0000-0000-0000-000000000027';
insert into public.product_images (product_id, image_path, alt_text, sort_order, source_image_url) values
('20000000-0000-0000-0000-000000000027', 'images/products/mr-hx03-ayakkabi-kurutucu/main.webp', 'MR-HX03 katlanabilir ayakkabı kurutucu ürün görünümü', 0, 'https://image.made-in-china.com/2f0j00RuGefFKygUgc/product.webp'),
('20000000-0000-0000-0000-000000000027', 'images/products/mr-hx03-ayakkabi-kurutucu/01.webp', 'MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 1', 1, 'https://image.made-in-china.com/2f0j00pzRCYTSnqGuk/product.webp'),
('20000000-0000-0000-0000-000000000027', 'images/products/mr-hx03-ayakkabi-kurutucu/02.webp', 'MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 2', 2, 'https://image.made-in-china.com/2f0j00pzfvRrsqVYub/product.webp'),
('20000000-0000-0000-0000-000000000027', 'images/products/mr-hx03-ayakkabi-kurutucu/03.webp', 'MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 3', 3, 'https://image.made-in-china.com/2f0j00puUMfWKrIYzo/product.webp'),
('20000000-0000-0000-0000-000000000027', 'images/products/mr-hx03-ayakkabi-kurutucu/04.webp', 'MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 4', 4, 'https://image.made-in-china.com/2f0j00puGCfBsdgUrq/product.webp'),
('20000000-0000-0000-0000-000000000027', 'images/products/mr-hx03-ayakkabi-kurutucu/05.webp', 'MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 5', 5, 'https://image.made-in-china.com/2f0j00zuUCYNsRvfrq/product.webp');
insert into public.product_features (product_id, label, value, sort_order) values
('20000000-0000-0000-0000-000000000027', 'Güç', '150W', 0),
('20000000-0000-0000-0000-000000000027', 'Sıcaklık', '40-45°C', 1),
('20000000-0000-0000-0000-000000000027', 'Zamanlayıcı', 'Var', 2),
('20000000-0000-0000-0000-000000000027', 'Tasarım', 'Katlanabilir', 3),
('20000000-0000-0000-0000-000000000027', 'Hava çıkışı', 'Çok yönlü', 4),
('20000000-0000-0000-0000-000000000027', 'Kullanım', 'Ayakkabı, bot ve eldiven', 5);

