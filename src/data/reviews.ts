import type { Product, ProductReview } from "../types";

type SeedReview = Omit<ProductReview, "product_id" | "approved"> & { slug: string };

const daysAgo = (days: number) => {
  const date = new Date("2026-08-21T12:00:00+03:00");
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const photo = (name: string) => `images/reviews/${name}.webp`;

const seed: SeedReview[] = [
  {
    id: "rev-wb65-1",
    slug: "yesido-wb65",
    reviewer_name: "Elif Kaya",
    rating: 5,
    comment: "Çantayı açınca iç düzeni fotoğraftaki gibi çıktı. Laptop ayrı bölmede duruyor, parmak izi ilk denemede açtı. İşe giderken telefon ve powerbank karışmıyor.",
    images: [photo("wb65-elif")],
    created_at: daysAgo(18)
  },
  {
    id: "rev-wb65-2",
    slug: "yesido-wb65",
    reviewer_name: "Mert Yılmaz",
    rating: 5,
    comment: "Kumaş kalın, dikişler sağlam duruyor. USB çıkışından telefonu şarj etmek pratik oldu, kabloyu çantanın içinden geçiriyorum.",
    created_at: daysAgo(14)
  },
  {
    id: "rev-wb65-3",
    slug: "yesido-wb65",
    reviewer_name: "Selin Arslan",
    rating: 4,
    comment: "Sırt pedi rahat ama tam doluyken omuzda biraz ağır. 15 inç laptop sığdı. Yazın askılar terletebiliyor, kışın sorun yok.",
    created_at: daysAgo(11)
  },
  {
    id: "rev-wb65-4",
    slug: "yesido-wb65",
    reviewer_name: "Burak Tekin",
    rating: 5,
    comment: "Parmak iziyle 1-2 saniyede açılıyor. Seyahatte laptop ve evrak için kullandım, kilidi olunca kafe masasında daha rahat bırakıyorum.",
    created_at: daysAgo(7)
  },
  {
    id: "rev-wb65-5",
    slug: "yesido-wb65",
    reviewer_name: "Deniz Şahin",
    rating: 4,
    comment: "Kısa yağmurda içi ıslanmadı. Fermuarlar ilk günler biraz sertti, sonra yumuşadı. Günlük işimi görüyor.",
    created_at: daysAgo(3)
  },

  {
    id: "rev-lkb-1",
    slug: "linkage-lkb-39",
    reviewer_name: "Ahmet Demir",
    rating: 5,
    comment: "Kutu ve ürün fotoğraftaki gibi geldi. Boyunluk koşuda kaymıyor, ekranda şarjı görmek işe yarıyor. Kulak içi biraz sıkı ama düşmüyor, ses net.",
    images: [photo("lkb39-ahmet")],
    created_at: daysAgo(16)
  },
  {
    id: "rev-lkb-2",
    slug: "linkage-lkb-39",
    reviewer_name: "Ceren Bilgin",
    rating: 4,
    comment: "Telefona hemen bağlandı. USB-C şarj günlük kullanıma yetiyor. Bass cılız kaçıyor, podcast ve YouTube için yeterli.",
    created_at: daysAgo(9)
  },
  {
    id: "rev-lkb-3",
    slug: "linkage-lkb-39",
    reviewer_name: "Yusuf Kaplan",
    rating: 5,
    comment: "Hafıza kartıyla telefonsuz dinledim, tuşlar net. Kutudaki 600 saat iddiası abartılı ama bende 2-3 gün rahat gidiyor. Elime öyle ulaştı.",
    images: [photo("lkb39-yusuf")],
    created_at: daysAgo(4)
  },

  {
    id: "rev-92-1",
    slug: "blic-bls-92",
    reviewer_name: "Gizem Nur",
    rating: 5,
    comment: "Masamda duruyor, turuncu önü canlı. Bu boyuta göre sesi doyurucu, kulbuyla odaya taşımak kolay. Komşuyu rahatsız etmeyecek seviyede.",
    images: [photo("bls92-gizem")],
    created_at: daysAgo(15)
  },
  {
    id: "rev-92-2",
    slug: "blic-bls-92",
    reviewer_name: "Emre Polat",
    rating: 4,
    comment: "Bluetooth hemen tuttu. USB bellek ve kart da denedim, ikisi çalıştı. Yüksek seste biraz tizleşiyor, orta seviyede sorun yok.",
    created_at: daysAgo(10)
  },
  {
    id: "rev-92-3",
    slug: "blic-bls-92",
    reviewer_name: "Aylin Rüzgar",
    rating: 4,
    comment: "Masaüstü için tam boy. Titreşim az. Işığı yok, sade duruyor; gece açık unutsam bile fazla basmıyor.",
    created_at: daysAgo(6)
  },
  {
    id: "rev-92-4",
    slug: "blic-bls-92",
    reviewer_name: "Hakan Levent",
    rating: 5,
    comment: "Kutusu shrink'li geldi, model BLS-92 yazıyor. Sesi net, arkadaşlar da sordu. İkinciyi ofise almayı düşünüyorum.",
    images: [photo("bls92-hakan")],
    created_at: daysAgo(2)
  },

  {
    id: "rev-96-1",
    slug: "blic-bls-96",
    reviewer_name: "Nazlı Can",
    rating: 5,
    comment: "Telefonu üstüne koyup hem video izleyip hem müzik açıyorum, stand gerçekten işe yarıyor. Askısıyla balkona çıkardım. Sesi dengeli.",
    images: [photo("bls96-nazli")],
    created_at: daysAgo(12)
  },
  {
    id: "rev-96-2",
    slug: "blic-bls-96",
    reviewer_name: "Okan Mutlu",
    rating: 4,
    comment: "Kutu fotoğraftaki BLS-96. Askılı taşıması kolay. Küçük oda için yeterli, salonu doldurmaz. Stand kaydırınca telefon duruyor.",
    images: [photo("bls96-okan")],
    created_at: daysAgo(5)
  },

  {
    id: "rev-74-1",
    slug: "blic-bls-74",
    reviewer_name: "İrem Filiz",
    rating: 5,
    comment: "Kutu tam görseldeki retro model. Işıklar açıkken hoş duruyor, sesi küçük gövdesine göre tok. Beyaz kasa masada şık durdu.",
    images: [photo("bls74-irem")],
    created_at: daysAgo(13)
  },
  {
    id: "rev-74-2",
    slug: "blic-bls-74",
    reviewer_name: "Caner Han",
    rating: 4,
    comment: "İki tanesini TWS yaptık, stereo fark ediliyor. Bağlantı kopmadı. RGB gece biraz fazla kaçıyor, kapatınca daha iyi.",
    created_at: daysAgo(8)
  },
  {
    id: "rev-74-3",
    slug: "blic-bls-74",
    reviewer_name: "Pınar Erdem",
    rating: 5,
    comment: "Hediye ettim, kutu elime böyle geldi. Hem görünümü hem sesi beğenildi, iade filan olmadı.",
    images: [photo("bls74-pinar")],
    created_at: daysAgo(1)
  },

  {
    id: "rev-ec-1",
    slug: "yesido-ec27",
    reviewer_name: "Fatma Sönmez",
    rating: 5,
    comment: "Smoothie kabı ve öğütücü ayrı geldi, kahvaltıda işimi hızlandırdı. Bıçaklar paslanmaz, yıkaması kolay. 800W buzu da çekiyor.",
    images: [photo("ec27-fatma")],
    created_at: daysAgo(17)
  },
  {
    id: "rev-ec-2",
    slug: "yesido-ec27",
    reviewer_name: "Mehmet Aksoy",
    rating: 4,
    comment: "Kaymaz tabanı sağlam, buzu kırıyor. Sesi yüksek; sabah erken kullanınca ev uyanıyor. Sonuç güzel çıkıyor.",
    created_at: daysAgo(11)
  },
  {
    id: "rev-ec-3",
    slug: "yesido-ec27",
    reviewer_name: "Zeynep Uçar",
    rating: 5,
    comment: "İki kap gerçekten lazım oluyor. Çilekli smoothie ve bakliyatı ayrı tuttum. Temizliği 2 dakikayı geçmiyor.",
    images: [photo("ec27-zeynep")],
    created_at: daysAgo(6)
  },
  {
    id: "rev-ec-4",
    slug: "yesido-ec27",
    reviewer_name: "Serkan Balcı",
    rating: 4,
    comment: "Öğütücü kuru bakliyatta işe yaradı. Performans iyi, sesi var; mutfakta kapalı kapıyla idare ediyor.",
    created_at: daysAgo(2)
  },

  {
    id: "rev-cy-1",
    slug: "cy-818",
    reviewer_name: "Leyla Güneş",
    rating: 5,
    comment: "Akşam boyun ve omuza koyunca ısıtma devreye giriyor, parmak uçları gibi basıyor. Tasarımı tuhaf ama evde durması hoş. 20 dakika bana yetiyor.",
    images: [photo("cy818-leyla")],
    created_at: daysAgo(14)
  },
  {
    id: "rev-cy-2",
    slug: "cy-818",
    reviewer_name: "Tuna Varol",
    rating: 4,
    comment: "Şarjı birkaç güne yetiyor, seyahatte çantaya sığdı. Başlıklar yumuşak. Uzun kullanınca gövde biraz ısınıyor, kısa seanslarda sorun yok.",
    created_at: daysAgo(8)
  },
  {
    id: "rev-cy-3",
    slug: "cy-818",
    reviewer_name: "Melis Özkan",
    rating: 5,
    comment: "Isıtma kademesi abartısız, uzun oturunca omuzumu sıkmıyor. Ayak ışığı yanınca evde eğlenceli duruyor, asıl işi masaj.",
    images: [photo("cy818-melis")],
    created_at: daysAgo(3)
  }
];

const slugById: Record<string, string> = {
  "seed-wb65": "yesido-wb65",
  "seed-lkb39": "linkage-lkb-39",
  "seed-bls92": "blic-bls-92",
  "seed-bls96": "blic-bls-96",
  "seed-bls74": "blic-bls-74",
  "seed-ec27": "yesido-ec27",
  "seed-cy818": "cy-818",
  "20000000-0000-0000-0000-000000000001": "yesido-wb65",
  "20000000-0000-0000-0000-000000000002": "linkage-lkb-39",
  "20000000-0000-0000-0000-000000000003": "blic-bls-92",
  "20000000-0000-0000-0000-000000000004": "blic-bls-96",
  "20000000-0000-0000-0000-000000000005": "blic-bls-74",
  "20000000-0000-0000-0000-000000000006": "yesido-ec27",
  "20000000-0000-0000-0000-000000000007": "cy-818"
};

export function productSlugFor(productId: string, slug?: string) {
  return slug || slugById[productId] || productId;
}

export function reviewsForProduct(productId: string, slug?: string): ProductReview[] {
  const key = productSlugFor(productId, slug);
  return seed
    .filter((review) => review.slug === key)
    .map((review) => ({
      id: review.id,
      product_id: productId,
      reviewer_name: review.reviewer_name,
      rating: review.rating,
      comment: review.comment,
      images: review.images ?? [],
      approved: true,
      created_at: review.created_at
    }));
}

export function ratingForProduct(productId: string, slug?: string) {
  const list = reviewsForProduct(productId, slug);
  if (!list.length) return { average: 0, count: 0 };
  const total = list.reduce((sum, review) => sum + review.rating, 0);
  return { average: total / list.length, count: list.length };
}

export function attachRatings<T extends Product>(products: T[]) {
  return products.map((product) => {
    const rating = ratingForProduct(product.id, product.slug);
    return { ...product, rating_average: rating.average, review_count: rating.count };
  });
}

export const featuredStoreReviews = [
  { ...seed[0], productName: "YESIDO WB65", productSlug: "yesido-wb65" },
  { ...seed[8], productName: "BLIC BLS-92", productSlug: "blic-bls-92" },
  { ...seed[17], productName: "YESIDO EC27", productSlug: "yesido-ec27" }
];
