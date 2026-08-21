import { ArrowRight, BadgeCheck, Headphones, HousePlug, MessageCircle, PackageCheck, ShieldCheck, Sparkles, UserRound, Watch } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { useCatalog } from "../context/CatalogContext";
import { imageUrl, whatsappUrl } from "../lib/site";

const icons = [Headphones, HousePlug, Sparkles, UserRound, Watch];

export default function Home() {
  const { products, categories, loading, error } = useCatalog();
  return <>
    <PageMeta title="İlgün Ticaret | Elektronik & Küçük Ev Aletleri" description="Elektronik aksesuarlar, ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri. WhatsApp üzerinden kolay sipariş." canonical="/" />
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="pill"><Sparkles size={16} /> Günlük yaşam için seçili teknoloji</span><h1>Günlük Hayatı <em>Kolaylaştıran</em> Teknoloji</h1><p>Elektronik aksesuarlar, taşınabilir ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri.</p><div className="hero-actions"><Link className="button primary" to="/products">Ürünleri İncele <ArrowRight size={18} /></Link><a className="button secondary" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp'tan Ulaş</a></div><div className="hero-note"><ShieldCheck size={19} /><span>Ürün bilgisi, stok ve sipariş için WhatsApp üzerinden kolayca iletişime geçin.</span></div></div><div className="hero-visual"><div className="hero-orbit"></div><img src={imageUrl("images/products/yesido-ec27/main.webp")} alt="YESIDO EC27 blender" width="720" height="720" /><div className="floating-note"><span>Yeni seçki</span><strong>Pratik • Modern • Ulaşılabilir</strong></div></div></div></section>

    <div className="service-strip"><div className="container"><div><BadgeCheck/><span><strong>Doğrulanmış modeller</strong><small>Exact ürün kodlarıyla katalog</small></span></div><div><PackageCheck/><span><strong>Kolay sepet</strong><small>Ürünleri tek listede toplayın</small></span></div><div><MessageCircle/><span><strong>Hızlı iletişim</strong><small>WhatsApp üzerinden sipariş</small></span></div></div></div>

    <section id="categories" className="section container"><div className="section-head"><div><span className="eyebrow">KATEGORİLER</span><h2>Aradığınız ürüne hızlıca ulaşın</h2></div><Link to="/products">Tüm ürünler <ArrowRight size={17} /></Link></div><div className="category-grid">{categories.map((item, i) => { const Icon = icons[i] || Sparkles; return <Link to={`/products?category=${item.slug}`} className="category-card" key={item.id}><span className="category-icon"><Icon /></span><strong>{item.name}</strong><small>{item.description}</small><ArrowRight className="category-arrow" size={18} /></Link>; })}</div></section>

    <section className="section section-muted"><div className="container"><div className="section-head"><div><span className="eyebrow">SEÇKİ</span><h2>Öne çıkan ürünler</h2></div><Link to="/products">Kataloğu Gör <ArrowRight size={17} /></Link></div>{error && <div className="notice">{error}</div>}{loading ? <div className="loading-grid">Ürünler yükleniyor…</div> : <div className="product-grid">{products.filter((p) => p.featured).map((p) => <ProductCard key={p.id} product={p} />)}</div>}<p className="price-disclaimer">Fiyatlar 21 Ağustos 2026 tarihinde doğrulanan referans satış fiyatlarıdır. Güncel fiyat ve stok sipariş öncesinde WhatsApp üzerinden teyit edilir.</p></div></section>

  </>;
}
