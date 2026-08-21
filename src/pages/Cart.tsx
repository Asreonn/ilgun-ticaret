import { ArrowLeft, MessageCircle, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { Reveal } from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { cartWhatsappUrl, formatPrice, imageUrl } from "../lib/site";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { StickyActions } from "../components/StickyActions";

export default function Cart() {
  const { items, totalItems, knownTotal, hasUnknownPrices, updateQuantity, removeItem, clearCart } = useCart();
  if (!items.length) {
    return (
      <div className="page-shell container">
        <PageMeta title="Sepetim" description="İlgün Ticaret ürün sepeti" canonical="/cart"/>
        <div className="empty-cart">
          <span><ShoppingBag/></span>
          <h1>Sepetiniz boş</h1>
          <p>İlgilendiğiniz ürünleri sepete ekleyip tek mesajla bilgi ve fiyat isteyebilirsiniz.</p>
          <Link className="button primary" to="/products">Ürünleri İncele</Link>
        </div>
      </div>
    );
  }
  const orderUrl = cartWhatsappUrl(items);
  return (
    <div className="page-shell container cart-page">
      <PageMeta title={`Sepetim (${totalItems})`} description="İlgün Ticaret WhatsApp sipariş sepeti" canonical="/cart"/>
      <Reveal className="cart-heading" direction="left">
        <div>
          <span className="eyebrow">SEPET</span>
          <h1>Sipariş listeniz</h1>
          <p>{totalItems} ürün · Adetleri düzenleyip WhatsApp’tan gönderin.</p>
        </div>
        <button type="button" onClick={clearCart}><Trash2/> Temizle</button>
      </Reveal>
      <Reveal className="cart-layout" direction="up">
        <div className="cart-content">
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link to={`/products/${product.slug}`} className="cart-item-media" aria-label={product.name}>
                  <ImageWithLoader src={imageUrl(product.main_image)} alt="" loading="lazy"/>
                </Link>
                <div className="cart-item-info">
                  <span>{product.brand || "İlgün Ticaret"} · {product.model}</span>
                  <Link to={`/products/${product.slug}`}><strong>{product.name}</strong></Link>
                  <div className={`cart-line-price${product.price == null ? " is-quote" : ""}`}>
                    <b>{formatPrice(product.price, product.currency)}</b>
                    {product.price != null && quantity > 1 && <small>{quantity} adet · {formatPrice(product.price * quantity, product.currency)}</small>}
                  </div>
                </div>
                <div className="quantity-control" aria-label={`${product.name} adedi`}>
                  <button type="button" onClick={() => updateQuantity(product.id, quantity - 1)} aria-label="Azalt"><Minus strokeWidth={2.5}/></button>
                  <span>{quantity}</span>
                  <button type="button" onClick={() => updateQuantity(product.id, quantity + 1)} aria-label="Artır"><Plus strokeWidth={2.5}/></button>
                </div>
                <button type="button" className="remove-item" onClick={() => removeItem(product.id)} aria-label={`${product.name} sepetten çıkar`}><Trash2 strokeWidth={2}/></button>
              </article>
            ))}
          </div>
        </div>
        <aside className="order-summary">
          <span className="summary-kicker">ÖZET</span>
          <h2>Sipariş özeti</h2>
          <div><span>Ürün adedi</span><strong>{totalItems}</strong></div>
          {knownTotal > 0 && (
            <div className="summary-total">
              <span>{hasUnknownPrices ? "Bilinen tutar" : "Toplam"}</span>
              <strong>{formatPrice(knownTotal)}</strong>
            </div>
          )}
          {hasUnknownPrices && (
            <p>Güncel fiyat WhatsApp üzerinden iletilir. Listede fiyatı yazmayan ürünler için teklif alınır.</p>
          )}
          <a className="button whatsapp" href={orderUrl} target="_blank" rel="noreferrer">
            <MessageCircle size={18}/> WhatsApp’tan sipariş ver
          </a>
          <Link className="continue-shopping" to="/products"><ArrowLeft/> Alışverişe devam et</Link>
        </aside>
      </Reveal>
      <StickyActions className="sticky-cart-actions">
        <a className="button whatsapp" href={orderUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={18}/> Sipariş ver · {totalItems} ürün
        </a>
      </StickyActions>
    </div>
  );
}
