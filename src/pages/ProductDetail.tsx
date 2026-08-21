import { Check, ChevronRight, MessageCircle, PackageCheck, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { useCatalog } from "../context/CatalogContext";
import { formatPrice, imageUrl, site, whatsappUrl } from "../lib/site";

const stockText = { in_stock: "Stokta", low_stock: "Sınırlı stok", out_of_stock: "Stokta yok", contact: "Stok için iletişime geçin" };

export default function ProductDetail() {
  const { slug } = useParams();
  const { products, loading } = useCatalog();
  const product = products.find((p) => p.slug === slug);
  const [selected, setSelected] = useState(0);
  const related = useMemo(() => product ? products.filter((p) => p.id !== product.id && p.category?.slug === product.category?.slug).slice(0, 3) : [], [products, product]);
  if (loading) return <div className="page-shell container">Ürün yükleniyor…</div>;
  if (!product) return <div className="page-shell container empty-state"><h1>Ürün bulunamadı</h1><Link className="button primary" to="/products">Kataloğa dön</Link></div>;
  const images = product.product_images.length ? product.product_images : [{ image_path: product.main_image, alt_text: product.name, sort_order: 0 }];
  const description = product.short_description;
  const jsonLd: Record<string, unknown> = { "@context": "https://schema.org", "@type": "Product", name: product.name, image: images.map((x) => `${site.url}/${x.image_path}`), description, sku: product.model, brand: product.brand ? { "@type": "Brand", name: product.brand } : undefined };
  if (product.price != null) jsonLd.offers = { "@type": "Offer", priceCurrency: product.currency, price: product.price, availability: product.stock_status === "out_of_stock" ? "https://schema.org/OutOfStock" : "https://schema.org/InStock", url: `${site.url}/products/${product.slug}` };
  return <>
    <PageMeta title={`${product.brand ? `${product.brand} ` : ""}${product.model} ${product.name.includes("Blender") ? "800W Blender" : product.name.split(product.model).pop()?.trim() || product.name}`} description={description} canonical={`/products/${product.slug}`} image={product.main_image} />
    <Helmet><script type="application/ld+json">{JSON.stringify(jsonLd)}</script></Helmet>
    <div className="container product-page"><nav className="breadcrumbs" aria-label="Sayfa yolu"><Link to="/">Ana Sayfa</Link><ChevronRight size={14}/><Link to="/products">Ürünler</Link><ChevronRight size={14}/><span>{product.model}</span></nav>
      <div className="detail-grid"><div className="gallery"><div className="main-image"><img src={imageUrl(images[selected]?.image_path || product.main_image)} alt={images[selected]?.alt_text || product.name} width="900" height="900" /></div><div className="thumbnails">{images.map((img, i) => <button key={`${img.image_path}-${i}`} className={selected === i ? "active" : ""} onClick={() => setSelected(i)} aria-label={`${i + 1}. görseli aç`}><img src={imageUrl(img.image_path)} alt="" /></button>)}</div></div>
        <div className="detail-info"><span className="eyebrow">{product.brand || "ÜRÜN"} · {product.model}</span><h1>{product.name}</h1><p className="lead">{product.short_description}</p><div className="price-block"><strong>{formatPrice(product.price, product.currency)}</strong>{product.old_price != null && <del>{formatPrice(product.old_price, product.currency)}</del>}<span className={`stock ${product.stock_status}`}><PackageCheck size={17} /> {stockText[product.stock_status]}</span></div><ul className="quick-features">{product.product_features.slice(0, 5).map((f, i) => <li key={`${f.label}-${i}`}><Check size={17} /><span>{f.label}{f.value ? `: ${f.value}` : ""}</span></li>)}</ul><a className="button whatsapp order-button" href={whatsappUrl(product.name)} target="_blank" rel="noreferrer"><MessageCircle size={21} /> {product.price == null ? "Fiyat Sor ve Sipariş Ver" : "WhatsApp'tan Sipariş Ver"}</a><div className="direct-contact"><ShieldCheck size={19}/><span><strong>{site.contact}</strong> ile doğrudan görüşün · {site.phoneDisplay}</span></div></div></div>
      <section className="description-panel"><div><span className="eyebrow">ÜRÜN HAKKINDA</span><h2>Detaylar</h2><p>{product.description}</p></div><div><h2>Teknik özellikler</h2><dl>{product.product_features.map((f, i) => <div key={`${f.label}-${i}`}><dt>{f.label}</dt><dd>{f.value || "Var"}</dd></div>)}</dl></div></section>
      {related.length > 0 && <section className="related section"><div className="section-head"><h2>Benzer ürünler</h2><Link to={`/products?category=${product.category?.slug}`}>Kategoriyi gör</Link></div><div className="product-grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div></section>}
    </div>
    <div className="mobile-order"><a className="button whatsapp" href={whatsappUrl(product.name)} target="_blank" rel="noreferrer"><MessageCircle size={20}/> WhatsApp'tan Sipariş Ver</a></div>
  </>;
}
