update public.products set
  price = 499,
  old_price = null,
  price_source_url = 'https://bulbultoptan.com/index.php?route=tool%2Fprice_list',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Piyasa emsali satış fiyatı; exact model açık liste fiyatı yerine aynı segment BLIC 6–7W hoparlörler baz alındı',
  updated_at = now()
where slug = 'blic-bls-92';

update public.products set
  price = 549,
  old_price = null,
  price_source_url = 'https://www.akakce.com/bluetooth-hoparlor/en-ucuz-blic-tasinabilir-ses-bombasi-bls-06-fiyati%2C395054240.html',
  price_checked_at = '2026-08-21T00:00:00+03:00',
  price_note = 'Piyasa emsali satış fiyatı; exact model açık liste fiyatı yerine telefon standlı BLIC BLS-61 ve aynı segment modeller baz alındı',
  updated_at = now()
where slug = 'blic-bls-96';
