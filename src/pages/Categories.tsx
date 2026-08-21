import { ArrowRight, Headphones, HousePlug, Sparkles, UserRound, Watch } from "lucide-react";
import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { Reveal } from "../components/Reveal";
import { useCatalog } from "../context/CatalogContext";

const icons = [Headphones, HousePlug, Sparkles, UserRound, Watch];

export default function Categories() {
  const { categories, products, loading } = useCatalog();
  return <main className="page-shell container categories-page">
    <PageMeta title="Kategoriler" description="İlgün Ticaret elektronik, ses, küçük ev aletleri, kişisel bakım ve aksesuar kategorileri." canonical="/categories"/>
    <Reveal className="page-heading" direction="left"><span className="eyebrow">KATEGORİLER</span><h1>Ürün kategorileri</h1></Reveal>
    {loading ? <div className="loading-grid">Kategoriler yükleniyor…</div> : <Reveal className="categories-list reveal-stagger" direction="up">{categories.map((category, index) => {
      const Icon = icons[index] || Sparkles;
      const count = products.filter((product) => product.category_id === category.id || product.category?.slug === category.slug).length;
      return <Link to={`/products/category/${category.slug}`} key={category.id} className="category-row"><span className="category-icon"><Icon/></span><div><strong>{category.name}</strong></div><span className={`category-total ${count ? "" : "empty"}`}>{count ? `${count} ürün` : "Yakında"}</span><ArrowRight/></Link>;
    })}</Reveal>}
  </main>;
}
