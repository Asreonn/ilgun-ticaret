import { ArrowLeft, BadgeCheck, Check, MessageCircle, Minus, PackageCheck, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { Reveal } from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { cartWhatsappUrl, formatPrice, imageUrl } from "../lib/site";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { StickyActions } from "../components/StickyActions";

const stockText = { in_stock: "Stokta", low_stock: "Sınırlı stok", out_of_stock: "Stokta yok", contact: "Stok teyidi gerekir" };

function featureChip(label: string, value?: string) {
  const trimmed = value?.trim();
  if (trimmed && trimmed !== "Var") return `${label}: ${trimmed}`;
  return label;
}

export default function Cart() {
  const { items, totalItems, knownTotal, hasUnknownPrices, updateQuantity, removeItem, clearCart } = useCart();
  if (!items.length) return <div className="page-shell container"><PageMeta title="Sepetim" description="İlgün Ticaret ürün sepeti" canonical="/cart"/><div className="empty-cart"><span><ShoppingBag/></span><h1>Sepetiniz boş</h1><p>İlgilendiğiniz ürünleri sepete ekleyip tek mesajla bilgi ve fiyat isteyebilirsiniz.</p><Link className="button primary" to="/products">Ürünleri İncele</Link></div></div>;
  const orderUrl = cartWhatsappUrl(items);
  return (
    <div className="page-shell container cart-page">
      <PageMeta title={`Sepetim (${totalItems})`} description="İlgün Ticaret WhatsApp sipariş sepeti" canonical="/cart"/>
      <div className="checkout-progress" aria-label="Sipariş adımları">
        <span className="active"><Check/> Ürünleri seç</span><i/>
        <span className="active"><ShoppingBag/> Sepeti düzenle</span><i/>
        <span><MessageCircle/> WhatsApp'ta tamamla</span>
      </div>
      <Reveal className="cart-heading" direction="left">
        <div>
          <span className="eyebrow">SEPETİM</span>
          <h1>{totalItems} ürün seçtiniz</h1>
          <p>Adetleri düzenleyin ve listenizi WhatsApp üzerinden gönderin.</p>
        </div>
        <button onClick={clearCart}><Trash2/> Sepeti Temizle</button>
      </Reveal>
      <Reveal className="cart-layout" direction="up">
        <div className="cart-content">
          <div className="cart-items">
            {items.map(({ product, quantity }) => {
              const chips = product.product_features.slice(0, 3).map((feature) => featureChip(feature.label, feature.value));
              return (
                <article className="cart-item" key={product.id}>
                  <Link to={`/products/${product.slug}`}>
                    <ImageWithLoader src={imageUrl(product.main_image)} alt={product.name} loading="lazy"/>
                  </Link>
                  <div className="cart-item-info">
                    <span>{product.brand || "İlgün Seçkisi"} · {product.model}</span>
                    <Link to={`/products/${product.slug}`}><strong>{product.name}</strong></Link>
                    {product.short_description && <p className="cart-item-copy">{product.short_description}</p>}
                    {chips.length > 0 && (
                      <ul className="cart-item-specs">
                        {chips.map((chip) => <li key={chip}>{chip}</li>)}
                      </ul>
                    )}
                    <div className="cart-item-meta">
                      <small className={`stock ${product.stock_status}`}>{stockText[product.stock_status]}</small>
                      <div className="cart-line-price">
                        <b>{formatPrice(product.price, product.currency)}</b>
                        {product.price != null && quantity > 1 && <small>Toplam {formatPrice(product.price * quantity, product.currency)}</small>}
                      </div>
                    </div>
                  </div>
                  <div className="quantity-control" aria-label={`${product.name} adedi`}>
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Azalt"><Minus/></button>
                    <span>{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Artır"><Plus/></button>
                  </div>
                  <button className="remove-item" onClick={() => removeItem(product.id)} aria-label={`${product.name} sepetten çıkar`}><Trash2/></button>
                </article>
              );
            })}
          </div>
          <div className="cart-assurance">
            <div><BadgeCheck/><span><strong>Net ürün listesi</strong><small>Model ve adetler mesaja otomatik eklenir.</small></span></div>
            <div><PackageCheck/><span><strong>Stok teyidi</strong><small>Sipariş öncesinde güncel durum paylaşılır.</small></span></div>
            <div><MessageCircle/><span><strong>Doğrudan iletişim</strong><small>Ödeme adımı yok; süreç WhatsApp'ta tamamlanır.</small></span></div>
          </div>
        </div>
        <aside className="order-summary">
          <span className="summary-kicker">SİPARİŞ ÖZETİ</span>
          <h2>Listeniz hazır</h2>
          <div><span>Ürün adedi</span><strong>{totalItems}</strong></div>
          {knownTotal > 0 && <div className="summary-total"><span>Referans toplam</span><strong>{formatPrice(knownTotal)}</strong></div>}
          {hasUnknownPrices && <p>Bazı ürünlerin fiyatı için iletişime geçilmesi gerekiyor. Güncel fiyat ve stok mesajınıza yanıt olarak iletilecektir.</p>}
          <small className="summary-note">Fiyat ve stok bilgisi WhatsApp görüşmesinde kesinleştirilir.</small>
          <a className="button whatsapp" href={orderUrl} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Sipariş ver</a>
          <Link className="continue-shopping" to="/products"><ArrowLeft/> Alışverişe devam et</Link>
        </aside>
      </Reveal>
      <StickyActions className="sticky-cart-actions">
        <a className="button whatsapp" href={orderUrl} target="_blank" rel="noreferrer"><MessageCircle size={18}/> Sipariş ver · {totalItems} ürün</a>
      </StickyActions>
    </div>
  );
}
