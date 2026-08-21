import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { ProductCard } from "../components/ProductCard";
import { useCatalog } from "../context/CatalogContext";

export default function Products() {
  const { products, categories, loading, error } = useCatalog();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("q") || "");
  const selected = params.get("category") || "all";
  const filtered = useMemo(() => {
    const term = search.toLocaleLowerCase("tr-TR").trim();
    return products.filter((p) => (selected === "all" || p.category?.slug === selected) && (!term || [p.name, p.brand, p.model].join(" ").toLocaleLowerCase("tr-TR").includes(term)));
  }, [products, selected, search]);
  const choose = (slug: string) => { const next = new URLSearchParams(params); if (slug === "all") next.delete("category"); else next.set("category", slug); setParams(next); };
  return <div className="page-shell container">
    <PageMeta title="Ürünler" description="İlgün Ticaret elektronik, ses, kişisel bakım, küçük ev aletleri ve aksesuar ürünleri." canonical="/products" />
    <div className="page-heading"><span className="eyebrow">ÜRÜN KATALOĞU</span><h1>İhtiyacınıza uygun ürünü bulun</h1><p>Ürün adı, marka veya modelle arayın; kategoriye göre filtreleyin.</p></div>
    <div className="catalog-toolbar"><label className="search-box"><Search size={20} /><span className="sr-only">Ürün ara</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Ürün, marka veya model ara" /></label><div className="filter-pills"><button className={selected === "all" ? "active" : ""} onClick={() => choose("all")}>Tümü</button>{categories.map((c) => <button key={c.id} className={selected === c.slug ? "active" : ""} onClick={() => choose(c.slug)}>{c.name}</button>)}</div></div>
    <div className="result-count">{loading ? "Yükleniyor…" : `${filtered.length} ürün gösteriliyor`}</div>{error && <div className="notice">{error}</div>}
    {!loading && filtered.length === 0 ? <div className="empty-state"><h2>Ürün bulunamadı</h2><p>Arama ifadenizi veya kategori filtresini değiştirin.</p></div> : <div className="product-grid">{filtered.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
  </div>;
}
