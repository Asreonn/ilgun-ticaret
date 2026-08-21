import { Check, ChevronRight, MessageCircle, PackageCheck, ShoppingBag, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { useCatalog } from "../context/CatalogContext";
import { formatPrice, imageUrl, site, whatsappUrl } from "../lib/site";
import { useCart } from "../context/CartContext";
import { ProductReviews } from "../components/ProductReviews";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { ProductSlider } from "../components/ProductSlider";
import { StickyActions } from "../components/StickyActions";

const stockText = { in_stock: "Stokta", low_stock: "Sınırlı stok", out_of_stock: "Stokta yok", contact: "Stok için iletişime geçin" };

export default function ProductDetail() {
  const { slug } = useParams();
  const { products, loading } = useCatalog();
  const { addItem } = useCart();
  const product = products.find((p) => p.slug === slug);
  const [selected, setSelected] = useState(0);
  const [added, setAdded] = useState(false);
  const related = useMemo(() => product ? products.filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug).slice(0, 3) : [], [products, product]);
  if (loading) return <div className="page-shell container">Ürün yükleniyor…</div>;
  if (!product) return <div className="page-shell container empty-state"><h1>Ürün bulunamadı</h1><Link className="button primary" to="/products">Kataloğa dön</Link></div>;
  const images = product.product_images.length ? product.product_images : [{ image_path: product.main_image, alt_text: product.name, sort_order: 0 }];
  const description = product.short_description;
  const addToCart = () => { addItem(product); setAdded(true); };
  const orderLabel = product.price == null ? "Teklif al" : "Sipariş ver";
  const jsonLd: Record<string, unknown> = { "@context": "https://schema.org", "@type": "Product", name: product.name, image: images.map((x) => `${site.url}/${x.image_path}`), description, sku: product.model, brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined };
  if (product.price != null) jsonLd.offers = { "@type": "Offer", priceCurrency: product.currency, price: product.price, availability: product.stock_status === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", url: `${site.url}/products/${product.slug}` };
  return <>
    <PageMeta title={`${product.brand ? `${product.brand} ` : ""}${product.model} ${product.name.includes("Blender") ? "800W Blender" : product.name.split(product.model).pop()?.trim() || product.name}`} description={description} canonical={`/products/${product.slug}`} image={product.main_image} />
    <Helmet><script type="application/ld+json">{JSON.stringify(jsonLd)}</script></Helmet>
    <div className="container product-page">
      <nav className="breadcrumbs" aria-label="Sayfa yolu"><Link to="/">Ana Sayfa</Link><ChevronRight size={14}/><Link to="/products">Ürünler</Link><ChevronRight size={14}/><span>{product.model}</span></nav>
      <div className="detail-grid">
        <div className="gallery">
          <ProductSlider className="gallery-slider" items={images} getKey={(img) => img.image_path} index={selected} onIndexChange={setSelected} previousLabel="Önceki görsel" nextLabel="Sonraki görsel" dotLabel={(index) => `${index + 1}. görseli aç`} renderSlide={(img) => <div className="main-image"><ImageWithLoader src={imageUrl(img.image_path || product.main_image)} alt={img.alt_text || product.name} width="900" height="900" loading="eager" /></div>} />
          <div className="thumbnails">{images.map((img, i) => <button key={`${img.image_path}-${i}`} className={selected === i ? "active" : ""} onClick={() => setSelected(i)} aria-label={`${i + 1}. görseli aç`}><ImageWithLoader src={imageUrl(img.image_path)} alt="" loading="lazy" /></button>)}</div>
        </div>
        <div className="detail-info">
          <span className="eyebrow">{product.brand || "ÜRÜN"} · {product.model}</span>
          <h1>{product.name}</h1>
          <a className="detail-rating" href="#reviews">
            <span className="rating-stars" aria-hidden="true">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className={index < Math.round(product.rating_average || 0) ? "filled" : ""}/>)}</span>
            <strong>{product.review_count ? product.rating_average?.toFixed(1) : "Henüz puanlanmadı"}</strong>
            <span>{product.review_count || 0} değerlendirme</span>
          </a>
          <p className="lead">{product.short_description}</p>
          <div className="price-block">
            <strong>{formatPrice(product.price, product.currency)}</strong>
            {product.old_price != null && <del>{formatPrice(product.old_price, product.currency)}</del>}
            <span className={`stock ${product.stock_status}`}><PackageCheck size={17} /> {stockText[product.stock_status]}</span>
          </div>
        </div>
      </div>
      <section className="description-panel">
        <div>
          <h2>Detaylar</h2>
          <p>{product.description}</p>
        </div>
        <dl>
          {product.product_features.map((feature, index) => (
            <div key={`${feature.label}-${index}`}>
              <dt>{feature.label}</dt>
              <dd>{feature.value || "Var"}</dd>
            </div>
          ))}
        </dl>
      </section>
      <ProductReviews productId={product.id} productSlug={product.slug}/>
      {related.length > 0 && <section className="related section"><div className="section-head"><h2>Benzer ürünler</h2><Link to={`/products/category/${product.category?.slug}`}>Kategoriyi gör</Link></div><div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
    </div>
    <StickyActions className="sticky-product-actions">
      <button className={`button primary ${added ? "added" : ""}`} onClick={addToCart}>{added ? <Check size={18}/> : <ShoppingBag size={18}/>} {added ? "Eklendi" : "Sepete ekle"}</button>
      <a className="button whatsapp" href={whatsappUrl(product.name)} target="_blank" rel="noreferrer"><MessageCircle size={18}/> {orderLabel}</a>
    </StickyActions>
  </>;
}
