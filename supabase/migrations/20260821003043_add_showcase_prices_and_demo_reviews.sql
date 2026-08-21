alter table public.products
  add column price_source_url text,
  add column price_checked_at timestamptz,
  add column price_note text;

update public.products set
  price = 6899,
  old_price = 9000,
  price_source_url = 'https://bielma.net/en/collections/aksesuarlar?page=3',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Türkiye perakende liste fiyatı'
where slug = 'yesido-wb65';

update public.products set
  price = 669,
  old_price = null,
  price_source_url = 'https://enshall.com.tr/linkage-lkb-39-bluetooth-kulaklik',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Türkiye perakende liste fiyatı'
where slug = 'linkage-lkb-39';

update public.products set
  price = 428,
  old_price = 665,
  price_source_url = 'https://www.kulisbilisimteknoloji.com/',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Türkiye perakende kampanya fiyatı'
where slug = 'blic-bls-74';

update public.products set
  price = 3699,
  old_price = null,
  price_source_url = 'https://yesido.com.tr/en/products/yesido-ec27-2in1-buz-kirma-ozellikli-meyve-sikacagi-gri',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Resmî Türkiye satış fiyatı'
where slug = 'yesido-ec27';

update public.products set
  price = 1233,
  old_price = 2592,
  price_source_url = 'https://www.noon.com/qatar-en/neck-and-shoulder-massager-4d-deep-kneading-with-dual-heat-cordless-rechargeable-soft-silicone-heads-for-back-arms-legs-calves-olive-green/N70307697V/p/',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'QAR 94,16 / QAR 198 fiyatları 1 QAR = 13,09 TRY kuruyla çevrildi'
where slug = 'cy-818';

update public.products set
  price = null,
  old_price = null,
  price_source_url = source_url,
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Exact model fiyatı bayi girişi arkasında; fiyat uydurulmadı'
where slug in ('blic-bls-92', 'blic-bls-96');

alter table public.product_reviews
  add column is_demo boolean not null default false;

drop policy "public submits reviews for moderation" on public.product_reviews;
create policy "public submits reviews for moderation"
on public.product_reviews for insert to anon
with check (
  approved = false
  and approved_at is null
  and is_demo = false
  and exists (select 1 from public.products p where p.id = product_id and p.active = true)
);

insert into public.product_reviews
  (id, product_id, reviewer_name, rating, comment, approved, approved_at, created_at, is_demo)
values
  ('30000000-0000-0000-0000-000000000001','20000000-0000-0000-0000-000000000001','Demo profil',5,'Parmak izi kilidi ve düzenli iç bölmeler günlük kullanım için oldukça pratik görünüyor.',true,now(),now() - interval '18 days',true),
  ('30000000-0000-0000-0000-000000000002','20000000-0000-0000-0000-000000000001','Demo profil',4,'Ölçü ve malzeme bilgilerinin açıkça verilmesi ürünü değerlendirmeyi kolaylaştırıyor.',true,now(),now() - interval '11 days',true),
  ('30000000-0000-0000-0000-000000000003','20000000-0000-0000-0000-000000000002','Demo profil',5,'Boyun askılı tasarım ve USB-C şarj desteği kullanım senaryosu açısından güçlü görünüyor.',true,now(),now() - interval '16 days',true),
  ('30000000-0000-0000-0000-000000000004','20000000-0000-0000-0000-000000000003','Demo profil',4,'Kompakt gövde, taşıma kulbu ve bağlantı seçenekleri masaüstü kullanım için iyi düşünülmüş.',true,now(),now() - interval '13 days',true),
  ('30000000-0000-0000-0000-000000000005','20000000-0000-0000-0000-000000000004','Demo profil',5,'Telefon standı ayrıntısı ürünü benzer kompakt hoparlörlerden ayırıyor.',true,now(),now() - interval '9 days',true),
  ('30000000-0000-0000-0000-000000000006','20000000-0000-0000-0000-000000000005','Demo profil',5,'Retro tasarım, RGB ışık ve TWS desteği birlikte dengeli bir özellik seti sunuyor.',true,now(),now() - interval '15 days',true),
  ('30000000-0000-0000-0000-000000000007','20000000-0000-0000-0000-000000000005','Demo profil',4,'Kompakt boyutuna rağmen farklı bağlantı seçeneklerinin bulunması kullanışlı görünüyor.',true,now(),now() - interval '7 days',true),
  ('30000000-0000-0000-0000-000000000008','20000000-0000-0000-0000-000000000006','Demo profil',5,'İki karıştırma kabı ve çıkarılabilir bıçak sistemi mutfakta pratik bir kullanım vadediyor.',true,now(),now() - interval '12 days',true),
  ('30000000-0000-0000-0000-000000000009','20000000-0000-0000-0000-000000000006','Demo profil',4,'800W motor ve öğütücü işlevinin tek pakette olması ürün seçimini kolaylaştırıyor.',true,now(),now() - interval '6 days',true),
  ('30000000-0000-0000-0000-000000000010','20000000-0000-0000-0000-000000000007','Demo profil',5,'Taşınabilir yapı ile ısıtmalı masaj işlevinin bir arada sunulması dikkat çekici.',true,now(),now() - interval '10 days',true)
on conflict (id) do nothing;
