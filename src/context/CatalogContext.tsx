import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { categories as fallbackCategories, initialProducts } from "../data/catalog";
import { ratingForProduct } from "../data/reviews";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { Category, Product } from "../types";

type CatalogValue = { products: Product[]; categories: Category[]; loading: boolean; error: string | null; refresh: () => Promise<void>; usingFallback: boolean };
const CatalogContext = createContext<CatalogValue | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(fallbackCategories);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(!isSupabaseConfigured);

  const refresh = async () => {
    if (!supabase) return;
    setLoading(true);
    const [productResult, categoryResult, reviewResult] = await Promise.all([
      supabase.from("products").select("*, category:categories(*), product_images(*), product_features(*)").eq("active", true).order("sort_order"),
      supabase.from("categories").select("*").eq("active", true).order("sort_order"),
      supabase.from("product_reviews").select("product_id,rating").eq("approved", true)
    ]);
    if (productResult.error || categoryResult.error) {
      setError("Katalog veritabanına şu an ulaşılamıyor. Güncel olmayan yerel katalog gösteriliyor.");
      setUsingFallback(true);
    } else {
      const ratings = new Map<string, { total: number; count: number }>();
      for (const review of reviewResult.data ?? []) {
        const current = ratings.get(review.product_id) ?? { total: 0, count: 0 };
        ratings.set(review.product_id, { total: current.total + review.rating, count: current.count + 1 });
      }
      const normalized = (productResult.data ?? []).map((product: any) => {
        const rating = ratings.get(product.id);
        const fallback = ratingForProduct(product.id, product.slug);
        return {
          ...product,
          rating_average: rating ? rating.total / rating.count : fallback.average,
          review_count: rating?.count ?? fallback.count,
          product_images: [...(product.product_images ?? [])].sort((a, b) => a.sort_order - b.sort_order),
          product_features: [...(product.product_features ?? [])].sort((a, b) => a.sort_order - b.sort_order)
        };
      }) as Product[];
      setProducts(normalized);
      setCategories((categoryResult.data ?? []) as Category[]);
      setError(null);
      setUsingFallback(false);
    }
    setLoading(false);
  };

  useEffect(() => { void refresh(); }, []);
  const value = useMemo(() => ({ products, categories, loading, error, refresh, usingFallback }), [products, categories, loading, error, usingFallback]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const value = useContext(CatalogContext);
  if (!value) throw new Error("useCatalog must be used inside CatalogProvider");
  return value;
}
