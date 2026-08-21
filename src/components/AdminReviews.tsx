import { Check, MessageSquareText, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { ProductReview } from "../types";

export function AdminReviews() {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const load = useCallback(async () => {
    if (!supabase) return;
    const { data } = await supabase.from("product_reviews").select("*, product:products(name,model)").order("created_at", { ascending: false });
    setReviews((data || []) as unknown as ProductReview[]);
  }, []);
  useEffect(() => { void load(); }, [load]);
  const approve = async (id: string) => { if (!supabase) return; await supabase.from("product_reviews").update({ approved: true, approved_at: new Date().toISOString() }).eq("id", id); await load(); };
  const remove = async (id: string) => { if (!supabase || !confirm("Bu yorum silinsin mi?")) return; await supabase.from("product_reviews").delete().eq("id", id); await load(); };
  return <section className="admin-reviews"><div className="admin-section-title"><div><h2>Yorumlar</h2><p>Bekleyen yorumları inceleyin ve yayınlayın.</p></div><span>{reviews.filter((r) => !r.approved).length} bekliyor</span></div>{reviews.length === 0 ? <div className="admin-empty"><MessageSquareText/> Henüz yorum bulunmuyor.</div> : <div className="admin-review-list">{reviews.map((review) => <article key={review.id}><div><span>{review.product?.name || "Ürün"} · {review.rating}/5</span><strong>{review.reviewer_name}</strong><p>{review.comment}</p></div><div>{!review.approved && <button className="approve" onClick={() => approve(review.id)}><Check/> Onayla</button>}<button className="danger" onClick={() => remove(review.id)}><Trash2/> Sil</button></div></article>)}</div>}</section>;
}
