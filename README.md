# İlgün Ticaret

İlgün Ticaret için hazırlanmış mobil öncelikli elektronik ürün kataloğu. Ürünler veritabanından okunur; fiyat verilmemiş ürünlerde sahte tutar yerine “Fiyat için iletişime geçin” gösterilir. Sipariş ve iletişim akışı yalnızca WhatsApp üzerinden İshak İlgün'e yönlenir.

## Teknoloji

- React 18 + TypeScript + Vite
- React Router ve GitHub Pages SPA fallback
- Supabase Database, Auth, Storage ve RLS
- Saf CSS; harici font veya ağır UI paketi yok
- Vitest + Testing Library + ESLint

## Yerel geliştirme

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local`:

```env
VITE_SUPABASE_URL=https://PROJECT_REF.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
```

Publishable key frontend için tasarlanmıştır ve RLS ile sınırlandırılır. Secret/service role key hiçbir zaman frontend'e veya Git'e eklenmemelidir. Ortam değişkenleri yoksa uygulama beyaz ekran yerine yerel başlangıç kataloğunu gösterir; yönetim paneli veritabanı yapılandırması ister.

## Veritabanı ve migration

Yeni bir Supabase projesinde:

```bash
supabase link --project-ref PROJECT_REF
supabase db push
```

Migration `supabase/migrations/` altındadır ve şu yapıları oluşturur:

- `products`, `product_images`, `categories`, `product_features`, `product_reviews`, `site_settings`
- Ürün fiyatlarında kaynak URL'si, kontrol tarihi ve dönüşüm notu
- Yetkili UID listesi için `admin_users`
- Yönetici görsel yüklemeleri için public `product-images` bucket
- Anonim kullanıcılara yalnızca aktif katalog okuması
- Yalnızca `admin_users` tablosunda bulunan oturumlara CRUD ve Storage yazma yetkisi

## İlk admin hesabı

1. Supabase Dashboard → Authentication → Users → **Add user** ile İshak için e-posta/parola hesabı oluşturun.
2. Oluşan kullanıcının UUID değerini SQL Editor'da tek komutla yetkilendirin:

```sql
insert into public.admin_users (id) values ('AUTH_USER_UUID');
```

Sonra `/admin` sayfasından giriş yapılabilir. Public signup yoktur. İkinci bir yönetici için aynı komut yeni UID ile tekrarlanır.

## Admin kullanımı

`/admin` üzerinden ürün ekleme, düzenleme, kalıcı silme, aktif/pasif yapma, fiyat/eski fiyat, stok, öne çıkarma, açıklama, kategori, sıralama, özellik, görsel ve müşteri yorumu yönetimi yapılabilir. Görsel yükleme alanı dosyayı Supabase Storage'a yollar ve public URL'yi ürün kaydına ekler. Yeni yorumlar varsayılan olarak onaysız kaydedilir; admin onaylamadan mağazada görünmez.

Sepet tarayıcıda yerel olarak saklanır. Ödeme almaz; ürün ve adet listesini profesyonel bir WhatsApp sipariş mesajına dönüştürür.

Özellik alanında her satır `Etiket|Değer`, görsel alanında her satır `Yol veya URL|Alt metin` biçimindedir.

## Yeni ürün ve yerel görsel

Başlangıç görselleri şu düzende tutulur:

```text
public/images/products/<urun-slug>/main.webp
public/images/products/<urun-slug>/01.webp
```

Kart görselleri 1:1 alanda `object-fit: contain` kullanır. Yeni bir başlangıç asset'i eklendiğinde WebP, temiz arka plan ve tercihen en az 800×800 px kullanın. Dış kaynağı `ASSET_PROVENANCE.md` dosyasına ekleyin.

## İletişim ayarları

Frontend iletişim bilgileri `src/lib/site.ts` dosyasındadır. Veritabanındaki karşılıkları `site_settings` tablosunda bulunur. Telefon, WhatsApp, hizmet bölgesi ve harita bağlantısı buradan yönetilir. WhatsApp numarası değiştirilirken hem `whatsapp` hem görünen `phone` değerini ve frontend config'ini güncelleyin. `/contact` sayfasındaki form veri toplamaz; hazırlanan mesajı doğrudan WhatsApp'ta açar.

## Test ve production build

```bash
npm run lint
npm test
npm run build
npm run preview
```

## GitHub Pages deployment

`main` branch'e her push `.github/workflows/deploy-pages.yml` akışını tetikler. Repository secrets:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

Vite production base yolu `/ilgun-ticaret/` olarak ayarlıdır. `public/404.html`, ürün detay URL'lerinin yenilemede 404 vermeden SPA router'a dönmesini sağlar.

Canlı adres: https://asreonn.github.io/ilgun-ticaret/
