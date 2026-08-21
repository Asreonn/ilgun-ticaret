import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../lib/site";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return <article className="product-card">
    <Link to={`/products/${product.slug}`} className="product-image-wrap" aria-label={`${product.name} ürününü incele`}>
      <img src={imageUrl(product.main_image)} alt={product.name} loading="lazy" width="640" height="640" onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}placeholder.svg`; }} />
      {product.featured && <span className="featured-badge">Öne Çıkan</span>}
    </Link>
    <div className="product-card-body"><span className="eyebrow">{product.brand || "İlgün Seçkisi"} · {product.model}</span><h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3><p>{product.short_description}</p><div className="product-card-footer"><strong>{formatPrice(product.price, product.currency)}</strong><div className="card-actions"><button className="card-cart" type="button" onClick={() => addItem(product)} aria-label={`${product.name} sepete ekle`}><ShoppingBag size={16}/><span>Sepete Ekle</span></button><Link className="card-link" to={`/products/${product.slug}`}>İncele <ArrowUpRight size={16} /></Link></div></div></div>
  </article>;
}
