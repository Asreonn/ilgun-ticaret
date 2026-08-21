alter table public.product_reviews
  add column if not exists images text[] not null default '{}';

update public.product_reviews as review
set
  comment = patch.comment,
  images = patch.images
from (
  values
    ('yesido-wb65', 'Elif Kaya', 'Çantayı açınca iç düzeni fotoğraftaki gibi çıktı. Laptop ayrı bölmede duruyor, parmak izi ilk denemede açtı. İşe giderken telefon ve powerbank karışmıyor.', array['images/reviews/wb65-elif.webp']),
    ('yesido-wb65', 'Mert Yılmaz', 'Kumaş kalın, dikişler sağlam duruyor. USB çıkışından telefonu şarj etmek pratik oldu, kabloyu çantanın içinden geçiriyorum.', array[]::text[]),
    ('yesido-wb65', 'Selin Arslan', 'Sırt pedi rahat ama tam doluyken omuzda biraz ağır. 15 inç laptop sığdı. Yazın askılar terletebiliyor, kışın sorun yok.', array[]::text[]),
    ('yesido-wb65', 'Burak Tekin', 'Parmak iziyle 1-2 saniyede açılıyor. Seyahatte laptop ve evrak için kullandım, kilidi olunca kafe masasında daha rahat bırakıyorum.', array[]::text[]),
    ('yesido-wb65', 'Deniz Şahin', 'Kısa yağmurda içi ıslanmadı. Fermuarlar ilk günler biraz sertti, sonra yumuşadı. Günlük işimi görüyor.', array[]::text[]),
    ('linkage-lkb-39', 'Ahmet Demir', 'Kutu ve ürün fotoğraftaki gibi geldi. Boyunluk koşuda kaymıyor, ekranda şarjı görmek işe yarıyor. Kulak içi biraz sıkı ama düşmüyor, ses net.', array['images/reviews/lkb39-ahmet.webp']),
    ('linkage-lkb-39', 'Ceren Bilgin', 'Telefona hemen bağlandı. USB-C şarj günlük kullanıma yetiyor. Bass cılız kaçıyor, podcast ve YouTube için yeterli.', array[]::text[]),
    ('linkage-lkb-39', 'Yusuf Kaplan', 'Hafıza kartıyla telefonsuz dinledim, tuşlar net. Kutudaki 600 saat iddiası abartılı ama bende 2-3 gün rahat gidiyor. Elime öyle ulaştı.', array['images/reviews/lkb39-yusuf.webp']),
    ('blic-bls-92', 'Gizem Nur', 'Masamda duruyor, turuncu önü canlı. Bu boyuta göre sesi doyurucu, kulbuyla odaya taşımak kolay. Komşuyu rahatsız etmeyecek seviyede.', array['images/reviews/bls92-gizem.webp']),
    ('blic-bls-92', 'Emre Polat', 'Bluetooth hemen tuttu. USB bellek ve kart da denedim, ikisi çalıştı. Yüksek seste biraz tizleşiyor, orta seviyede sorun yok.', array[]::text[]),
    ('blic-bls-92', 'Aylin Rüzgar', 'Masaüstü için tam boy. Titreşim az. Işığı yok, sade duruyor; gece açık unutsam bile fazla basmıyor.', array[]::text[]),
    ('blic-bls-92', 'Hakan Levent', 'Kutusu shrink''li geldi, model BLS-92 yazıyor. Sesi net, arkadaşlar da sordu. İkinciyi ofise almayı düşünüyorum.', array['images/reviews/bls92-hakan.webp']),
    ('blic-bls-96', 'Nazlı Can', 'Telefonu üstüne koyup hem video izleyip hem müzik açıyorum, stand gerçekten işe yarıyor. Askısıyla balkona çıkardım. Sesi dengeli.', array['images/reviews/bls96-nazli.webp']),
    ('blic-bls-96', 'Okan Mutlu', 'Kutu fotoğraftaki BLS-96. Askılı taşıması kolay. Küçük oda için yeterli, salonu doldurmaz. Stand kaydırınca telefon duruyor.', array['images/reviews/bls96-okan.webp']),
    ('blic-bls-74', 'İrem Filiz', 'Kutu tam görseldeki retro model. Işıklar açıkken hoş duruyor, sesi küçük gövdesine göre tok. Beyaz kasa masada şık durdu.', array['images/reviews/bls74-irem.webp']),
    ('blic-bls-74', 'Caner Han', 'İki tanesini TWS yaptık, stereo fark ediliyor. Bağlantı kopmadı. RGB gece biraz fazla kaçıyor, kapatınca daha iyi.', array[]::text[]),
    ('blic-bls-74', 'Pınar Erdem', 'Hediye ettim, kutu elime böyle geldi. Hem görünümü hem sesi beğenildi, iade filan olmadı.', array['images/reviews/bls74-pinar.webp']),
    ('yesido-ec27', 'Fatma Sönmez', 'Smoothie kabı ve öğütücü ayrı geldi, kahvaltıda işimi hızlandırdı. Bıçaklar paslanmaz, yıkaması kolay. 800W buzu da çekiyor.', array['images/reviews/ec27-fatma.webp']),
    ('yesido-ec27', 'Mehmet Aksoy', 'Kaymaz tabanı sağlam, buzu kırıyor. Sesi yüksek; sabah erken kullanınca ev uyanıyor. Sonuç güzel çıkıyor.', array[]::text[]),
    ('yesido-ec27', 'Zeynep Uçar', 'İki kap gerçekten lazım oluyor. Çilekli smoothie ve bakliyatı ayrı tuttum. Temizliği 2 dakikayı geçmiyor.', array['images/reviews/ec27-zeynep.webp']),
    ('yesido-ec27', 'Serkan Balcı', 'Öğütücü kuru bakliyatta işe yaradı. Performans iyi, sesi var; mutfakta kapalı kapıyla idare ediyor.', array[]::text[]),
    ('cy-818', 'Leyla Güneş', 'Akşam boyun ve omuza koyunca ısıtma devreye giriyor, parmak uçları gibi basıyor. Tasarımı tuhaf ama evde durması hoş. 20 dakika bana yetiyor.', array['images/reviews/cy818-leyla.webp']),
    ('cy-818', 'Tuna Varol', 'Şarjı birkaç güne yetiyor, seyahatte çantaya sığdı. Başlıklar yumuşak. Uzun kullanınca gövde biraz ısınıyor, kısa seanslarda sorun yok.', array[]::text[]),
    ('cy-818', 'Melis Özkan', 'Isıtma kademesi abartısız, uzun oturunca omuzumu sıkmıyor. Ayak ışığı yanınca evde eğlenceli duruyor, asıl işi masaj.', array['images/reviews/cy818-melis.webp'])
) as patch(slug, reviewer_name, comment, images)
join public.products on products.slug = patch.slug
where review.product_id = products.id
  and review.reviewer_name = patch.reviewer_name;
