import { ArrowUpRight, Check, ShoppingBag, Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../lib/site";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ImageWithLoader } from "./ImageWithLoader";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<number>();
  useEffect(() => () => window.clearTimeout(timer.current), []);
  const addToCart = () => {
    addItem(product);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };
  const discount = product.price != null && product.old_price != null && product.old_price > product.price
    ? Math.round((1 - product.price / product.old_price) * 100)
    : 0;
  return <article className="product-card">
    <Link to={`/products/${product.slug}`} className="product-image-wrap" aria-label={`${product.name} ürününü incele`}>
      <ImageWithLoader src={imageUrl(product.main_image)} alt={product.name} loading="lazy" width="640" height="640" />
      {product.featured && <span className="featured-badge">Öne Çıkan</span>}
      {discount > 0 && <span className="discount-badge">%{discount} avantaj</span>}
    </Link>
    <div className="product-card-body"><span className="eyebrow">{product.brand || "İlgün Seçkisi"} · {product.model}</span><h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3><Link className="product-rating" to={`/products/${product.slug}#reviews`} aria-label={`${product.review_count || 0} ürün yorumu`}><Star className={product.review_count ? "filled" : ""}/><strong>{product.review_count ? product.rating_average?.toFixed(1) : "Yeni"}</strong><span>({product.review_count || 0} yorum)</span></Link><div className="product-card-footer"><div className={`card-price ${product.price == null ? "quote" : ""}`}><strong>{formatPrice(product.price, product.currency)}</strong>{product.price == null && <small>WhatsApp'tan hızlıca öğrenin</small>}{product.old_price != null && <del>{formatPrice(product.old_price, product.currency)}</del>}</div><div className="card-actions"><button className={`card-cart ${added ? "added" : ""}`} type="button" onClick={addToCart} aria-label={`${product.name} sepete ekle`}>{added ? <Check size={16}/> : <ShoppingBag size={16}/>}<span>{added ? "Eklendi" : "Sepete Ekle"}</span></button><Link className="card-link" to={`/products/${product.slug}`}>İncele <ArrowUpRight size={16} /></Link></div></div></div>
  </article>;
}
