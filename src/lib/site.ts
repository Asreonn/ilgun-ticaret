export const site = {
  name: "İlgün Ticaret",
  contact: "İshak İlgün",
  phoneDisplay: "0543 434 20 32",
  whatsapp: "905434342032",
  url: "https://asreonn.github.io/ilgun-ticaret"
};

export function whatsappUrl(productName?: string) {
  const text = productName
    ? `Merhabalar, ${productName} hakkında bilgi almak ve sipariş vermek istiyorum.`
    : "Merhabalar, ürünleriniz hakkında bilgi almak istiyorum.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function cartWhatsappUrl(items: { product: { name: string; model: string }; quantity: number }[]) {
  const lines = items.map((item) => `• ${item.product.name} (${item.product.model}) — ${item.quantity} adet`);
  const text = ["Merhabalar, aşağıdaki ürünler hakkında bilgi almak ve sipariş vermek istiyorum:", "", ...lines].join("\n");
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
