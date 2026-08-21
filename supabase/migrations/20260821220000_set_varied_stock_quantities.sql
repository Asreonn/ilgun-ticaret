update public.products as p
set
  stock_quantity = patch.qty,
  stock_status = patch.status
from (
  values
    ('yesido-wb65', 4, 'in_stock'),
    ('linkage-lkb-39', 3, 'in_stock'),
    ('blic-bls-92', 6, 'in_stock'),
    ('blic-bls-96', 2, 'low_stock'),
    ('blic-bls-74', 5, 'in_stock'),
    ('yesido-ec27', 3, 'in_stock'),
    ('cy-818', 4, 'in_stock'),
    ('by-k36b-sarjli-akilli-seyahat-kettle', 2, 'low_stock'),
    ('mdl-16-sarjli-tasinabilir-blender', 5, 'in_stock'),
    ('fs-yd03-katlanabilir-seyahat-buharli-utu', 3, 'in_stock'),
    ('aby-318a-isitmali-yemek-kutusu', 4, 'in_stock'),
    ('euhomy-im005-buz-makinesi', 2, 'low_stock'),
    ('me2409-tasinabilir-espresso-makinesi', 6, 'in_stock'),
    ('kh-550-mini-masaj-tabancasi', 3, 'in_stock'),
    ('pm69-isitmali-mini-masaj-tabancasi', 5, 'in_stock'),
    ('f029-katlanabilir-boyun-fani', 7, 'in_stock'),
    ('hw05-el-isitici-powerbank', 2, 'low_stock'),
    ('xz-bt512-akilli-masa-istasyonu', 4, 'in_stock'),
    ('xg-230-mini-supurge-hava-ufleyici', 3, 'in_stock'),
    ('ms-e004-5-elektrikli-tornavida', 5, 'in_stock'),
    ('pt-9bf-parmak-izli-akilli-kilit', 2, 'low_stock'),
    ('eg12-ai-akilli-gozluk', 3, 'in_stock'),
    ('yt600-android-mini-projektor', 4, 'in_stock'),
    ('sh861-kablosuz-lastik-pompasi', 6, 'in_stock'),
    ('eraclean-ga02-ultrasonik-temizleyici', 2, 'low_stock'),
    ('bt3031-mini-camasir-makinesi', 3, 'in_stock'),
    ('mr-hx03-ayakkabi-kurutucu', 5, 'in_stock')
) as patch(slug, qty, status)
where p.slug = patch.slug;
