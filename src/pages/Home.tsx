import { ArrowRight, ChevronLeft, ChevronRight, Headphones, HousePlug, MessageCircle, Sparkles, UserRound, Watch } from "lucide-react";
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
  const [heroPaused, setHeroPaused] = useState(false);
  const touchStart = useRef(0);
  const heroProduct = heroProducts[heroIndex % Math.max(heroProducts.length, 1)];
  const showHero = (next: number) => setHeroIndex((next + heroProducts.length) % heroProducts.length);
  useEffect(() => {
    if (heroProducts.length < 2 || heroPaused || (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const timer = window.setTimeout(() => setHeroIndex((current) => (current + 1) % heroProducts.length), 4200);
    return () => window.clearTimeout(timer);
  }, [heroIndex, heroPaused, heroProducts.length]);
  return <>
    <PageMeta title="İlgün Ticaret | Elektronik & Küçük Ev Aletleri" description="Elektronik aksesuarlar, ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri. WhatsApp üzerinden kolay sipariş." canonical="/" />
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="pill"><Sparkles size={16} /> Seçili teknoloji ürünleri</span><h1>Teknoloji <em>seçkisini</em> keşfedin</h1><p>Ses, aksesuar, kişisel bakım ve küçük ev aletleri.</p><div className="hero-actions"><Link className="button primary" to="/products">Ürünleri İncele <ArrowRight size={18} /></Link><a className="button secondary" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp</a></div></div>{heroProduct && <div className={`hero-carousel ${heroPaused ? "paused" : ""}`} onMouseEnter={() => setHeroPaused(true)} onMouseLeave={() => setHeroPaused(false)} onFocusCapture={() => setHeroPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false); }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }} onTouchEnd={(event) => { const distance = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(distance) > 45) showHero(heroIndex + (distance < 0 ? 1 : -1)); }}><div className="hero-visual"><div className="hero-orbit"></div><Link className="hero-product-stage" key={heroProduct.id} to={`/products/${heroProduct.slug}`} aria-label={`${heroProduct.name} ürününü incele`}><img src={imageUrl(heroProduct.main_image)} alt={heroProduct.name} width="720" height="720" /></Link><div className="floating-note" key={`note-${heroProduct.id}`} aria-live="polite"><span>{heroProduct.brand || "İLGÜN SEÇKİSİ"} · {heroProduct.model}</span><strong>{heroProduct.name}</strong></div></div><div className="hero-slider-controls"><button onClick={() => showHero(heroIndex - 1)} aria-label="Önceki ürün"><ChevronLeft/></button><div>{heroProducts.map((product, index) => <button key={product.id} className={index === heroIndex ? "active" : ""} onClick={() => showHero(index)} aria-label={`${index + 1}. ürünü göster`}/>)}</div><button onClick={() => showHero(heroIndex + 1)} aria-label="Sonraki ürün"><ChevronRight/></button></div></div>}</div></section>

    <section id="categories" className="section container"><div className="section-head"><div><span className="eyebrow">KATEGORİLER</span><h2>Ürünü kategorisine göre bul</h2></div><Link to="/categories">Tümü <ArrowRight size={17} /></Link></div><div className="category-grid">{categories.map((item, i) => { const Icon = icons[i] || Sparkles; const count = products.filter((product) => product.category_id === item.id || product.category?.slug === item.slug).length; return <Link to={`/products/category/${item.slug}`} className="category-card" key={item.id}><span className="category-icon"><Icon /></span><strong>{item.name}</strong><span className="category-count">{count ? `${count} ürün` : "Yakında"}</span><ArrowRight className="category-arrow" size={18} /></Link>; })}</div></section>

    <section className="section section-muted"><div className="container"><div className="section-head"><div><span className="eyebrow">ÖNE ÇIKANLAR</span><h2>Popüler ürünler</h2></div><Link to="/products">Tüm ürünler <ArrowRight size={17} /></Link></div>{error && <div className="notice">{error}</div>}{loading ? <div className="loading-grid">Ürünler yükleniyor…</div> : <div className="product-grid home-featured-grid">{products.filter((p) => p.featured).slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}</div>}</div></section>

  </>;
}
