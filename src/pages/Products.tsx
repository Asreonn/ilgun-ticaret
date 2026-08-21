import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { Reveal } from "../components/Reveal";
import { useCatalog } from "../context/CatalogContext";

export default function Products() {
  const { products, categories, loading, error } = useCatalog();
  const [params, setParams] = useSearchParams();
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState(params.get("q") || "");
  const selected = categorySlug || params.get("category") || "all";
  const filtered = useMemo(() => {
    const term = search.toLocaleLowerCase("tr-TR").trim();
    return products.filter((p) => (selected === "all" || p.category?.slug === selected) && (!term || [p.name, p.brand, p.model].join(" ").toLocaleLowerCase("tr-TR").includes(term)));
  }, [products, selected, search]);
  const choose = (slug: string) => {
    if (categorySlug) {
      void navigate(slug === "all" ? "/products" : `/products/category/${slug}`);
      return;
    }
    const next = new URLSearchParams(params);
    if (slug === "all") next.delete("category"); else next.set("category", slug);
    setParams(next);
  };
  const selectedCategory = categories.find((category) => category.slug === selected);
  return <div className="page-shell container catalog-page">
    <PageMeta title="Ürünler" description="İlgün Ticaret elektronik, ses, kişisel bakım, küçük ev aletleri ve aksesuar ürünleri." canonical="/products" />
    <Reveal className="page-heading" direction="left"><span className="eyebrow">{selectedCategory ? selectedCategory.name.toLocaleUpperCase("tr-TR") : "ÜRÜN KATALOĞU"}</span><h1>{selectedCategory ? `${selectedCategory.name} ürünleri` : "Tüm ürünler"}</h1></Reveal>
    <div className="catalog-toolbar"><label className="search-box"><Search size={20} /><span className="sr-only">Ürün ara</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ürün, marka veya model ara" /></label><div className="filter-pills"><button className={selected === "all" ? "active" : ""} onClick={() => choose("all")}>Tümü</button>{categories.map((c) => <button key={c.id} className={selected === c.slug ? "active" : ""} onClick={() => choose(c.slug)}>{c.name}</button>)}</div></div>
    <div className="result-count">{loading ? "Yükleniyor…" : `${filtered.length} ürün gösteriliyor`}</div>{error && <div className="notice">{error}</div>}
    {!loading && filtered.length === 0 ? <div className="empty-state"><h2>{selectedCategory ? "Bu kategoride ürünler hazırlanıyor" : "Ürün bulunamadı"}</h2><p>{selectedCategory ? "Yeni ürünler eklendiğinde burada otomatik olarak listelenecek." : "Arama ifadenizi veya kategori filtresini değiştirin."}</p><Link className="button primary" to="/products">Tüm ürünleri göster</Link></div> : <Reveal className="product-grid reveal-stagger" direction="up">{filtered.map((p) => <ProductCard key={p.id} product={p} />)}</Reveal>}
  </div>;
}
