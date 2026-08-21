import { ArrowRight, BadgeCheck, ChevronLeft, ChevronRight, Headphones, HousePlug, MessageCircle, PackageCheck, ShieldCheck, Sparkles, UserRound, Watch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { useCatalog } from "../context/CatalogContext";
import { imageUrl, whatsappUrl } from "../lib/site";

const icons = [Headphones, HousePlug, Sparkles, UserRound, Watch];

export default function Home() {
  const { products, categories, loading, error } = useCatalog();
  const heroProducts = products.slice(0, 5);
  const [heroIndex, setHeroIndex] = useState(0);
  const touchStart = useRef(0);
  const heroProduct = heroProducts[heroIndex % Math.max(heroProducts.length, 1)];
  const showHero = (next: number) => setHeroIndex((next + heroProducts.length) % heroProducts.length);
  useEffect(() => {
    if (heroProducts.length < 2 || (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % heroProducts.length), 3800);
    return () => window.clearInterval(timer);
  }, [heroProducts.length]);
  return <>
    <PageMeta title="İlgün Ticaret | Elektronik & Küçük Ev Aletleri" description="Elektronik aksesuarlar, ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri. WhatsApp üzerinden kolay sipariş." canonical="/" />
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="pill"><Sparkles size={16} /> Günlük yaşam için seçili teknoloji</span><h1>Günlük Hayatı <em>Kolaylaştıran</em> Teknoloji</h1><p>Elektronik aksesuarlar, taşınabilir ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri.</p><div className="hero-actions"><Link className="button primary" to="/products">Ürünleri İncele <ArrowRight size={18} /></Link><a className="button secondary" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp'tan Ulaş</a></div><div className="hero-note"><ShieldCheck size={19} /><span>Ürün bilgisi, stok ve sipariş için WhatsApp üzerinden kolayca iletişime geçin.</span></div></div>{heroProduct && <div className="hero-carousel" onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) showHero(heroIndex + (distance < 0 ? 1 : -1)); }}><div className="hero-visual"><div className="hero-orbit"></div><Link className="hero-product-stage" key={heroProduct.id} to={`/products/${heroProduct.slug}`} aria-label={`${heroProduct.name} ürününü incele`}><img src={imageUrl(heroProduct.main_image)} alt={heroProduct.name} width="720" height="720" /></Link><div className="floating-note"><span>{heroProduct.brand || "İLGÜN SEÇKİSİ"} · {heroProduct.model}</span><strong>{heroProduct.name}</strong></div></div><div className="hero-slider-controls"><button onClick={() => showHero(heroIndex - 1)} aria-label="Önceki ürün"><ChevronLeft/></button><div>{heroProducts.map((product, index) => <button key={product.id} className={index === heroIndex ? "active" : ""} onClick={() => showHero(index)} aria-label={`${index + 1}. ürünü göster`}/>)}</div><button onClick={() => showHero(heroIndex + 1)} aria-label="Sonraki ürün"><ChevronRight/></button></div></div>}</div></section>

    <div className="service-strip"><div className="container"><div><BadgeCheck/><span><strong>Doğrulanmış modeller</strong><small>Exact ürün kodlarıyla katalog</small></span></div><div><PackageCheck/><span><strong>Kolay sepet</strong><small>Ürünleri tek listede toplayın</small></span></div><div><MessageCircle/><span><strong>Hızlı iletişim</strong><small>WhatsApp üzerinden sipariş</small></span></div></div></div>

    <section className="showcase-stats container" aria-label="Katalog özeti"><div><strong>{products.length}</strong><span>Seçili ürün</span></div><div><strong>{categories.length}</strong><span>Ürün kategorisi</span></div><div><strong>1 adım</strong><span>WhatsApp siparişi</span></div><div><strong>Isparta</strong><span>Hizmet bölgesi</span></div></section>

    <section id="categories" className="section container"><div className="section-head"><div><span className="eyebrow">KATEGORİLER</span><h2>Aradığınız ürüne hızlıca ulaşın</h2></div><Link to="/categories">Tüm kategoriler <ArrowRight size={17} /></Link></div><div className="category-grid">{categories.map((item, i) => { const Icon = icons[i] || Sparkles; const count = products.filter((product) => product.category_id === item.id || product.category?.slug === item.slug).length; return <Link to={`/products/category/${item.slug}`} className="category-card" key={item.id}><span className="category-icon"><Icon /></span><strong>{item.name}</strong><small>{item.description}</small><span className="category-count">{count ? `${count} ürün` : "Yakında"}</span><ArrowRight className="category-arrow" size={18} /></Link>; })}</div></section>

    <section className="section section-muted"><div className="container"><div className="section-head"><div><span className="eyebrow">SEÇKİ</span><h2>Öne çıkan ürünler</h2></div><Link to="/products">Kataloğu Gör <ArrowRight size={17} /></Link></div>{error && <div className="notice">{error}</div>}{loading ? <div className="loading-grid">Ürünler yükleniyor…</div> : <div className="product-grid home-featured-grid">{products.filter((p) => p.featured).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>}<p className="price-disclaimer">Fiyatlar 21 Ağustos 2026 tarihinde doğrulanan referans satış fiyatlarıdır. Güncel fiyat ve stok sipariş öncesinde WhatsApp üzerinden teyit edilir.</p></div></section>

  </>;
}
