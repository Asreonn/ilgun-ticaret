import type { Product, ProductReview } from "../types";

type SeedReview = Omit<ProductReview, "product_id" | "approved"> & { slug: string };

const daysAgo = (days: number) => {
  const date = new Date("2026-08-21T12:00:00+03:00");
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const seed: SeedReview[] = [
  { id: "rev-wb65-1", slug: "yesido-wb65", reviewer_name: "Elif Kaya", rating: 5, comment: "Parmak izi kilidi gerçekten işe yarıyor, laptop bölmesi de tam oturuyor. Günlük işe gidişte yanımda.", created_at: daysAgo(18) },
  { id: "rev-wb65-2", slug: "yesido-wb65", reviewer_name: "Mert Yılmaz", rating: 5, comment: "Kumaşı kaliteli, iç düzeni çok iyi. USB çıkışı telefonu şarj ederken pratik oluyor.", created_at: daysAgo(14) },
  { id: "rev-wb65-3", slug: "yesido-wb65", reviewer_name: "Selin Arslan", rating: 4, comment: "Biraz ağır ama sırt kısmı rahat. Bölmeler laptop ve şarj aletleri için yeterli.", created_at: daysAgo(11) },
  { id: "rev-wb65-4", slug: "yesido-wb65", reviewer_name: "Burak Tekin", rating: 5, comment: "Parmak iziyle açılması çok hızlı. Seyahatte değerli eşyalarımı daha rahat taşıyorum.", created_at: daysAgo(7) },
  { id: "rev-wb65-5", slug: "yesido-wb65", reviewer_name: "Deniz Şahin", rating: 4, comment: "Su sıçramasına karşı kumaşı güven veriyor. Fiyatına göre işimi gördü.", created_at: daysAgo(3) },

  { id: "rev-lkb-1", slug: "linkage-lkb-39", reviewer_name: "Ahmet Demir", rating: 5, comment: "Boyun askısı spor yaparken hiç düşmüyor, sesi net ve bağlantısı sağlam.", created_at: daysAgo(16) },
  { id: "rev-lkb-2", slug: "linkage-lkb-39", reviewer_name: "Ceren Bilgin", rating: 4, comment: "Bluetooth 5.4 çabuk bağlanıyor. USB-C şarj da günlük kullanım için yeterli.", created_at: daysAgo(9) },
  { id: "rev-lkb-3", slug: "linkage-lkb-39", reviewer_name: "Yusuf Kaplan", rating: 5, comment: "Hafıza kartıyla da çalışması işime yaradı. Kontrol tuşları net ve kolay.", created_at: daysAgo(4) },

  { id: "rev-92-1", slug: "blic-bls-92", reviewer_name: "Gizem Nur", rating: 5, comment: "Masamda duruyor, sesi küçük gövdesine göre gayet doyurucu. Kulbu da pratik.", created_at: daysAgo(15) },
  { id: "rev-92-2", slug: "blic-bls-92", reviewer_name: "Emre Polat", rating: 4, comment: "Bluetooth çabuk bağlanıyor. USB ve TF kart seçenekleri ofiste işimi gördü.", created_at: daysAgo(10) },
  { id: "rev-92-3", slug: "blic-bls-92", reviewer_name: "Aylin Rüzgar", rating: 4, comment: "Tasarımı şık, titreşimi az. Masaüstü kullanım için tam istediğim boyutta.", created_at: daysAgo(6) },
  { id: "rev-92-4", slug: "blic-bls-92", reviewer_name: "Hakan Levent", rating: 5, comment: "Ses net, taşıması kolay. Arkadaşlarım da beğendi, ikinciyi düşünüyorum.", created_at: daysAgo(2) },

  { id: "rev-96-1", slug: "blic-bls-96", reviewer_name: "Nazlı Can", rating: 5, comment: "Telefon standı sayesinde hem müzik dinleyip hem video izliyorum. Çok pratik.", created_at: daysAgo(12) },
  { id: "rev-96-2", slug: "blic-bls-96", reviewer_name: "Okan Mutlu", rating: 4, comment: "Askısıyla taşıması kolay, sesi dengeli. Küçük ev ve masa kullanımı için uygun.", created_at: daysAgo(5) },

  { id: "rev-74-1", slug: "blic-bls-74", reviewer_name: "İrem Filiz", rating: 5, comment: "Retro görünümü çok hoş, RGB ışıklar da eğlenceli. Sesi küçük gövdesine göre güçlü.", created_at: daysAgo(13) },
  { id: "rev-74-2", slug: "blic-bls-74", reviewer_name: "Caner Han", rating: 4, comment: "TWS ile iki hoparlörü eşleştirdik, stereo fark edilir oldu. Bağlantısı stabil.", created_at: daysAgo(8) },
  { id: "rev-74-3", slug: "blic-bls-74", reviewer_name: "Pınar Erdem", rating: 5, comment: "Hediye olarak aldım, çok beğenildi. Hem tasarımı hem sesi yerinde.", created_at: daysAgo(1) },

  { id: "rev-ec-1", slug: "yesido-ec27", reviewer_name: "Fatma Sönmez", rating: 5, comment: "Smoothie ve kahve çekirdeği için ayrı kaplar harika. Temizliği de kolay.", created_at: daysAgo(17) },
  { id: "rev-ec-2", slug: "yesido-ec27", reviewer_name: "Mehmet Aksoy", rating: 4, comment: "800W motor buzu da rahat kırıyor. Kaymaz tabanı sağlam duruyor.", created_at: daysAgo(11) },
  { id: "rev-ec-3", slug: "yesido-ec27", reviewer_name: "Zeynep Uçar", rating: 5, comment: "İki kap sayesinde kahvaltıda vakit kazanıyorum. Öğütücü kısmı da yeterli.", created_at: daysAgo(6) },
  { id: "rev-ec-4", slug: "yesido-ec27", reviewer_name: "Serkan Balcı", rating: 4, comment: "Performansı iyi, sesi biraz yüksek ama sonuç net. Mutfakta yerini aldı.", created_at: daysAgo(2) },

  { id: "rev-cy-1", slug: "cy-818", reviewer_name: "Leyla Güneş", rating: 5, comment: "Boyun ve omuz için ısıtmalı masaj gerçekten rahatlatıyor. Akşamları vazgeçilmez oldu.", created_at: daysAgo(14) },
  { id: "rev-cy-2", slug: "cy-818", reviewer_name: "Tuna Varol", rating: 4, comment: "Şarjı uzun gidiyor, seyahatte de kullanıyorum. Başlıkları yumuşak.", created_at: daysAgo(8) },
  { id: "rev-cy-3", slug: "cy-818", reviewer_name: "Melis Özkan", rating: 5, comment: "Uzun süre kullanınca bile rahatsız etmiyor. Isıtma kademesi tam kararında.", created_at: daysAgo(3) }
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
  { ...seed[18], productName: "YESIDO EC27", productSlug: "yesido-ec27" }
];
