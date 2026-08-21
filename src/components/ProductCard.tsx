import { ArrowUpRight, Check, ShoppingBag, Star } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Link } from "react-router-dom";
import { formatPrice, imageUrl } from "../lib/site";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ImageWithLoader } from "./ImageWithLoader";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const timer = useRef<number>();
  const cardRef = useRef<HTMLElement>(null);
  const images = (product.product_images.length ? product.product_images : [{ image_path: product.main_image, alt_text: product.name, sort_order: 0 }]).slice(0, 4);
  useEffect(() => () => window.clearTimeout(timer.current), []);
  useEffect(() => {
    const node = cardRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.45 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (images.length < 2 || hovered) return;
    if (!inView && typeof IntersectionObserver !== "undefined") return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cycle = window.setTimeout(() => setImageIndex((current) => (current + 1) % images.length), 3200);
    return () => window.clearTimeout(cycle);
  }, [hovered, imageIndex, images.length, inView]);
  const addToCart = () => {
    addItem(product);
    setAdded(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setAdded(false), 1600);
  };
  const discount = product.price != null && product.old_price != null && product.old_price > product.price
    ? Math.round((1 - product.price / product.old_price) * 100)
    : 0;
  const rounded = Math.round(product.rating_average || 0);
  return (
    <article
      className="product-card"
      ref={cardRef}
      onMouseEnter={() => { setHovered(true); if (images.length > 1) setImageIndex(1); }}
      onMouseLeave={() => { setHovered(false); setImageIndex(0); }}
    >
      <Link to={`/products/${product.slug}`} className="product-image-wrap" aria-label={`${product.name} ürününü incele`}>
        <span className="product-image-track" style={{ "--image-index": String(imageIndex) } as CSSProperties}>
          {images.map((image, index) => (
            <ImageWithLoader
              key={`${image.image_path}-${index}`}
              src={imageUrl(image.image_path)}
              alt={index === imageIndex ? product.name : ""}
              loading="lazy"
              width="640"
              height="640"
            />
          ))}
        </span>
        {product.featured && <span className="featured-badge">Öne Çıkan</span>}
        {discount > 0 && <span className="discount-badge">%{discount} avantaj</span>}
        {images.length > 1 && (
          <span className="product-image-dots" aria-hidden="true">
            {images.map((image, index) => <i key={`${image.image_path}-dot`} className={index === imageIndex ? "active" : ""} />)}
          </span>
        )}
      </Link>
      <div className="product-card-body">
        <span className="eyebrow">{product.brand || "İlgün Seçkisi"} · {product.model}</span>
        <h3><Link to={`/products/${product.slug}`}>{product.name}</Link></h3>
        <Link className="product-rating" to={`/products/${product.slug}#reviews`} aria-label={`${product.review_count || 0} ürün yorumu`}>
          <span className="rating-stars" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => <Star key={index} className={index < rounded ? "filled" : ""} />)}
          </span>
          <strong>{product.review_count ? product.rating_average?.toFixed(1) : "Yeni"}</strong>
          <span>({product.review_count || 0} yorum)</span>
        </Link>
        <div className="product-card-footer">
          <div className={`card-price ${product.price == null ? "quote" : ""}`}>
            <strong>{formatPrice(product.price, product.currency)}</strong>
            {product.price == null && <small>WhatsApp'tan hızlıca öğrenin</small>}
            {product.old_price != null && <del>{formatPrice(product.old_price, product.currency)}</del>}
          </div>
          <div className="card-actions">
            <button className={`card-cart ${added ? "added" : ""}`} type="button" onClick={addToCart} aria-label={`${product.name} sepete ekle`}>
              {added ? <Check size={16} /> : <ShoppingBag size={16} />}
              <span>{added ? "Eklendi" : "Sepete Ekle"}</span>
            </button>
            <Link className="card-link" to={`/products/${product.slug}`}>İncele <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </div>
    </article>
  );
}
