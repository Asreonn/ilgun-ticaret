import type { Category, Product } from "../types";

export const importedCategories: Category[] = [
  {
    "id": "coffee",
    "slug": "kahve-mutfak",
    "name": "Kahve & Mutfak",
    "description": "Taşınabilir kettle, espresso ve mutfak ürünleri",
    "sort_order": 6,
    "active": true
  },
  {
    "id": "living",
    "slug": "ev-yasam",
    "name": "Ev & Yaşam",
    "description": "Ütü, temizlik ve günlük yaşam ürünleri",
    "sort_order": 7,
    "active": true
  },
  {
    "id": "auto",
    "slug": "oto-aksesuar",
    "name": "Oto Aksesuar",
    "description": "Araç içi temizlik ve lastik bakım ürünleri",
    "sort_order": 8,
    "active": true
  },
  {
    "id": "security",
    "slug": "guvenlik-seyahat",
    "name": "Güvenlik & Seyahat",
    "description": "Kilit ve seyahat güvenlik ürünleri",
    "sort_order": 9,
    "active": true
  },
  {
    "id": "wearable",
    "slug": "ai-giyilebilir-teknoloji",
    "name": "AI & Giyilebilir Teknoloji",
    "description": "Akıllı gözlük ve giyilebilir cihazlar",
    "sort_order": 10,
    "active": true
  },
  {
    "id": "display",
    "slug": "goruntu-eglence",
    "name": "Görüntü & Eğlence",
    "description": "Projektör ve görüntü ürünleri",
    "sort_order": 11,
    "active": true
  }
];

const categoryByName: Record<string, string> = {
  "Ses & Kulaklık": "audio",
  "Elektronik Aksesuar": "electronics",
  "Küçük Ev Aletleri": "home",
  "Kişisel Bakım": "care",
  "Çanta & Aksesuar": "bags",
  "Kahve & Mutfak": "coffee",
  "Ev & Yaşam": "living",
  "Oto Aksesuar": "auto",
  "Güvenlik & Seyahat": "security",
  "AI & Giyilebilir Teknoloji": "wearable",
  "Görüntü & Eğlence": "display"
};

export const importedProducts: Product[] = [
  {
    "id": "seed-by-k36b",
    "slug": "by-k36b-sarjli-akilli-seyahat-kettle",
    "name": "BY-K36B Şarjlı Akıllı Seyahat Kettle",
    "brand": "OEM",
    "model": "BY-K36B",
    "category_id": "coffee",
    "short_description": "500 ml kapasiteli, Type-C şarjlı ve dijital sıcaklık göstergeli taşınabilir seyahat kettle.",
    "description": "BY-K36B, priz bağlantısı olmadan su ısıtmayı amaçlayan şarjlı bir seyahat kettle'ıdır. 500 ml iç haznesi kahve, çay ve sıcak içecek hazırlığı için yeterlidir. 2600mAh × 4 batarya paketi ve Type-C şarj, ev, ofis ve outdoor kullanımına yöneliktir.\n\nDijital sıcaklık göstergesi ve 7 sıcaklık kademesi, suyu farklı içecekler için ayarlamayı kolaylaştırır. Paslanmaz çelik iç hazne günlük kullanıma uygundur. Gerçek ısıtma süresi ve batarya ömrü ortam sıcaklığına göre değişebilir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "featured": true,
    "active": true,
    "sort_order": 8,
    "main_image": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/main.webp",
    "source_url": "https://boyaelectrics.en.made-in-china.com/product/tPzpcZxWvmVD/China-Portable-Boil-Water-Cup-Portable-Kettle-Digital-Water-Heating-Cup-with-Battery.html",
    "product_images": [
      {
        "image_path": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/main.webp",
        "alt_text": "BY-K36B şarjlı akıllı seyahat kettle ön görünüm",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00wGcsNjgKyEqS/product.webp"
      },
      {
        "image_path": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/01.webp",
        "alt_text": "BY-K36B by-k36b şarjlı akıllı seyahat görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00dUbKyRuzZtcS/product.webp"
      },
      {
        "image_path": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/02.webp",
        "alt_text": "BY-K36B by-k36b şarjlı akıllı seyahat görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00JUbZNHrqrEcK/product.webp"
      },
      {
        "image_path": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/03.webp",
        "alt_text": "BY-K36B by-k36b şarjlı akıllı seyahat görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00JGoKFqrhLtbZ/product.webp"
      },
      {
        "image_path": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/04.webp",
        "alt_text": "BY-K36B by-k36b görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00NGcSyApdGTbZ/product.webp"
      },
      {
        "image_path": "images/products/by-k36b-sarjli-akilli-seyahat-kettle/05.webp",
        "alt_text": "BY-K36B by-k36b şarjlı akıllı seyahat görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00wYbSOJptLQqj/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Kapasite",
        "value": "500 ml",
        "sort_order": 0
      },
      {
        "label": "Batarya",
        "value": "2600mAh × 4",
        "sort_order": 1
      },
      {
        "label": "Şarj",
        "value": "Type-C",
        "sort_order": 2
      },
      {
        "label": "Güç",
        "value": "100W",
        "sort_order": 3
      },
      {
        "label": "Gösterge",
        "value": "Dijital sıcaklık göstergesi",
        "sort_order": 4
      },
      {
        "label": "Sıcaklık kademesi",
        "value": "7 seviye",
        "sort_order": 5
      },
      {
        "label": "İç hazne",
        "value": "Paslanmaz çelik",
        "sort_order": 6
      }
    ]
  },
  {
    "id": "seed-mdl-16",
    "slug": "mdl-16-sarjli-tasinabilir-blender",
    "name": "MDL-16 Şarjlı Taşınabilir Blender",
    "brand": "OEM",
    "model": "MDL-16",
    "category_id": "home",
    "short_description": "Altı paslanmaz çelik bıçaklı, USB ile şarj edilen taşınabilir smoothie blender.",
    "description": "MDL-16, smoothie ve shake hazırlığı için tasarlanmış şarjlı bir taşınabilir blenderdır. Altı paslanmaz çelik bıçak, meyve ve benzeri yumuşak malzemeleri karıştırmaya yöneliktir. Yaklaşık 500 ml kapasite tek kişilik porsiyonlar için uygundur.\n\nUSB şarj ve kompakt gövde, mutfak dışında da kullanımı kolaylaştırır. Batarya süresi karıştırılan malzeme ve kullanım sıklığına göre değişir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 5,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 9,
    "main_image": "images/products/mdl-16-sarjli-tasinabilir-blender/main.webp",
    "source_url": "https://mdjuicer.en.made-in-china.com/product/VMWJklQdhRDh/China-Electric-Kitchen-Appliance-Mini-Portable-and-Rechargeable-Battery-Juicer-Blender.html",
    "product_images": [
      {
        "image_path": "images/products/mdl-16-sarjli-tasinabilir-blender/main.webp",
        "alt_text": "MDL-16 şarjlı taşınabilir blender ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00SZVEIynGZalc/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Kullanım",
        "value": "Şarjlı",
        "sort_order": 0
      },
      {
        "label": "Bıçak",
        "value": "6 paslanmaz çelik bıçak",
        "sort_order": 1
      },
      {
        "label": "Kullanım amacı",
        "value": "Smoothie ve shake",
        "sort_order": 2
      },
      {
        "label": "Kapasite",
        "value": "Yaklaşık 500 ml",
        "sort_order": 3
      },
      {
        "label": "Tasarım",
        "value": "Taşınabilir",
        "sort_order": 4
      },
      {
        "label": "Şarj",
        "value": "USB",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-fs-yd03",
    "slug": "fs-yd03-katlanabilir-seyahat-buharli-utu",
    "name": "FS-YD03 Katlanabilir Seyahat Buharlı Ütü",
    "brand": "OEM",
    "model": "FS-YD03",
    "category_id": "living",
    "short_description": "1200W gücünde, 140 ml su tanklı katlanabilir seyahat buharlı ütü.",
    "description": "FS-YD03, seyahat ve günlük kullanım için tasarlanmış katlanabilir bir buharlı ütüdür. 1200W ısıtma gücü ve 20-25 saniyelik ısınma süresi, kısa sürede kullanıma geçmeyi amaçlar. Kuru ve buharlı çalışma seçenekleri kumaş türüne göre ayarlanabilir.\n\n140 ml su tankı taşınabilir kullanım için yeterlidir. Kaynak sayfasında 110V / 220-240V desteği belirtilmiştir; fiş tipi ve yerel priz uyumu sipariş öncesinde teyit edilmelidir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 3,
    "stock_status": "in_stock",
    "featured": false,
    "active": true,
    "sort_order": 10,
    "main_image": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/main.webp",
    "source_url": "https://fusheng-electronic.en.made-in-china.com/product/OJPrEyRURfhQ/China-2026-New-Style-Portable-1200W-Handheld-Garment-Steamer-and-Iron-Instant-Heating-Foldable-Travel-Iron-Machine-for-Clothes.html",
    "product_images": [
      {
        "image_path": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/main.webp",
        "alt_text": "FS-YD03 katlanabilir seyahat buharlı ütü ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00qdhbukojQApS/product.webp"
      },
      {
        "image_path": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/01.webp",
        "alt_text": "FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00qAVcgjoEkmzZ/product.webp"
      },
      {
        "image_path": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/02.webp",
        "alt_text": "FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00bdhcrmoIQJgj/product.webp"
      },
      {
        "image_path": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/03.webp",
        "alt_text": "FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00BmWkzfcCMJuj/product.webp"
      },
      {
        "image_path": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/04.webp",
        "alt_text": "FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00vdikzLcMympZ/product.webp"
      },
      {
        "image_path": "images/products/fs-yd03-katlanabilir-seyahat-buharli-utu/05.webp",
        "alt_text": "FS-YD03 fs-yd03 katlanabilir seyahat buharlı görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00MAiozcqFpwus/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Güç",
        "value": "1200W",
        "sort_order": 0
      },
      {
        "label": "Isınma",
        "value": "20-25 saniye",
        "sort_order": 1
      },
      {
        "label": "Kullanım",
        "value": "Kuru ve buharlı",
        "sort_order": 2
      },
      {
        "label": "Yapı",
        "value": "Katlanabilir",
        "sort_order": 3
      },
      {
        "label": "Su tankı",
        "value": "140 ml",
        "sort_order": 4
      },
      {
        "label": "Voltaj",
        "value": "110V / 220-240V",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-aby-318a",
    "slug": "aby-318a-isitmali-yemek-kutusu",
    "name": "ABY-318A 1.5L Elektrikli Isıtmalı Yemek Kutusu",
    "brand": "OEM",
    "model": "ABY-318A",
    "category_id": "home",
    "short_description": "1.5 litre 304 çelik hazneli, ev, ofis ve araç kullanımına yönelik ısıtmalı yemek kutusu.",
    "description": "ABY-318A, hazır yemeği sıcak tutmak veya ısıtmak için tasarlanmış 1.5 litrelik elektrikli bir yemek kutusudur. 304 paslanmaz çelik hazne ve 80W ısıtma gücü ofis, ev ve yolculuk kullanımına yöneliktir.\n\nKaynak sayfasında 12V / 24V araç ile 110V / 220V ev-ofis desteği belirtilmiştir. Fiş tipi, kablo seti ve yerel priz uyumu sipariş öncesinde teyit edilmelidir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 4,
    "stock_status": "in_stock",
    "featured": false,
    "active": true,
    "sort_order": 11,
    "main_image": "images/products/aby-318a-isitmali-yemek-kutusu/main.webp",
    "source_url": "https://fineaquarium.en.made-in-china.com/product/VaBRJXQxOwcg/China-1-5L-CE-ETL-Approved-Portable-Electric-Heated-Lunch-Box-Food-Heater.html",
    "product_images": [
      {
        "image_path": "images/products/aby-318a-isitmali-yemek-kutusu/main.webp",
        "alt_text": "ABY-318A elektrikli ısıtmalı yemek kutusu ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00mDlvCBsJUykO/product.webp"
      },
      {
        "image_path": "images/products/aby-318a-isitmali-yemek-kutusu/01.webp",
        "alt_text": "ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00mLiCeySHKnkO/product.webp"
      },
      {
        "image_path": "images/products/aby-318a-isitmali-yemek-kutusu/02.webp",
        "alt_text": "ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00tLWCvTjcLOqA/product.webp"
      },
      {
        "image_path": "images/products/aby-318a-isitmali-yemek-kutusu/03.webp",
        "alt_text": "ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00QLlMCpsBMObJ/product.webp"
      },
      {
        "image_path": "images/products/aby-318a-isitmali-yemek-kutusu/04.webp",
        "alt_text": "ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00tDWvMVSPknbw/product.webp"
      },
      {
        "image_path": "images/products/aby-318a-isitmali-yemek-kutusu/05.webp",
        "alt_text": "ABY-318A aby-318a 1.5l elektrikli ısıtmalı görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00tPVvCMjalNkw/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Kapasite",
        "value": "1.5 litre",
        "sort_order": 0
      },
      {
        "label": "Hazne",
        "value": "304 paslanmaz çelik",
        "sort_order": 1
      },
      {
        "label": "Güç",
        "value": "80W",
        "sort_order": 2
      },
      {
        "label": "Araç kullanımı",
        "value": "12V / 24V",
        "sort_order": 3
      },
      {
        "label": "Ev ve ofis",
        "value": "110V / 220V",
        "sort_order": 4
      },
      {
        "label": "Yapı",
        "value": "Taşınabilir",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-im005",
    "slug": "euhomy-im005-buz-makinesi",
    "name": "EUHOMY IM005 Akıllı Tezgah Üstü Buz Makinesi",
    "brand": "EUHOMY",
    "model": "IM005",
    "category_id": "home",
    "short_description": "2L su tanklı, dokunmatik kontrollü tezgah üstü buz makinesi.",
    "description": "EUHOMY IM005, ev ve küçük ofis kullanımı için tasarlanmış tezgah üstü bir buz makinesidir. Üretici verisine göre yaklaşık 13 dakikada 16 küp buz üretir; günlük kapasite ifadesi yaklaşık 34 lb'dir. 2L dahili su tankı harici su hattı olmadan çalışmayı amaçlar.\n\nDokunmatik kontrol, buz kalınlığı ayarı, zamanlayıcı ve otomatik temizleme günlük kullanımı kolaylaştırır. Gerçek üretim miktarı oda sıcaklığı ve su sıcaklığına göre değişebilir. Fiş tipi sipariş öncesinde teyit edilmelidir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "featured": true,
    "active": true,
    "sort_order": 12,
    "main_image": "images/products/euhomy-im005-buz-makinesi/main.webp",
    "source_url": "https://hommio.en.made-in-china.com/product/cAgpTUBjaRrC/China-Versatile-Mini-Ice-Maker-for-Convenient-Ice-Making-Experience.html",
    "product_images": [
      {
        "image_path": "images/products/euhomy-im005-buz-makinesi/main.webp",
        "alt_text": "EUHOMY IM005 tezgah üstü buz makinesi ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00GOroefNnrmzu/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Üretim",
        "value": "13 dakikada 16 küp",
        "sort_order": 0
      },
      {
        "label": "Günlük kapasite",
        "value": "Yaklaşık 34 lb",
        "sort_order": 1
      },
      {
        "label": "Su tankı",
        "value": "2L",
        "sort_order": 2
      },
      {
        "label": "Temizlik",
        "value": "Otomatik temizleme",
        "sort_order": 3
      },
      {
        "label": "Ayar",
        "value": "Buz kalınlığı ayarı",
        "sort_order": 4
      },
      {
        "label": "Kontrol",
        "value": "Dokunmatik",
        "sort_order": 5
      },
      {
        "label": "Zamanlayıcı",
        "value": "Var",
        "sort_order": 6
      }
    ]
  },
  {
    "id": "seed-me2409",
    "slug": "me2409-tasinabilir-espresso-makinesi",
    "name": "ME2409 19 Bar Şarjlı Taşınabilir Espresso Makinesi",
    "brand": "Capadeli",
    "model": "ME2409",
    "category_id": "coffee",
    "short_description": "19 bar pompalı, 7800mAh bataryalı şarjlı taşınabilir espresso makinesi.",
    "description": "ME2409, priz bağlantısına ihtiyaç duymadan espresso hazırlamayı amaçlayan 7800mAh bataryalı taşınabilir bir kahve makinesidir. 19 bar pompa sistemi ve farklı kahve adaptörleri sayesinde seyahat, ofis ve outdoor kullanımına yöneliktir.\n\n80 ml su tankı ve 250 ml bardak tek fincan hazırlığı için tasarlanmıştır. Type-C şarj ve 100W güç tüketimi kablosuz kullanımı destekler. Kapsül ve öğütülmüş kahve adaptörleri kaynak sayfasında belirtilmiştir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 6,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 13,
    "main_image": "images/products/me2409-tasinabilir-espresso-makinesi/main.webp",
    "source_url": "https://seamaxtech.en.made-in-china.com/product/ftJrTNBgRlpP/China-Compact-Portable-Coffeemaker-for-Outdoor-and-Travel-Use.html",
    "product_images": [
      {
        "image_path": "images/products/me2409-tasinabilir-espresso-makinesi/main.webp",
        "alt_text": "ME2409 taşınabilir espresso makinesi ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/203f0j00LQnezYbPREuf/product.webp"
      },
      {
        "image_path": "images/products/me2409-tasinabilir-espresso-makinesi/01.webp",
        "alt_text": "ME2409 me2409 19 bar şarjlı görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00gENerIoJOtpG/product.webp"
      },
      {
        "image_path": "images/products/me2409-tasinabilir-espresso-makinesi/02.webp",
        "alt_text": "ME2409 me2409 19 bar şarjlı görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00rTNeukoKOazR/product.webp"
      },
      {
        "image_path": "images/products/me2409-tasinabilir-espresso-makinesi/03.webp",
        "alt_text": "ME2409 me2409 19 bar şarjlı görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00rEFvgjqDvQuU/product.webp"
      },
      {
        "image_path": "images/products/me2409-tasinabilir-espresso-makinesi/04.webp",
        "alt_text": "ME2409 me2409 19 bar şarjlı görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00zQFBumqRvTgG/product.webp"
      },
      {
        "image_path": "images/products/me2409-tasinabilir-espresso-makinesi/05.webp",
        "alt_text": "ME2409 me2409 görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00gQnvpGqPTtzf/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Basınç",
        "value": "19 Bar",
        "sort_order": 0
      },
      {
        "label": "Batarya",
        "value": "7800mAh",
        "sort_order": 1
      },
      {
        "label": "Su tankı",
        "value": "80 ml",
        "sort_order": 2
      },
      {
        "label": "Bardak",
        "value": "250 ml",
        "sort_order": 3
      },
      {
        "label": "Güç",
        "value": "100W",
        "sort_order": 4
      },
      {
        "label": "Şarj",
        "value": "Type-C",
        "sort_order": 5
      },
      {
        "label": "Kahve tipi",
        "value": "Kapsül ve öğütülmüş kahve",
        "sort_order": 6
      }
    ]
  },
  {
    "id": "seed-kh-550",
    "slug": "kh-550-mini-masaj-tabancasi",
    "name": "KH-550 Cep Boy Mini Masaj Tabancası",
    "brand": "OEM",
    "model": "KH-550",
    "category_id": "care",
    "short_description": "24W fırçasız motorlu, yaklaşık 420g ağırlığında cep boy masaj tabancası.",
    "description": "KH-550, günlük rahatlama ve spor sonrası kullanım için tasarlanmış kompakt bir masaj tabancasıdır. 24W fırçasız motor ve 2000mAh batarya kablosuz kullanıma yöneliktir. Yaklaşık 420g ağırlığı taşımayı kolaylaştırır.\n\nUSB ile şarj edilir. Bu ürün tıbbi teşhis veya tedavi amacı taşımaz; rahatlama ve kişisel bakım içindir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 3,
    "stock_status": "in_stock",
    "featured": false,
    "active": true,
    "sort_order": 14,
    "main_image": "images/products/kh-550-mini-masaj-tabancasi/main.webp",
    "source_url": "https://wuyumassageequipment.en.made-in-china.com/product/MZoGgFacEjfP/China-2026-Mini-Gun-Massage-Gun-Smaller-Than-Phone-99-Speeds-Deep-Tissue-OEM-ODM-Wholesale-Produto-Massageador-Gun-Massage-Gun.html",
    "product_images": [
      {
        "image_path": "images/products/kh-550-mini-masaj-tabancasi/main.webp",
        "alt_text": "KH-550 cep boy mini masaj tabancası ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00tNEVYGhDRdUT/product.webp"
      },
      {
        "image_path": "images/products/kh-550-mini-masaj-tabancasi/01.webp",
        "alt_text": "KH-550 kh-550 cep boy mini görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00QyTWYDltTmGE/product.webp"
      },
      {
        "image_path": "images/products/kh-550-mini-masaj-tabancasi/02.webp",
        "alt_text": "KH-550 kh-550 cep boy mini görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00anTVfkWrVwRt/product.webp"
      },
      {
        "image_path": "images/products/kh-550-mini-masaj-tabancasi/03.webp",
        "alt_text": "KH-550 kh-550 cep boy mini görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00tFaVfKhAHmRT/product.webp"
      },
      {
        "image_path": "images/products/kh-550-mini-masaj-tabancasi/04.webp",
        "alt_text": "KH-550 kh-550 cep boy mini görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00tNQhGwWBgAUT/product.webp"
      },
      {
        "image_path": "images/products/kh-550-mini-masaj-tabancasi/05.webp",
        "alt_text": "KH-550 kh-550 cep boy mini görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00GFtWfUlPuAYa/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Motor",
        "value": "24W brushless",
        "sort_order": 0
      },
      {
        "label": "Batarya",
        "value": "2000mAh",
        "sort_order": 1
      },
      {
        "label": "Kullanım",
        "value": "Şarjlı",
        "sort_order": 2
      },
      {
        "label": "Ağırlık",
        "value": "Yaklaşık 420g",
        "sort_order": 3
      },
      {
        "label": "Tasarım",
        "value": "Kompakt",
        "sort_order": 4
      },
      {
        "label": "Şarj",
        "value": "USB",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-pm69",
    "slug": "pm69-isitmali-mini-masaj-tabancasi",
    "name": "PM69 Isıtmalı Mini Masaj Tabancası",
    "brand": "OEM",
    "model": "PM69",
    "category_id": "care",
    "short_description": "Isıtmalı başlıklı, dört hız kademeli ve Type-C şarjlı mini masaj tabancası.",
    "description": "PM69, ısıtmalı masaj başlığı ve dört hız kademesi sunan kompakt bir masaj tabancasıdır. Fırçasız motor ve yaklaşık 240g gövde ağırlığı günlük taşımaya yöneliktir. Type-C şarj kablosuz kullanımı destekler.\n\nBu ürün tıbbi teşhis veya tedavi amacı taşımaz. Kas rahatlatma ve kişisel bakım için tasarlanmıştır.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 5,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 15,
    "main_image": "images/products/pm69-isitmali-mini-masaj-tabancasi/main.webp",
    "source_url": "https://baichangtech.en.made-in-china.com/product/fUwRvpoYYMhm/China-Electric-Mini-Muscle-Massage-Gun-with-Heat-Function.html",
    "product_images": [
      {
        "image_path": "images/products/pm69-isitmali-mini-masaj-tabancasi/main.webp",
        "alt_text": "PM69 ısıtmalı mini masaj tabancası ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00rFbvcYCqEuko/product.webp"
      },
      {
        "image_path": "images/products/pm69-isitmali-mini-masaj-tabancasi/01.webp",
        "alt_text": "PM69 pm69 ısıtmalı mini masaj görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00UnbBoKCJwrkq/product.webp"
      },
      {
        "image_path": "images/products/pm69-isitmali-mini-masaj-tabancasi/02.webp",
        "alt_text": "PM69 pm69 ısıtmalı mini masaj görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00YykvqmCrlzbo/product.webp"
      },
      {
        "image_path": "images/products/pm69-isitmali-mini-masaj-tabancasi/03.webp",
        "alt_text": "PM69 pm69 görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00UFkCqcBWrgbo/product.webp"
      },
      {
        "image_path": "images/products/pm69-isitmali-mini-masaj-tabancasi/04.webp",
        "alt_text": "PM69 pm69 ısıtmalı mini masaj görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00pNqCcIMDErkb/product.webp"
      },
      {
        "image_path": "images/products/pm69-isitmali-mini-masaj-tabancasi/05.webp",
        "alt_text": "PM69 pm69 ısıtmalı mini masaj görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00unkvcqCMkgob/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Başlık",
        "value": "Isıtmalı masaj başlığı",
        "sort_order": 0
      },
      {
        "label": "Hız",
        "value": "4 seviye",
        "sort_order": 1
      },
      {
        "label": "Motor",
        "value": "Brushless",
        "sort_order": 2
      },
      {
        "label": "Şarj",
        "value": "Type-C",
        "sort_order": 3
      },
      {
        "label": "Ağırlık",
        "value": "Yaklaşık 240g",
        "sort_order": 4
      },
      {
        "label": "Gövde",
        "value": "Kompakt",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-f029",
    "slug": "f029-katlanabilir-boyun-fani",
    "name": "F029 Katlanabilir Bladeless Boyun Fanı",
    "brand": "OEM",
    "model": "F029",
    "category_id": "care",
    "short_description": "4000mAh bataryalı, katlanabilir bladeless boyun fanı.",
    "description": "F029, boyuna takılarak kullanılan katlanabilir bir kişisel soğutma fanıdır. Bladeless gövde tasarımı ve 4000mAh batarya, hareket halinde serinlemeyi amaçlar. Type-C şarj günlük kullanıma uygundur.\n\nÜretici ifadesine göre çalışma süresi yaklaşık 5-12 saattir; gerçek süre kademe ve ortam koşullarına göre değişir. Giyilebilir ve katlanabilir yapı seyahat çantasında yer tutmayı azaltır.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 7,
    "stock_status": "in_stock",
    "featured": false,
    "active": true,
    "sort_order": 16,
    "main_image": "images/products/f029-katlanabilir-boyun-fani/main.webp",
    "source_url": "https://leyu-conn.en.made-in-china.com/product/yGNpQkSTCcWe/China-Bladeless-4000mAh-Personal-Portable-Neck-Rechargeable-Fan-Foldable-Fan-Air-Conditioner-Cooling-Wearable-Fans.html",
    "product_images": [
      {
        "image_path": "images/products/f029-katlanabilir-boyun-fani/main.webp",
        "alt_text": "F029 katlanabilir bladeless boyun fanı ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00SYuCLodMrVkl/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Tasarım",
        "value": "Bladeless",
        "sort_order": 0
      },
      {
        "label": "Batarya",
        "value": "4000mAh",
        "sort_order": 1
      },
      {
        "label": "Şarj",
        "value": "Type-C",
        "sort_order": 2
      },
      {
        "label": "Gövde",
        "value": "Katlanabilir",
        "sort_order": 3
      },
      {
        "label": "Kullanım",
        "value": "Giyilebilir",
        "sort_order": 4
      },
      {
        "label": "Çalışma süresi",
        "value": "Yaklaşık 5-12 saat",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-hw05",
    "slug": "hw05-el-isitici-powerbank",
    "name": "HW05 5000mAh El Isıtıcı ve Powerbank",
    "brand": "OEM",
    "model": "HW05",
    "category_id": "electronics",
    "short_description": "5000mAh powerbank işlevli, USB şarjlı taşınabilir el ısıtıcı.",
    "description": "HW05, el ısıtıcı ve 5000mAh powerbank işlevlerini tek gövdede toplayan taşınabilir bir aksesuardır. USB şarj ile tekrar kullanılabilir. Soğuk havalarda cepte taşımak ve düşük kapasiteli cihaz şarjı için tasarlanmıştır.\n\nIsıtma süresi ve powerbank çıkışı kullanım koşullarına göre değişir. Çift işlevli yapı ayrı bir powerbank taşıma ihtiyacını azaltır.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "featured": false,
    "active": true,
    "sort_order": 17,
    "main_image": "images/products/hw05-el-isitici-powerbank/main.webp",
    "source_url": "https://wstwosi.en.made-in-china.com/product/SFmftIUgOrhk/China-USB-Rechargeable-Hand-Warmer-Reusable-Electric-Handwarmer-with-Mobile-Power-Bank.html",
    "product_images": [
      {
        "image_path": "images/products/hw05-el-isitici-powerbank/main.webp",
        "alt_text": "HW05 el ısıtıcı ve powerbank ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00LqPuDRrdgebI/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "İşlev",
        "value": "Elektrikli el ısıtıcı",
        "sort_order": 0
      },
      {
        "label": "Powerbank",
        "value": "5000mAh",
        "sort_order": 1
      },
      {
        "label": "Şarj",
        "value": "USB",
        "sort_order": 2
      },
      {
        "label": "Yapı",
        "value": "Taşınabilir",
        "sort_order": 3
      },
      {
        "label": "Kullanım",
        "value": "Çift işlevli",
        "sort_order": 4
      }
    ]
  },
  {
    "id": "seed-xz-bt512",
    "slug": "xz-bt512-akilli-masa-istasyonu",
    "name": "XZ-BT512 Kablosuz Şarjlı Alarm Saatli Bluetooth Hoparlör",
    "brand": "OEM",
    "model": "XZ-BT512",
    "category_id": "audio",
    "short_description": "Bluetooth hoparlör, dijital alarm saati ve kablosuz şarjı bir araya getiren masa istasyonu.",
    "description": "XZ-BT512, yatak odası veya masaüstü kullanımına yönelik çok işlevli bir istasyondur. Bluetooth 5.3 bağlantılı 5W hoparlör, dijital saat ve alarm temel kullanım senaryolarını karşılar. Kablosuz telefon şarj alanı gece standı ihtiyacını azaltır.\n\nType-C şarj ve 1200mAh batarya kablosuz dinlemeyi destekler. Gerçek şarj hızı telefon modeline göre değişir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 4,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 18,
    "main_image": "images/products/xz-bt512-akilli-masa-istasyonu/main.webp",
    "source_url": "https://sachikoo.en.made-in-china.com/product/NRbYCJzDbncs/China-Magnetic-Wireless-Charging-Station-with-Bluetooth-Speaker-and-Alarm.html",
    "product_images": [
      {
        "image_path": "images/products/xz-bt512-akilli-masa-istasyonu/main.webp",
        "alt_text": "XZ-BT512 kablosuz şarjlı alarm saatli hoparlör ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00MLcBeFInpmbP/product.webp"
      },
      {
        "image_path": "images/products/xz-bt512-akilli-masa-istasyonu/01.webp",
        "alt_text": "XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00jPceCaIWfdkD/product.webp"
      },
      {
        "image_path": "images/products/xz-bt512-akilli-masa-istasyonu/02.webp",
        "alt_text": "XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00jLoMvzIEAAcD/product.webp"
      },
      {
        "image_path": "images/products/xz-bt512-akilli-masa-istasyonu/03.webp",
        "alt_text": "XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00sIcMBWHgLAoD/product.webp"
      },
      {
        "image_path": "images/products/xz-bt512-akilli-masa-istasyonu/04.webp",
        "alt_text": "XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00SPoMBvLJpmkD/product.webp"
      },
      {
        "image_path": "images/products/xz-bt512-akilli-masa-istasyonu/05.webp",
        "alt_text": "XZ-BT512 xz-bt512 kablosuz şarjlı alarm görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00jLqBCOHMGJcD/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Bluetooth",
        "value": "5.3",
        "sort_order": 0
      },
      {
        "label": "Hoparlör",
        "value": "5W",
        "sort_order": 1
      },
      {
        "label": "Saat",
        "value": "Dijital",
        "sort_order": 2
      },
      {
        "label": "Alarm",
        "value": "Var",
        "sort_order": 3
      },
      {
        "label": "Şarj",
        "value": "Kablosuz telefon şarjı",
        "sort_order": 4
      },
      {
        "label": "Bağlantı",
        "value": "Type-C",
        "sort_order": 5
      },
      {
        "label": "Batarya",
        "value": "1200mAh",
        "sort_order": 6
      }
    ]
  },
  {
    "id": "seed-xg-230",
    "slug": "xg-230-mini-supurge-hava-ufleyici",
    "name": "XG-230 4'ü 1 Arada Mini Süpürge ve Hava Üfleyici",
    "brand": "OEM",
    "model": "XG-230",
    "category_id": "auto",
    "short_description": "12 kPa emişli, süpürme, üfleme, şişirme ve vakumlama işlevli kablosuz mini süpürge.",
    "description": "XG-230, araç içi ve masaüstü temizlik için tasarlanmış 4 işlevli kablosuz bir mini süpürgedir. 80W BLDC motor, 12 kPa emiş ve 75.000 RPM değerleri üretici teknik verisidir. Süpürme, hava üfleme, şişirme ve vakumlama başlıkları farklı yüzeylere yöneliktir.\n\n4000mAh batarya ve HEPA filtre kablosuz kullanımı destekler. Gerçek emiş performansı başlık ve yüzey türüne göre değişir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 3,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 19,
    "main_image": "images/products/xg-230-mini-supurge-hava-ufleyici/main.webp",
    "source_url": "https://xg-electronic.en.made-in-china.com/product/DxnUCvdrZVcS/China-Compressed-Air-Duster-BLDC-Handheld-Vacuum-Cordless-Cleaner-in-Rechargeable-Battery-Ultra-Lightweight-Mini-Car-Vacuum-for-Car-Home-Pet-and-Other-Crevices.html",
    "product_images": [
      {
        "image_path": "images/products/xg-230-mini-supurge-hava-ufleyici/main.webp",
        "alt_text": "XG-230 kablosuz mini süpürge ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00DHAbePQjfFoz/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Emiş",
        "value": "12 kPa",
        "sort_order": 0
      },
      {
        "label": "Motor",
        "value": "80W BLDC",
        "sort_order": 1
      },
      {
        "label": "Devir",
        "value": "75.000 RPM",
        "sort_order": 2
      },
      {
        "label": "İşlevler",
        "value": "Süpürme, üfleme, şişirme, vakumlama",
        "sort_order": 3
      },
      {
        "label": "Batarya",
        "value": "4000mAh",
        "sort_order": 4
      },
      {
        "label": "Filtre",
        "value": "HEPA",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-ms-e004-5",
    "slug": "ms-e004-5-elektrikli-tornavida",
    "name": "MS-E004-5 Şarjlı Hassas Elektrikli Tornavida Seti",
    "brand": "OEM",
    "model": "MS-E004-5",
    "category_id": "electronics",
    "short_description": "3.7V şarjlı, manyetik uçlu hassas elektrikli tornavida seti.",
    "description": "MS-E004-5, telefon, laptop ve küçük elektronik tamiri için tasarlanmış şarjlı bir hassas tornavida setidir. 3.7V gövde ve manyetik uçlar vidaları tutmayı kolaylaştırır. Set, taşıma kutusu içinde gelir.\n\nHassas bitler ince vida başları içindir. Tork değeri kullanım sırasında kademeli uygulanmalıdır; bu ürün ağır yapı işleri için tasarlanmamıştır.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 5,
    "stock_status": "in_stock",
    "featured": false,
    "active": true,
    "sort_order": 20,
    "main_image": "images/products/ms-e004-5-elektrikli-tornavida/main.webp",
    "source_url": "https://modagel.en.made-in-china.com/product/yUVrnmCxOpcS/China-China-Factory-Mini-Electric-Tools-Precision-Screwdriver-Set-3-7V-Rechargeable-Screwdriver-Lithium-Battery.html",
    "product_images": [
      {
        "image_path": "images/products/ms-e004-5-elektrikli-tornavida/main.webp",
        "alt_text": "MS-E004-5 şarjlı hassas elektrikli tornavida seti",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00AohMCWHRLLqj/product.webp"
      },
      {
        "image_path": "images/products/ms-e004-5-elektrikli-tornavida/01.webp",
        "alt_text": "MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00wcVeCvHhyLqj/product.webp"
      },
      {
        "image_path": "images/products/ms-e004-5-elektrikli-tornavida/02.webp",
        "alt_text": "MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00JoVMvOHryPbs/product.webp"
      },
      {
        "image_path": "images/products/ms-e004-5-elektrikli-tornavida/03.webp",
        "alt_text": "MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00aciMCQPBCHqO/product.webp"
      },
      {
        "image_path": "images/products/ms-e004-5-elektrikli-tornavida/04.webp",
        "alt_text": "MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00QohMeuLagPky/product.webp"
      },
      {
        "image_path": "images/products/ms-e004-5-elektrikli-tornavida/05.webp",
        "alt_text": "MS-E004-5 ms-e004-5 şarjlı hassas elektrikli görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00EkVBeWDrCHcN/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Voltaj",
        "value": "3.7V",
        "sort_order": 0
      },
      {
        "label": "Kullanım",
        "value": "Şarjlı",
        "sort_order": 1
      },
      {
        "label": "Uçlar",
        "value": "Hassas tornavida bitleri",
        "sort_order": 2
      },
      {
        "label": "Uç tipi",
        "value": "Manyetik",
        "sort_order": 3
      },
      {
        "label": "Uygulama",
        "value": "Telefon ve laptop tamiri",
        "sort_order": 4
      },
      {
        "label": "Aksesuar",
        "value": "Taşıma kutusu",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-pt-9bf",
    "slug": "pt-9bf-parmak-izli-akilli-kilit",
    "name": "PT-9BF Parmak İzli USB Şarjlı Akıllı Asma Kilit",
    "brand": "OEM",
    "model": "PT-9BF",
    "category_id": "security",
    "short_description": "20 parmak izi kaydı ve USB şarj destekli metal gövdeli akıllı asma kilit.",
    "description": "PT-9BF, anahtarsız açılmayı amaçlayan parmak izli bir asma kilittir. Üretici verisine göre 20 parmak izi kaydı ve yaklaşık 0.5 saniyelik tanıma süresi bulunur. USB ile şarj edilir.\n\nMetal gövde çanta, dolap ve bisiklet gibi taşınabilir kullanım senaryolarına yöneliktir. Parmak izi tanıma performansı kayıt kalitesi ve ortam koşullarına göre değişebilir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "featured": false,
    "active": true,
    "sort_order": 21,
    "main_image": "images/products/pt-9bf-parmak-izli-akilli-kilit/main.webp",
    "source_url": "https://jethoo2021.en.made-in-china.com/product/LFGagjiVbARd/China-Safety-Keyless-Fingerprint-USB-Rechargeable-Electric-Smart-Door-Lock.html",
    "product_images": [
      {
        "image_path": "images/products/pt-9bf-parmak-izli-akilli-kilit/main.webp",
        "alt_text": "PT-9BF parmak izli akıllı asma kilit ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/203f0j00lbupGBcrIUgD/product.webp"
      },
      {
        "image_path": "images/products/pt-9bf-parmak-izli-akilli-kilit/01.webp",
        "alt_text": "PT-9BF pt-9bf parmak izli usb görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/203f0j00hbupGncJgRzP/product.webp"
      },
      {
        "image_path": "images/products/pt-9bf-parmak-izli-akilli-kilit/02.webp",
        "alt_text": "PT-9BF pt-9bf parmak izli usb görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/203f0j00okpgfQqBuUzL/product.webp"
      },
      {
        "image_path": "images/products/pt-9bf-parmak-izli-akilli-kilit/03.webp",
        "alt_text": "PT-9BF pt-9bf parmak izli usb görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/203f0j00qoupGrkyvfgL/product.webp"
      },
      {
        "image_path": "images/products/pt-9bf-parmak-izli-akilli-kilit/04.webp",
        "alt_text": "PT-9BF pt-9bf parmak izli usb görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00qkgrflbtTUuI/product.webp"
      },
      {
        "image_path": "images/products/pt-9bf-parmak-izli-akilli-kilit/05.webp",
        "alt_text": "PT-9BF pt-9bf parmak izli usb görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00ckprYBbKJRzP/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Açılma",
        "value": "Parmak izi",
        "sort_order": 0
      },
      {
        "label": "Kayıt",
        "value": "20 parmak izi",
        "sort_order": 1
      },
      {
        "label": "Tanıma",
        "value": "Yaklaşık 0.5 sn",
        "sort_order": 2
      },
      {
        "label": "Şarj",
        "value": "USB",
        "sort_order": 3
      },
      {
        "label": "Gövde",
        "value": "Metal",
        "sort_order": 4
      },
      {
        "label": "Kullanım",
        "value": "Çanta, dolap ve bisiklet",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-eg12",
    "slug": "eg12-ai-akilli-gozluk",
    "name": "EG12 AI Kamera ve Anlık Çeviri Akıllı Gözlük",
    "brand": "OEM",
    "model": "EG12",
    "category_id": "wearable",
    "short_description": "8MP kameralı, Wi-Fi aktarımlı ve gerçek zamanlı çeviri özellikli akıllı gözlük.",
    "description": "EG12, fotoğraf, video ve sesli asistan işlevlerini bir araya getiren kamera destekli bir akıllı gözlüktür. 8MP kamera, çift mikrofon ve Wi-Fi veri aktarımı kaynak sayfasında belirtilmiştir. Nesne tanıma ve gerçek zamanlı çeviri, üreticinin tanımladığı yazılım özellikleridir.\n\nKaynak sayfası çeviri için 40 dil desteği listeler; bu listede Türkçe de yer alır. Çeviri kalitesi bağlı uygulamaya ve bağlantıya göre değişebilir. Doğrulanmayan ek özellik eklenmemiştir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 3,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 22,
    "main_image": "images/products/eg12-ai-akilli-gozluk/main.webp",
    "source_url": "https://4p-touch.en.made-in-china.com/product/mUaYvEQysXhM/China-2026-new-launched-waterproof-realtime-translation-smart-camera-glasses-with-AI-voice-assistant-object-recognition-voice-recording-EG12.html",
    "product_images": [
      {
        "image_path": "images/products/eg12-ai-akilli-gozluk/main.webp",
        "alt_text": "EG12 AI kamera ve çeviri akıllı gözlük ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00PykCdgJGMHbo/product.webp"
      },
      {
        "image_path": "images/products/eg12-ai-akilli-gozluk/01.webp",
        "alt_text": "EG12 eg12 aı kamera ve görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/226f0j00cFlMLyYfEPbe/product.webp"
      },
      {
        "image_path": "images/products/eg12-ai-akilli-gozluk/02.webp",
        "alt_text": "EG12 eg12 aı kamera ve görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/226f0j00MyhCIQRnELcB/product.webp"
      },
      {
        "image_path": "images/products/eg12-ai-akilli-gozluk/03.webp",
        "alt_text": "EG12 eg12 aı kamera ve görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/226f0j00CnheHpYthPkM/product.webp"
      },
      {
        "image_path": "images/products/eg12-ai-akilli-gozluk/04.webp",
        "alt_text": "EG12 eg12 aı kamera ve görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/226f0j00CNhMPifKLDbe/product.webp"
      },
      {
        "image_path": "images/products/eg12-ai-akilli-gozluk/05.webp",
        "alt_text": "EG12 eg12 aı kamera ve görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/226f0j00BOVMPCRhrDbe/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Kamera",
        "value": "8MP",
        "sort_order": 0
      },
      {
        "label": "Asistan",
        "value": "AI sesli asistan",
        "sort_order": 1
      },
      {
        "label": "Tanıma",
        "value": "Nesne tanıma",
        "sort_order": 2
      },
      {
        "label": "Kayıt",
        "value": "Fotoğraf ve video",
        "sort_order": 3
      },
      {
        "label": "Aktarım",
        "value": "Wi-Fi",
        "sort_order": 4
      },
      {
        "label": "Mikrofon",
        "value": "Çift mikrofon",
        "sort_order": 5
      },
      {
        "label": "Çeviri",
        "value": "Gerçek zamanlı, 40 dil",
        "sort_order": 6
      },
      {
        "label": "Dil desteği",
        "value": "Türkçe dahil (üretici listesi)",
        "sort_order": 7
      }
    ]
  },
  {
    "id": "seed-yt600",
    "slug": "yt600-android-mini-projektor",
    "name": "YT600 Android 13 Wi-Fi 6 Mini Projektör",
    "brand": "OEM",
    "model": "YT600",
    "category_id": "display",
    "short_description": "Android 13, Wi-Fi 6 ve 170 ANSI parlaklıklı 720p mini projektör.",
    "description": "YT600, 720p doğal çözünürlük ve 170 ANSI parlaklık sunan Android 13 tabanlı bir mini projektördür. Wi-Fi 6, Bluetooth 5.4, elektronik odak ve keystone düzeltme temel kurulum ihtiyaçlarını karşılar. 4K decode ifadesi üretici yazılım desteğine aittir; native çözünürlük 720p'dir.\n\nKaynak sayfası US plug varyantını göstermektedir. Türkiye priz ve voltaj uyumu sipariş öncesinde ayrıca teyit edilmelidir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 4,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 23,
    "main_image": "images/products/yt600-android-mini-projektor/main.webp",
    "source_url": "https://tvcmall.en.made-in-china.com/product/awlfOPkCEZGY/China-Yt600-Football-Projector-720p-Android-13-170-ANSI-WiFi-6-Us-Plug.html",
    "product_images": [
      {
        "image_path": "images/products/yt600-android-mini-projektor/main.webp",
        "alt_text": "YT600 Android mini projektör ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00OJHhbifGaVRa/product.webp"
      },
      {
        "image_path": "images/products/yt600-android-mini-projektor/01.webp",
        "alt_text": "YT600 yt600 android 13 wi-fi görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00ywDhcCfqCiRa/product.webp"
      },
      {
        "image_path": "images/products/yt600-android-mini-projektor/02.webp",
        "alt_text": "YT600 yt600 android 13 wi-fi görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00OwHhcyYPClRT/product.webp"
      },
      {
        "image_path": "images/products/yt600-android-mini-projektor/03.webp",
        "alt_text": "YT600 yt600 android 13 wi-fi görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00JALWkTfMgiYa/product.webp"
      },
      {
        "image_path": "images/products/yt600-android-mini-projektor/04.webp",
        "alt_text": "YT600 yt600 android 13 wi-fi görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00mAIWcuYJZhRT/product.webp"
      },
      {
        "image_path": "images/products/yt600-android-mini-projektor/05.webp",
        "alt_text": "YT600 yt600 android 13 wi-fi görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00AJIhqWYggVUt/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Çözünürlük",
        "value": "720p doğal",
        "sort_order": 0
      },
      {
        "label": "İşletim sistemi",
        "value": "Android 13",
        "sort_order": 1
      },
      {
        "label": "Kablosuz",
        "value": "Wi-Fi 6",
        "sort_order": 2
      },
      {
        "label": "Bluetooth",
        "value": "5.4",
        "sort_order": 3
      },
      {
        "label": "Parlaklık",
        "value": "170 ANSI",
        "sort_order": 4
      },
      {
        "label": "Decode",
        "value": "4K decode desteği",
        "sort_order": 5
      },
      {
        "label": "Odak",
        "value": "Elektronik focus",
        "sort_order": 6
      },
      {
        "label": "Keystone",
        "value": "Keystone düzeltme",
        "sort_order": 7
      }
    ]
  },
  {
    "id": "seed-sh861",
    "slug": "sh861-kablosuz-lastik-pompasi",
    "name": "SH861 Dijital Kablosuz Lastik Şişirme Pompası",
    "brand": "OEM",
    "model": "SH861",
    "category_id": "auto",
    "short_description": "100 PSI dijital ekranlı, otomatik durduran kablosuz lastik pompası.",
    "description": "SH861, araç, motosiklet ve bisiklet lastikleri için tasarlanmış kablosuz bir şişirme pompasıdır. 100 PSI azami basınç, 25 L/dk debi ve dijital basınç ekranı üretici teknik verisidir. Hedef basınca ulaşınca otomatik durdurma lastik basıncını kontrol etmeyi kolaylaştırır.\n\nPSI, BAR ve KPA birimleri arasında geçiş yapılabilir. Type-C şarj, LED / SOS ışık ve powerbank işlevi yol kenarı kullanımına yöneliktir. Gerçek şişirme süresi lastik hacmine göre değişir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 6,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 24,
    "main_image": "images/products/sh861-kablosuz-lastik-pompasi/main.webp",
    "source_url": "https://nbshers.en.made-in-china.com/product/mnWYhOldOtRp/China-Smart-Digital-Cordless-Wireless-Rechargeable-Tyre-Inflator-Air-Pump.html",
    "product_images": [
      {
        "image_path": "images/products/sh861-kablosuz-lastik-pompasi/main.webp",
        "alt_text": "SH861 kablosuz lastik şişirme pompası ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/203f0j00UfMoqaBdAcgw/product.webp"
      },
      {
        "image_path": "images/products/sh861-kablosuz-lastik-pompasi/01.webp",
        "alt_text": "SH861 sh861 dijital kablosuz lastik görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00fYCbcpBRHogm/product.webp"
      },
      {
        "image_path": "images/products/sh861-kablosuz-lastik-pompasi/02.webp",
        "alt_text": "SH861 sh861 dijital kablosuz lastik görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00UYCbqlMyrouJ/product.webp"
      },
      {
        "image_path": "images/products/sh861-kablosuz-lastik-pompasi/03.webp",
        "alt_text": "SH861 sh861 dijital kablosuz lastik görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/203f0j00fYMqbCBcfkpJ/product.webp"
      },
      {
        "image_path": "images/products/sh861-kablosuz-lastik-pompasi/04.webp",
        "alt_text": "SH861 sh861 dijital kablosuz lastik görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00UGBcqOMzEbrw/product.webp"
      },
      {
        "image_path": "images/products/sh861-kablosuz-lastik-pompasi/05.webp",
        "alt_text": "SH861 sh861 dijital kablosuz lastik görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00gUvqkTBEYbzw/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Basınç",
        "value": "100 PSI",
        "sort_order": 0
      },
      {
        "label": "Batarya",
        "value": "2600mAh",
        "sort_order": 1
      },
      {
        "label": "Debi",
        "value": "25 L/dk",
        "sort_order": 2
      },
      {
        "label": "Ekran",
        "value": "Dijital basınç",
        "sort_order": 3
      },
      {
        "label": "Durdurma",
        "value": "Otomatik",
        "sort_order": 4
      },
      {
        "label": "Birimler",
        "value": "PSI / BAR / KPA",
        "sort_order": 5
      },
      {
        "label": "Şarj",
        "value": "Type-C",
        "sort_order": 6
      },
      {
        "label": "Ek işlev",
        "value": "LED / SOS ve powerbank",
        "sort_order": 7
      }
    ]
  },
  {
    "id": "seed-ga02",
    "slug": "eraclean-ga02-ultrasonik-temizleyici",
    "name": "EraClean GA02 Şarjlı Ultrasonik Temizleyici",
    "brand": "EraClean",
    "model": "GA02",
    "category_id": "living",
    "short_description": "45 kHz, 340 ml SUS304 hazneli şarjlı ultrasonik temizleyici.",
    "description": "EraClean GA02, takı, gözlük ve benzeri küçük metal/cam parçalar için tasarlanmış taşınabilir bir ultrasonik temizleyicidir. 45 kHz ultrasonik frekans, 340 ml SUS304 hazne ve 15W güç üretici teknik verisidir. 3 dakikalık otomatik program kısa temizlik döngüsü sunar.\n\nType-C şarj ve 840mAh batarya prizden bağımsız kullanıma yöneliktir. Su ve temizleme solüsyonu seçimi malzeme türüne göre yapılmalıdır.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 2,
    "stock_status": "low_stock",
    "featured": true,
    "active": true,
    "sort_order": 25,
    "main_image": "images/products/eraclean-ga02-ultrasonik-temizleyici/main.webp",
    "source_url": "https://eraclean.en.made-in-china.com/product/hwaGzogPXrkZ/China-SUS304-Stainless-Steel-Lithium-Battery-Portable-Mini-Ultrasonic-Cleaner-for-Jewelry-Watches-Rings-with-USB-Charging.html",
    "product_images": [
      {
        "image_path": "images/products/eraclean-ga02-ultrasonik-temizleyici/main.webp",
        "alt_text": "EraClean GA02 şarjlı ultrasonik temizleyici ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00IWdljGqmMbUO/product.webp"
      },
      {
        "image_path": "images/products/eraclean-ga02-ultrasonik-temizleyici/01.webp",
        "alt_text": "GA02 eraclean ga02 şarjlı ultrasonik görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00DWwVjLcrfqRn/product.webp"
      },
      {
        "image_path": "images/products/eraclean-ga02-ultrasonik-temizleyici/02.webp",
        "alt_text": "GA02 eraclean ga02 şarjlı ultrasonik görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00DiJVSbcqMoYF/product.webp"
      },
      {
        "image_path": "images/products/eraclean-ga02-ultrasonik-temizleyici/03.webp",
        "alt_text": "GA02 eraclean ga02 şarjlı ultrasonik görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/226f0j00PhAiZjcyGofN/product.webp"
      },
      {
        "image_path": "images/products/eraclean-ga02-ultrasonik-temizleyici/04.webp",
        "alt_text": "GA02 eraclean ga02 şarjlı ultrasonik görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/226f0j00HVAiSdbGMqYn/product.webp"
      },
      {
        "image_path": "images/products/eraclean-ga02-ultrasonik-temizleyici/05.webp",
        "alt_text": "GA02 eraclean ga02 şarjlı ultrasonik görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/226f0j00WlmiKfohrbYN/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Frekans",
        "value": "45 kHz",
        "sort_order": 0
      },
      {
        "label": "Kapasite",
        "value": "340 ml",
        "sort_order": 1
      },
      {
        "label": "Güç",
        "value": "15W",
        "sort_order": 2
      },
      {
        "label": "Şarj",
        "value": "Type-C",
        "sort_order": 3
      },
      {
        "label": "Batarya",
        "value": "840mAh",
        "sort_order": 4
      },
      {
        "label": "Hazne",
        "value": "SUS304",
        "sort_order": 5
      },
      {
        "label": "Program",
        "value": "3 dakika otomatik",
        "sort_order": 6
      },
      {
        "label": "Kullanım",
        "value": "Takı ve gözlük",
        "sort_order": 7
      }
    ]
  },
  {
    "id": "seed-bt3031",
    "slug": "bt3031-mini-camasir-makinesi",
    "name": "BT3031 USB Şarjlı Mini Çamaşır Makinesi",
    "brand": "OEM",
    "model": "BT3031",
    "category_id": "living",
    "short_description": "5 litre kapasiteli, 10W USB şarjlı mini çamaşır makinesi.",
    "description": "BT3031, çorap, iç çamaşırı ve benzeri küçük tekstil ürünleri için tasarlanmış kompakt bir mini yıkama cihazıdır. 5 litre hazne ve 10W güç tüketimi ev tipi çamaşır makinesinin yerine geçmez; küçük porsiyonlar içindir.\n\nUSB şarj ve taşınabilir gövde yurt, ofis ve seyahat kullanımına yöneliktir. Yıkama performansı kumaş türü ve doluluk oranına göre değişir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 3,
    "stock_status": "in_stock",
    "featured": false,
    "active": true,
    "sort_order": 26,
    "main_image": "images/products/bt3031-mini-camasir-makinesi/main.webp",
    "source_url": "https://ibriter888.en.made-in-china.com/product/eAaYfGHruZWt/China-Portable-Mini-Washer-Best-Wireless-Portable-Baby-Underclothes-Socks-Small-Washing-Machine-Automatic-Washing-Machine.html",
    "product_images": [
      {
        "image_path": "images/products/bt3031-mini-camasir-makinesi/main.webp",
        "alt_text": "BT3031 USB şarjlı mini çamaşır makinesi ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00hPECDJHMrobN/product.webp"
      },
      {
        "image_path": "images/products/bt3031-mini-camasir-makinesi/01.webp",
        "alt_text": "BT3031 bt3031 usb şarjlı mini görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00oLQCHRDWHkbF/product.webp"
      },
      {
        "image_path": "images/products/bt3031-mini-camasir-makinesi/02.webp",
        "alt_text": "BT3031 bt3031 usb şarjlı mini görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00qPaBDIHZnkcN/product.webp"
      },
      {
        "image_path": "images/products/bt3031-mini-camasir-makinesi/03.webp",
        "alt_text": "BT3031 bt3031 usb şarjlı mini görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00qDaBPbIEHckN/product.webp"
      },
      {
        "image_path": "images/products/bt3031-mini-camasir-makinesi/04.webp",
        "alt_text": "BT3031 bt3031 usb şarjlı mini görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00qIEvPSLnLcoF/product.webp"
      },
      {
        "image_path": "images/products/bt3031-mini-camasir-makinesi/05.webp",
        "alt_text": "BT3031 bt3031 usb şarjlı mini görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00kDavPmIMLboy/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Kapasite",
        "value": "5 litre",
        "sort_order": 0
      },
      {
        "label": "Güç",
        "value": "10W",
        "sort_order": 1
      },
      {
        "label": "Tasarım",
        "value": "Kompakt",
        "sort_order": 2
      },
      {
        "label": "Kullanım",
        "value": "Küçük çamaşırlar",
        "sort_order": 3
      },
      {
        "label": "Uygulama",
        "value": "Çorap ve küçük tekstil",
        "sort_order": 4
      },
      {
        "label": "Yapı",
        "value": "Taşınabilir",
        "sort_order": 5
      }
    ]
  },
  {
    "id": "seed-mr-hx03",
    "slug": "mr-hx03-ayakkabi-kurutucu",
    "name": "MR-HX03 Katlanabilir Akıllı Ayakkabı Kurutucu",
    "brand": "OEM",
    "model": "MR-HX03",
    "category_id": "living",
    "short_description": "150W, 40-45°C sabit sıcaklıklı katlanabilir ayakkabı kurutucu.",
    "description": "MR-HX03, ayakkabı, bot ve eldiven kurutmaya yönelik katlanabilir bir sıcak hava cihazıdır. 150W güç ve 40-45°C çalışma sıcaklığı üretici teknik verisidir. Zamanlayıcı ve çok yönlü hava çıkışı nemin dağılmasına yardımcı olur.\n\nKatlanabilir gövde depolamayı kolaylaştırır. Fiş tipi ve voltaj bilgisi sipariş öncesinde teyit edilmelidir.",
    "price": null,
    "old_price": null,
    "currency": "TRY",
    "stock_quantity": 5,
    "stock_status": "in_stock",
    "featured": true,
    "active": true,
    "sort_order": 27,
    "main_image": "images/products/mr-hx03-ayakkabi-kurutucu/main.webp",
    "source_url": "https://muren-tech.en.made-in-china.com/product/UaCYnAGVVvpM/China-2026-Multi-Hole-Heat-Dissipation-Constant-Deodorizer-Temperature-Warmer-Shoes-Dryer.html",
    "product_images": [
      {
        "image_path": "images/products/mr-hx03-ayakkabi-kurutucu/main.webp",
        "alt_text": "MR-HX03 katlanabilir ayakkabı kurutucu ürün görünümü",
        "sort_order": 0,
        "source_image_url": "https://image.made-in-china.com/2f0j00RuGefFKygUgc/product.webp"
      },
      {
        "image_path": "images/products/mr-hx03-ayakkabi-kurutucu/01.webp",
        "alt_text": "MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 1",
        "sort_order": 1,
        "source_image_url": "https://image.made-in-china.com/2f0j00pzRCYTSnqGuk/product.webp"
      },
      {
        "image_path": "images/products/mr-hx03-ayakkabi-kurutucu/02.webp",
        "alt_text": "MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 2",
        "sort_order": 2,
        "source_image_url": "https://image.made-in-china.com/2f0j00pzfvRrsqVYub/product.webp"
      },
      {
        "image_path": "images/products/mr-hx03-ayakkabi-kurutucu/03.webp",
        "alt_text": "MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 3",
        "sort_order": 3,
        "source_image_url": "https://image.made-in-china.com/2f0j00puUMfWKrIYzo/product.webp"
      },
      {
        "image_path": "images/products/mr-hx03-ayakkabi-kurutucu/04.webp",
        "alt_text": "MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 4",
        "sort_order": 4,
        "source_image_url": "https://image.made-in-china.com/2f0j00puGCfBsdgUrq/product.webp"
      },
      {
        "image_path": "images/products/mr-hx03-ayakkabi-kurutucu/05.webp",
        "alt_text": "MR-HX03 mr-hx03 katlanabilir akıllı ayakkabı görünüm 5",
        "sort_order": 5,
        "source_image_url": "https://image.made-in-china.com/2f0j00zuUCYNsRvfrq/product.webp"
      }
    ],
    "product_features": [
      {
        "label": "Güç",
        "value": "150W",
        "sort_order": 0
      },
      {
        "label": "Sıcaklık",
        "value": "40-45°C",
        "sort_order": 1
      },
      {
        "label": "Zamanlayıcı",
        "value": "Var",
        "sort_order": 2
      },
      {
        "label": "Tasarım",
        "value": "Katlanabilir",
        "sort_order": 3
      },
      {
        "label": "Hava çıkışı",
        "value": "Çok yönlü",
        "sort_order": 4
      },
      {
        "label": "Kullanım",
        "value": "Ayakkabı, bot ve eldiven",
        "sort_order": 5
      }
    ]
  }
];

export const importedCategoryIdByName = categoryByName;

