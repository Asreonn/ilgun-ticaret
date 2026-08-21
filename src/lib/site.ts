export const site = {
  name: "İlgün Ticaret",
  contact: "İshak İlgün",
  phoneDisplay: "0543 434 20 32",
  whatsapp: "905434342032",
  url: "https://asreonn.github.io/ilgun-ticaret"
};

export function whatsappUrl(productName?: string) {
  const text = productName
    ? `Merhaba İshak Bey, ${productName} hakkında bilgi almak ve sipariş vermek istiyorum.`
    : "Merhaba İshak Bey, ürünleriniz hakkında bilgi almak istiyorum.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function imageUrl(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}

export function formatPrice(price: number | null, currency = "TRY") {
  if (price == null) return "Fiyat için iletişime geçin";
  return new Intl.NumberFormat("tr-TR", { style: "currency", currency }).format(price);
}
