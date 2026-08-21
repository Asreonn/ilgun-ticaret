import {
  ArrowRight,
  BadgeCheck,
  ChevronLeft,
  ChevronRight,
  Headphones,
  HousePlug,
  MessageCircle,
  PackageCheck,
  Sparkles,
  Star,
  UserRound,
  Watch,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { Reveal } from "../components/Reveal";
import { useCatalog } from "../context/CatalogContext";
import { featuredStoreReviews } from "../data/reviews";
import { imageUrl, whatsappUrl } from "../lib/site";

const icons = [Headphones, HousePlug, Sparkles, UserRound, Watch];

export default function Home() {
  const { products, categories, loading, error } = useCatalog();
  const heroProducts = products.slice(0, 5);
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroDirection, setHeroDirection] = useState<"next" | "previous">(
    "next",
  );
  const [previousHeroIndex, setPreviousHeroIndex] = useState<number | null>(
    null,
  );
  const touchStart = useRef(0);
  const heroProduct =
    heroProducts[heroIndex % Math.max(heroProducts.length, 1)];
  const showHero = (next: number) => {
    const normalized = (next + heroProducts.length) % heroProducts.length;
    if (normalized === heroIndex) return;
    setPreviousHeroIndex(heroIndex);
    setHeroDirection(next < heroIndex ? "previous" : "next");
    setHeroIndex(normalized);
  };
  useEffect(() => {
    if (
      heroProducts.length < 2 ||
      heroPaused ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    )
      return;
    const timer = window.setTimeout(() => {
      setPreviousHeroIndex(heroIndex);
      setHeroDirection("next");
      setHeroIndex((current) => (current + 1) % heroProducts.length);
    }, 4600);
    return () => window.clearTimeout(timer);
  }, [heroIndex, heroPaused, heroProducts.length]);
  return (
    <>
      <PageMeta
        title="İlgün Ticaret | Elektronik & Küçük Ev Aletleri"
        description="Elektronik aksesuarlar, ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri. WhatsApp üzerinden kolay sipariş."
        canonical="/"
      />
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="pill">
              <Sparkles size={16} /> Seçili teknoloji ürünleri
            </span>
            <h1>
              Teknoloji <em>seçkisini</em> keşfedin
            </h1>
            <p>Ses, aksesuar, kişisel bakım ve küçük ev aletleri.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/products">
                Ürünleri İncele <ArrowRight size={18} />
              </Link>
              <a
                className="button secondary"
                href={whatsappUrl()}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
          {heroProduct && (
            <div
              className={`hero-carousel ${heroPaused ? "paused" : ""}`}
              data-direction={heroDirection}
              onMouseEnter={() => setHeroPaused(true)}
              onMouseLeave={() => setHeroPaused(false)}
              onFocusCapture={() => setHeroPaused(true)}
              onBlurCapture={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget))
                  setHeroPaused(false);
              }}
              onTouchStart={(event) => {
                touchStart.current = event.touches[0].clientX;
              }}
              onTouchEnd={(event) => {
                const distance =
                  event.changedTouches[0].clientX - touchStart.current;
                if (Math.abs(distance) > 45)
                  showHero(heroIndex + (distance < 0 ? 1 : -1));
              }}
            >
              <div className="hero-visual">
                <div className="hero-orbit"></div>
                <span
                  className="hero-transition-glow"
                  key={`glow-${heroProduct.id}`}
                  aria-hidden="true"
                />
                {heroProducts.map((product, index) => (
                  <Link
                    className={`hero-product-stage hero-product-slide ${index === heroIndex ? "is-active" : ""} ${index === previousHeroIndex ? "is-exit" : ""}`}
                    key={product.id}
                    to={`/products/${product.slug}`}
                    tabIndex={index === heroIndex ? 0 : -1}
                    aria-hidden={index !== heroIndex}
                    aria-label={
                      index === heroIndex
                        ? `${product.name} ürününü incele`
                        : undefined
                    }
                  >
                    <ImageWithLoader
                      src={imageUrl(product.main_image)}
                      alt={index === heroIndex ? product.name : ""}
                      width="720"
                      height="720"
                      loading="eager"
                      decoding="async"
                    />
                  </Link>
                ))}
                <div
                  className="floating-note"
                  key={`note-${heroProduct.id}`}
                  aria-live="polite"
                >
                  <span>
                    {heroProduct.brand || "İLGÜN SEÇKİSİ"} · {heroProduct.model}
                  </span>
                  <strong>{heroProduct.name}</strong>
                </div>
              </div>
              <div className="hero-slider-controls">
                <button
                  onClick={() => showHero(heroIndex - 1)}
                  aria-label="Önceki ürün"
                >
                  <ChevronLeft />
                </button>
                <div>
                  {heroProducts.map((product, index) => (
                    <button
                      key={product.id}
                      className={index === heroIndex ? "active" : ""}
                      onClick={() => showHero(index)}
                      aria-label={`${index + 1}. ürünü göster`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => showHero(heroIndex + 1)}
                  aria-label="Sonraki ürün"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Reveal as="div" className="service-strip" direction="up">
        <div className="container">
          <div><BadgeCheck /><span><strong>Seçili modeller</strong><small>Güncel katalog</small></span></div>
          <div><PackageCheck /><span><strong>Kolay sepet</strong><small>Tek listede toplayın</small></span></div>
          <div><MessageCircle /><span><strong>Hızlı iletişim</strong><small>WhatsApp üzerinden sipariş</small></span></div>
        </div>
      </Reveal>

      <Reveal as="section" id="categories" className="section container" direction="left">
        <div className="section-head">
          <div>
            <span className="eyebrow">KATEGORİLER</span>
            <h2>Ürünü kategorisine göre bul</h2>
          </div>
          <Link to="/categories">
            Tümü <ArrowRight size={17} />
          </Link>
        </div>
        <div className="category-grid reveal-stagger">
          {categories.map((item, i) => {
            const Icon = icons[i] || Sparkles;
            const count = products.filter(
              (product) =>
                product.category_id === item.id ||
                product.category?.slug === item.slug,
            ).length;
            return (
              <Link
                to={`/products/category/${item.slug}`}
                className="category-card"
                key={item.id}
              >
                <span className="category-icon">
                  <Icon />
                </span>
                <strong>{item.name}</strong>
                <span className="category-count">
                  {count ? `${count} ürün` : "Yakında"}
                </span>
                <ArrowRight className="category-arrow" size={18} />
              </Link>
            );
          })}
        </div>
      </Reveal>

      <Reveal as="section" className="section section-muted" direction="right">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">ÖNE ÇIKANLAR</span>
              <h2>Popüler ürünler</h2>
            </div>
            <Link to="/products">
              Tüm ürünler <ArrowRight size={17} />
            </Link>
          </div>
          {error && <div className="notice">{error}</div>}
          {loading ? (
            <div className="loading-grid">Ürünler yükleniyor…</div>
          ) : (
            <div className="product-grid home-featured-grid reveal-stagger">
              {products
                .filter((p) => p.featured)
                .slice(0, 4)
                .map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
            </div>
          )}
        </div>
      </Reveal>

      <Reveal as="section" className="section container" direction="up">
        <div className="section-head">
          <div>
            <span className="eyebrow">YORUMLAR</span>
            <h2>Müşteriler ne diyor</h2>
          </div>
          <Link to="/products">
            Ürünleri gör <ArrowRight size={17} />
          </Link>
        </div>
        <div className="testimonial-grid reveal-stagger">
          {featuredStoreReviews.map((review) => (
            <Link to={`/products/${review.productSlug}#reviews`} className="testimonial-card" key={review.id}>
              <div className="review-stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className={index < review.rating ? "filled" : ""} />
                ))}
              </div>
              <p>“{review.comment}”</p>
              <div>
                <strong>{review.reviewer_name}</strong>
                <span>{review.productName}</span>
              </div>
            </Link>
          ))}
        </div>
      </Reveal>
    </>
  );
}
