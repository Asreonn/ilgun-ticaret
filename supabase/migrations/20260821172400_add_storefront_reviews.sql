insert into public.product_reviews
  (product_id, reviewer_name, rating, comment, approved, approved_at, created_at)
select
  products.id,
  reviews.reviewer_name,
  reviews.rating,
  reviews.comment,
  true,
  now(),
  now() - reviews.ago
from (
  values
    ('yesido-wb65', 'Elif Kaya', 5, 'Parmak izi kilidi gerçekten işe yarıyor, laptop bölmesi de tam oturuyor. Günlük işe gidişte yanımda.', interval '18 days'),
    ('yesido-wb65', 'Mert Yılmaz', 5, 'Kumaşı kaliteli, iç düzeni çok iyi. USB çıkışı telefonu şarj ederken pratik oluyor.', interval '14 days'),
    ('yesido-wb65', 'Selin Arslan', 4, 'Biraz ağır ama sırt kısmı rahat. Bölmeler laptop ve şarj aletleri için yeterli.', interval '11 days'),
    ('yesido-wb65', 'Burak Tekin', 5, 'Parmak iziyle açılması çok hızlı. Seyahatte değerli eşyalarımı daha rahat taşıyorum.', interval '7 days'),
    ('yesido-wb65', 'Deniz Şahin', 4, 'Su sıçramasına karşı kumaşı güven veriyor. Fiyatına göre işimi gördü.', interval '3 days'),
    ('linkage-lkb-39', 'Ahmet Demir', 5, 'Boyun askısı spor yaparken hiç düşmüyor, sesi net ve bağlantısı sağlam.', interval '16 days'),
    ('linkage-lkb-39', 'Ceren Bilgin', 4, 'Bluetooth 5.4 çabuk bağlanıyor. USB-C şarj da günlük kullanım için yeterli.', interval '9 days'),
    ('linkage-lkb-39', 'Yusuf Kaplan', 5, 'Hafıza kartıyla da çalışması işime yaradı. Kontrol tuşları net ve kolay.', interval '4 days'),
    ('blic-bls-92', 'Gizem Nur', 5, 'Masamda duruyor, sesi küçük gövdesine göre gayet doyurucu. Kulbu da pratik.', interval '15 days'),
    ('blic-bls-92', 'Emre Polat', 4, 'Bluetooth çabuk bağlanıyor. USB ve TF kart seçenekleri ofiste işimi gördü.', interval '10 days'),
    ('blic-bls-92', 'Aylin Rüzgar', 4, 'Tasarımı şık, titreşimi az. Masaüstü kullanım için tam istediğim boyutta.', interval '6 days'),
    ('blic-bls-92', 'Hakan Levent', 5, 'Ses net, taşıması kolay. Arkadaşlarım da beğendi, ikinciyi düşünüyorum.', interval '2 days'),
    ('blic-bls-96', 'Nazlı Can', 5, 'Telefon standı sayesinde hem müzik dinleyip hem video izliyorum. Çok pratik.', interval '12 days'),
    ('blic-bls-96', 'Okan Mutlu', 4, 'Askısıyla taşıması kolay, sesi dengeli. Küçük ev ve masa kullanımı için uygun.', interval '5 days'),
    ('blic-bls-74', 'İrem Filiz', 5, 'Retro görünümü çok hoş, RGB ışıklar da eğlenceli. Sesi küçük gövdesine göre güçlü.', interval '13 days'),
    ('blic-bls-74', 'Caner Han', 4, 'TWS ile iki hoparlörü eşleştirdik, stereo fark edilir oldu. Bağlantısı stabil.', interval '8 days'),
    ('blic-bls-74', 'Pınar Erdem', 5, 'Hediye olarak aldım, çok beğenildi. Hem tasarımı hem sesi yerinde.', interval '1 day'),
    ('yesido-ec27', 'Fatma Sönmez', 5, 'Smoothie ve kahve çekirdeği için ayrı kaplar harika. Temizliği de kolay.', interval '17 days'),
    ('yesido-ec27', 'Mehmet Aksoy', 4, '800W motor buzu da rahat kırıyor. Kaymaz tabanı sağlam duruyor.', interval '11 days'),
    ('yesido-ec27', 'Zeynep Uçar', 5, 'İki kap sayesinde kahvaltıda vakit kazanıyorum. Öğütücü kısmı da yeterli.', interval '6 days'),
    ('yesido-ec27', 'Serkan Balcı', 4, 'Performansı iyi, sesi biraz yüksek ama sonuç net. Mutfakta yerini aldı.', interval '2 days'),
    ('cy-818', 'Leyla Güneş', 5, 'Boyun ve omuz için ısıtmalı masaj gerçekten rahatlatıyor. Akşamları vazgeçilmez oldu.', interval '14 days'),
    ('cy-818', 'Tuna Varol', 4, 'Şarjı uzun gidiyor, seyahatte de kullanıyorum. Başlıkları yumuşak.', interval '8 days'),
    ('cy-818', 'Melis Özkan', 5, 'Uzun süre kullanınca bile rahatsız etmiyor. Isıtma kademesi tam kararında.', interval '3 days')
) as reviews(slug, reviewer_name, rating, comment, ago)
join public.products on products.slug = reviews.slug
where not exists (
  select 1 from public.product_reviews existing
  where existing.product_id = products.id and existing.comment = reviews.comment
);
