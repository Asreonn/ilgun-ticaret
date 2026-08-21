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
