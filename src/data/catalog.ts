import type { Category, Product } from "../types";
import { attachRatings } from "./reviews";
import { importedCategories, importedProducts } from "./importedProducts";

export const categories: Category[] = [
  { id: "audio", slug: "ses-kulaklik", name: "Ses & Kulaklık", description: "Kulaklıklar ve taşınabilir ses ürünleri", sort_order: 1, active: true },
  { id: "electronics", slug: "elektronik-aksesuar", name: "Elektronik Aksesuar", description: "Günlük kullanım için pratik elektronik aksesuarlar", sort_order: 2, active: true },
  { id: "home", slug: "kucuk-ev-aletleri", name: "Küçük Ev Aletleri", description: "Mutfak ve ev yaşamını kolaylaştıran ürünler", sort_order: 3, active: true },
  { id: "care", slug: "kisisel-bakim", name: "Kişisel Bakım", description: "Günlük bakım ve rahatlama ürünleri", sort_order: 4, active: true },
  { id: "bags", slug: "canta-aksesuar", name: "Çanta & Aksesuar", description: "Teknolojiyle uyumlu çanta ve aksesuarlar", sort_order: 5, active: true },
  ...importedCategories
];

const category = (id: string) => categories.find((item) => item.id === id)!;
const image = (slug: string, name: string) => `images/products/${slug}/${name}.webp`;
const feature = (label: string, value = "Var", sort_order = 0) => ({ label, value, sort_order });

const catalogProducts: Product[] = [
  {
    id: "seed-wb65", slug: "yesido-wb65", name: "YESIDO WB65 Parmak İzi Kilitli Akıllı Sırt Çantası", brand: "YESIDO", model: "WB65", category_id: "bags",
    short_description: "Parmak izi kilidi, düzenli cihaz bölmeleri ve dayanıklı dış yüzeyi bir araya getiren akıllı sırt çantası.",
    description: "YESIDO WB65, işe gidiş, günlük kullanım ve kısa seyahatlerde laptop, tablet ve küçük elektronikleri düzenli taşımak için tasarlanmış bir sırt çantasıdır. Parmak iziyle açılan kilidi çantaya hızlı erişim sağlar; USB bağlantısı ise cihazları çanta üzerinde şarj etmeyi kolaylaştırır.\n\nDış yüzey Oxford kumaş ve PU kaplama kombinasyonudur. Bu yapı su sıçramalarına karşı ek koruma sunar. İçeride laptop ve tablet bölmeleri ile yumuşak astar bulunur. Yaklaşık ölçü 300 × 430 × 140 mm'dir.",
    price: 6899, old_price: 9000, currency: "TRY", stock_quantity: 4, stock_status: "in_stock", featured: true, active: true, sort_order: 1,
    main_image: image("yesido-wb65", "main"), source_url: "https://miot-store.com/products/yesido-wb65-fingerprint-lock-smart-backpackblack", category: category("bags"),
    product_images: ["main", "01", "02"].map((name, i) => ({ image_path: image("yesido-wb65", name), alt_text: `YESIDO WB65 akıllı sırt çantası ${i + 1}`, sort_order: i })),
    product_features: ["Parmak izi güvenlik kilidi", "Laptop ve tablet bölmeleri", "Oxford kumaş + PU", "Su sıçramalarına dayanıklı yapı", "Yumuşak iç astar", "USB bağlantısı", "Günlük kullanım ve seyahate uygun"].map((x, i) => feature(x, "", i))
  },
  {
    id: "seed-lkb39", slug: "linkage-lkb-39", name: "Linkage LKB-39 Boyun Askılı Bluetooth Kulaklık", brand: "Linkage", model: "LKB-39", category_id: "audio",
    short_description: "Bluetooth 5.4, USB-C şarj ve hafıza kartı desteğine sahip boyun askılı kablosuz kulaklık.",
    description: "Linkage LKB-39, boyun askılı gövdesi ve fiziksel kontrol bölümüyle yürüyüş, spor ve günlük kullanım için tasarlanmıştır. Bluetooth 5.4 bağlantısı, USB-C şarj ve stereo ses temel kullanım senaryolarını karşılar. Kulaklıkta güç göstergesi bulunur; böylece şarj durumunu kontrol etmek kolaylaşır.\n\nHafıza kartı yuvası, telefonsuz dinleme seçeneği sunar. Ambalajdaki 2800 mAh ve 600 saat ifadeleri üretici bilgisine aittir; gerçek kullanım süresi ses seviyesi ve bağlantı koşullarına göre değişebilir.",
    price: 669, old_price: null, currency: "TRY", stock_quantity: 3, stock_status: "in_stock", featured: true, active: true, sort_order: 2,
    main_image: image("linkage-lkb-39", "main"), source_url: "https://enshall.com.tr/linkage-lkb-39-bluetooth-kulaklik", category: category("audio"),
    product_images: ["main", "01"].map((name, i) => ({ image_path: image("linkage-lkb-39", name), alt_text: `Linkage LKB-39 boyun askılı kulaklık ${i + 1}`, sort_order: i })),
    product_features: ["Boyun askılı tasarım", "Bluetooth 5.4", "USB-C şarj", "Dahili güç göstergesi", "Hafıza kartı desteği", "Stereo ses", "Spor kullanımına uygun"].map((x, i) => feature(x, "", i))
  },
  {
    id: "seed-bls92", slug: "blic-bls-92", name: "BLIC BLS-92 Desk Sound Kablosuz Hoparlör", brand: "BLIC", model: "BLS-92", category_id: "audio",
    short_description: "6W RMS çıkış, Bluetooth 5.4 ve entegre taşıma kulbuyla kompakt masaüstü hoparlör.",
    description: "BLIC BLS-92, masaüstü ve küçük odalar için kompakt bir kablosuz hoparlördür. 6W RMS çıkış ve Bluetooth 5.4 bağlantısı temel dinleme ihtiyacını karşılar. Siyah gövde üzerindeki turuncu detaylar ve entegre kulp, ürünü hem görünür hem taşınabilir kılar.\n\nUSB ve TF kart girişleri sayesinde telefon dışında da kaynak bağlanabilir. 1200 mAh batarya kablosuz kullanım sunar; güncel süre kullanım koşullarına göre değişir.",
    price: 499, old_price: null, currency: "TRY", stock_quantity: 6, stock_status: "in_stock", featured: true, active: true, sort_order: 3,
    price_source_url: "https://bulbultoptan.com/index.php?route=tool%2Fprice_list", price_checked_at: "2026-08-21T00:00:00+03:00", price_note: "Piyasa emsali satış fiyatı",
    main_image: image("blic-bls-92", "main"), source_url: "https://www.hafizakartci.com/toptan-blic-bls-92-askili-6w-mini-bluetooth-speaker.html", category: category("audio"),
    product_images: ["main", "01", "02"].map((name, i) => ({ image_path: image("blic-bls-92", name), alt_text: `BLIC BLS-92 hoparlör ${i + 1}`, sort_order: i })),
    product_features: [feature("Bluetooth", "5.4", 0), feature("Bağlantılar", "USB, TF kart", 1), feature("Batarya", "1200 mAh", 2), feature("Ses çıkışı", "6W RMS", 3), feature("Entegre taşıma kulbu", "Var", 4)]
  },
  {
    id: "seed-bls96", slug: "blic-bls-96", name: "BLIC BLS-96 Smooth Sound Kablosuz Hoparlör", brand: "BLIC", model: "BLS-96", category_id: "audio",
    short_description: "Telefon standı, taşıma askısı ve çoklu bağlantı seçenekleri sunan kompakt kablosuz hoparlör.",
    description: "BLIC BLS-96, hoparlörü telefon standı ve taşıma askısıyla birleştiren pratik bir ses ürünüdür. Video izlerken telefonu gövdeye yaslamak veya askıyla taşımak günlük kullanımı kolaylaştırır. Bluetooth 5.4 bağlantısının yanında 6W RMS çıkış bulunur.\n\nUSB ve TF kart girişleri kablosuz bağlantı olmadan da dinleme imkânı verir. 1200 mAh batarya taşınabilir kullanıma uygundur.",
    price: 549, old_price: null, currency: "TRY", stock_quantity: 2, stock_status: "low_stock", featured: true, active: true, sort_order: 4,
    price_source_url: "https://www.akakce.com/bluetooth-hoparlor/en-ucuz-blic-tasinabilir-ses-bombasi-bls-06-fiyati%2C395054240.html", price_checked_at: "2026-08-21T00:00:00+03:00", price_note: "Piyasa emsali satış fiyatı",
    main_image: image("blic-bls-96", "main"), source_url: "https://www.hafizakartci.com/toptan-blic-bls-96-askili-6w-mini-bluetooth-speaker-telefon-tutuculu.html", category: category("audio"),
    product_images: ["main", "01", "02"].map((name, i) => ({ image_path: image("blic-bls-96", name), alt_text: `BLIC BLS-96 hoparlör ${i + 1}`, sort_order: i })),
    product_features: [feature("Bluetooth", "5.4", 0), feature("Bağlantılar", "USB, TF kart", 1), feature("Batarya", "1200 mAh", 2), feature("Ses çıkışı", "6W RMS", 3), feature("Dahili telefon standı", "Var", 4), feature("Taşıma askısı", "Var", 5)]
  },
  {
    id: "seed-bls74", slug: "blic-bls-74", name: "BLIC BLS-74 Retro RGB TWS Bluetooth Hoparlör", brand: "BLIC", model: "BLS-74", category_id: "audio",
    short_description: "Retro gövdeyi TWS stereo eşleştirme ve RGB aydınlatmayla birleştiren 7W hoparlör.",
    description: "BLIC BLS-74, retro görünümü Bluetooth bağlantısı, RGB aydınlatma ve TWS stereo eşleştirme ile bir araya getirir. İki uyumlu hoparlör eşleştirildiğinde daha geniş bir dinleme alanı kurulabilir. 7W RMS çıkış, masaüstü ve küçük mekân kullanımı için yeterlidir.\n\nTF kart ve USB girişleri kablosuz bağlantıya alternatif sunar. 1200 mAh batarya ürünü prizden bağımsız kullanmayı mümkün kılar.",
    price: 428, old_price: 665, currency: "TRY", stock_quantity: 5, stock_status: "in_stock", featured: true, active: true, sort_order: 5,
    main_image: image("blic-bls-74", "main"), source_url: "https://www.hafizakartci.com/toptan-blic-bls-74-rgb-tws-7w-rms-bluetooth-speaker-coklu-cihaz-uyumu.html", category: category("audio"),
    product_images: ["main", "01"].map((name, i) => ({ image_path: image("blic-bls-74", name), alt_text: `BLIC BLS-74 retro hoparlör ${i + 1}`, sort_order: i })),
    product_features: [feature("Tasarım", "Retro", 0), feature("Kablosuz bağlantı", "Bluetooth", 1), feature("TWS stereo", "Var", 2), feature("Bağlantılar", "TF, USB", 3), feature("RGB aydınlatma", "Var", 4), feature("Batarya", "1200 mAh", 5), feature("Ses çıkışı", "7W RMS", 6)]
  },
  {
    id: "seed-ec27", slug: "yesido-ec27", name: "YESIDO EC27 2'si 1 Arada 800W Blender", brand: "YESIDO", model: "EC27", category_id: "home",
    short_description: "Blender ve öğütücü işlevlerini 800W motor, iki kap ve çıkarılabilir bıçak sistemiyle sunar.",
    description: "YESIDO EC27, smoothie, içecek ve öğütme işlerini tek gövdede toplayan 800W'lık bir mutfak ürünüdür. Blender ve öğütücü işlevleri ayrı kaplarla kullanılır; buz kırma desteği soğuk içecek hazırlığını kolaylaştırır. Paslanmaz çelik bıçak sökülerek temizlenebilir.\n\nİki karıştırma kabı farklı porsiyonlara uyum sağlar. Kaymaz taban, çalışma sırasında gövdenin dengede kalmasına yardımcı olur. Günlük mutfak kullanımı için kompakt bir çözümdür.",
    price: 3699, old_price: null, currency: "TRY", stock_quantity: 3, stock_status: "in_stock", featured: true, active: true, sort_order: 6,
    main_image: image("yesido-ec27", "main"), source_url: "https://yesido.com.tr/en/products/yesido-ec27-2in1-buz-kirma-ozellikli-meyve-sikacagi-gri", category: category("home"),
    product_images: ["main", "01", "02"].map((name, i) => ({ image_path: image("yesido-ec27", name), alt_text: `YESIDO EC27 blender ${i + 1}`, sort_order: i })),
    product_features: [feature("Motor gücü", "800W", 0), feature("Kullanım", "Blender + öğütücü", 1), feature("Buz kırma", "Var", 2), feature("Bıçak", "Paslanmaz çelik, çıkarılabilir", 3), feature("Karıştırma kabı", "2 adet", 4), feature("Kaymaz taban", "Var", 5)]
  },
  {
    id: "seed-cy818", slug: "cy-818", name: "CY-818 Isıtmalı Derin Doku Boyun ve Omuz Masaj Aleti", brand: null, model: "CY-818", category_id: "care",
    short_description: "Isıtma işlevi ve el biçimli başlıklarıyla rahatlatıcı masaj deneyimi için tasarlanmış taşınabilir cihaz.",
    description: "CY-818, boyun, omuz, sırt ve bel çevresinde rahatlatıcı masaj için tasarlanmış taşınabilir bir bakım aletidir. Isıtmalı kullanım ve derin doku başlıkları kas gerginliğini azaltmaya yardımcı olacak şekilde kurgulanmıştır. Ergonomik formu omuzlara oturtmayı kolaylaştırır.\n\nUSB ile şarj edilir; evde veya seyahatte kablosuz kullanılabilir. Bu ürün tıbbi teşhis veya tedavi amacı taşımaz. Rahatlama ve günlük bakım içindir.",
    price: 1233, old_price: 2592, currency: "TRY", stock_quantity: 4, stock_status: "in_stock", featured: true, active: true, sort_order: 7,
    main_image: image("cy-818", "main"), source_url: "https://www.victoriastore.com.py/item/massageador-cervical-shoulder-neck-cy-818-10w-verd766311", category: category("care"),
    product_images: ["main", "01"].map((name, i) => ({ image_path: image("cy-818", name), alt_text: `CY-818 yeşil masaj aleti ${i + 1}`, sort_order: i })),
    product_features: ["Isıtmalı kullanım", "Derin doku masajı", "Ergonomik tasarım", "USB ile şarj", "Taşınabilir yapı", "Boyun, omuz, sırt ve bel kullanımına uygun"].map((x, i) => feature(x, "", i))
  },
  ...importedProducts.map((product) => ({ ...product, category: category(product.category_id) }))
];

export const initialProducts = attachRatings(catalogProducts);
