import { ArrowRight, Headphones, HousePlug, Sparkles, UserRound, Watch } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { useCatalog } from "../context/CatalogContext";

const icons = [Headphones, HousePlug, Sparkles, UserRound, Watch];

export default function Categories() {
  const { categories, products, loading } = useCatalog();
  return <main className="page-shell container categories-page">
    <PageMeta title="Kategoriler" description="İlgün Ticaret elektronik, ses, küçük ev aletleri, kişisel bakım ve aksesuar kategorileri." canonical="/categories"/>
    <div className="page-heading"><span className="eyebrow">KATEGORİLER</span><h1>Teknoloji seçkinizi keşfedin</h1><p>Ürünleri kullanım alanına göre inceleyin. Kataloğa eklenen yeni ürünler ilgili kategoride otomatik görünür.</p></div>
    {loading ? <div className="loading-grid">Kategoriler yükleniyor…</div> : <div className="categories-list">{categories.map((category, index) => {
      const Icon = icons[index] || Sparkles;
      const count = products.filter((product) => product.category_id === category.id || product.category?.slug === category.slug).length;
      return <Link to={`/products/category/${category.slug}`} key={category.id} className="category-row"><span className="category-icon"><Icon/></span><div><strong>{category.name}</strong><p>{category.description}</p></div><span className={`category-total ${count ? "" : "empty"}`}>{count ? `${count} ürün` : "Yakında"}</span><ArrowRight/></Link>;
    })}</div>}
  </main>;
}
