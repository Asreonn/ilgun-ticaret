import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Coffee,
  Glasses,
  Headphones,
  HousePlug,
  MessageCircle,
  MonitorPlay,
  PackageCheck,
  Shield,
  Sofa,
  Sparkles,
  Star,
  UserRound,
  Watch,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { ImageWithLoader } from "../components/ImageWithLoader";
import { ProductSlider } from "../components/ProductSlider";
import { useCatalog } from "../context/CatalogContext";
import { featuredStoreReviews } from "../data/reviews";
import { formatPrice, imageUrl, whatsappUrl } from "../lib/site";

const icons = [Headphones, HousePlug, Sparkles, UserRound, Watch, Coffee, Sofa, CarFront, Shield, Glasses, MonitorPlay];

export default function Home() {
  const { products, categories, loading, error } = useCatalog();
  const heroProducts = products.slice(0, 5);
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return (
    <>
      <PageMeta
        title="İlgün Ticaret | Elektronik & Küçük Ev Aletleri"
        description="Elektronik aksesuarlar, ses sistemleri, kişisel bakım ürünleri ve küçük ev aletleri. WhatsApp üzerinden kolay sipariş."
        canonical="/"
      />
      <section className="hero hero-modern">
        <div className="container hero-modern-grid">
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
              <a className="button secondary" href={whatsappUrl()} target="_blank" rel="noreferrer">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>
          </div>
          <ProductSlider
            className="hero-showcase"
            items={heroProducts}
            getKey={(product) => product.id}
            autoPlayMs={7000}
            renderSlide={(product) => {
              const discount = product.price != null && product.old_price != null && product.old_price > product.price
                ? Math.round((1 - product.price / product.old_price) * 100)
                : 0;
              return (
                <Link className="hero-product-slide hero-showcase-card" to={`/products/${product.slug}`}>
                  <span className="hero-showcase-media">
                    <ImageWithLoader
                      src={imageUrl(product.main_image)}
                      alt={product.name}
                      width="720"
                      height="720"
                      loading="eager"
                      decoding="async"
                    />
                  </span>
                  <span className="hero-showcase-meta">
                    <small>{product.brand || "İLGÜN SEÇKİSİ"} · {product.model}</small>
                    <strong>{product.name}</strong>
                    <b>
                      {formatPrice(product.price, product.currency)}
                      {discount > 0 && <em>%{discount}</em>}
                    </b>
                  </span>
                </Link>
              );
            }}
          />
        </div>
      </section>

      <div className="service-strip">
        <div className="container">
          <div><BadgeCheck /><span><strong>Seçili modeller</strong><small>Güncel katalog</small></span></div>
          <div><PackageCheck /><span><strong>Kolay sepet</strong><small>Tek listede toplayın</small></span></div>
          <div><MessageCircle /><span><strong>Hızlı iletişim</strong><small>WhatsApp üzerinden sipariş</small></span></div>
        </div>
      </div>

      <section id="categories" className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">KATEGORİLER</span>
            <h2>Ürünü kategorisine göre bul</h2>
          </div>
          <Link to="/categories">Tümü <ArrowRight size={17} /></Link>
        </div>
        <div className="category-grid">
          {categories.map((item, i) => {
            const Icon = icons[i] || Sparkles;
            const count = products.filter((product) => product.category_id === item.id || product.category?.slug === item.slug).length;
            return (
              <Link to={`/products/category/${item.slug}`} className="category-card" key={item.id}>
                <span className="category-icon"><Icon /></span>
                <strong>{item.name}</strong>
                <span className="category-count">{count ? `${count} ürün` : "Yakında"}</span>
                <ArrowRight className="category-arrow" size={18} />
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">ÖNE ÇIKANLAR</span>
              <h2>Popüler ürünler</h2>
            </div>
            <Link to="/products">Tüm ürünler <ArrowRight size={17} /></Link>
          </div>
          {error && <div className="notice">{error}</div>}
          {loading ? (
            <div className="loading-grid">Ürünler yükleniyor…</div>
          ) : (
            <div className="product-grid home-featured-grid">
              {featured.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          )}
        </div>
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <span className="eyebrow">YORUMLAR</span>
            <h2>Müşteriler ne diyor</h2>
          </div>
          <Link to="/products">Ürünleri gör <ArrowRight size={17} /></Link>
        </div>
        <div className="testimonial-grid">
          {featuredStoreReviews.map((review) => (
            <Link to={`/products/${review.productSlug}#reviews`} className="testimonial-card" key={review.id}>
              <div className="review-stars" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star key={starIndex} className={starIndex < review.rating ? "filled" : ""} />
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
      </section>
    </>
  );
}
