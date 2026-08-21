import { MessageSquareText, Send, Star } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import { reviewsForProduct } from "../data/reviews";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { ProductReview } from "../types";
import { Reveal } from "./Reveal";

const ratingCopy = ["", "Kötü", "Zayıf", "İdare eder", "İyi", "Mükemmel"];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
}

export function ProductReviews({ productId, productSlug }: { productId: string; productSlug?: string }) {
  const seedReviews = reviewsForProduct(productId, productSlug);
  const [reviews, setReviews] = useState<ProductReview[]>(seedReviews);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const local = reviewsForProduct(productId, productSlug);
    setReviews(local);
    if (!supabase || productId.startsWith("seed-")) return;
    void supabase
      .from("product_reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        if (data?.length) setReviews(data as ProductReview[]);
      });
  }, [productId, productSlug]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (website) return;
    if (!supabase || !isSupabaseConfigured || productId.startsWith("seed-")) {
      setStatus("Değerlendirme sistemi şu an kullanılamıyor.");
      return;
    }
    setSending(true);
    setStatus("");
    const { error } = await supabase.from("product_reviews").insert({
      product_id: productId,
      reviewer_name: name.trim(),
      rating,
      comment: comment.trim(),
      approved: false
    });
    if (error) {
      setStatus("Gönderilemedi. Lütfen daha sonra yeniden deneyin.");
    } else {
      setStatus("Teşekkürler. Değerlendirmeniz kontrol edildikten sonra yayınlanacaktır.");
      setName("");
      setComment("");
      setRating(5);
    }
    setSending(false);
  };

  const average = reviews.length
    ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
    : 0;

  return (
    <Reveal as="section" className="reviews-section" id="reviews" direction="up">
      <div className="reviews-heading">
        <div>
          <span className="eyebrow">PUANLAR</span>
          <h2>Ürünü değerlendirin</h2>
        </div>
        <div className="review-score">
          <strong>{reviews.length ? average.toFixed(1) : "—"}</strong>
          <span>{reviews.length ? `${reviews.length} değerlendirme` : "Henüz puan yok"}</span>
        </div>
      </div>
      <div className="reviews-grid">
        <div className="review-list">
          {reviews.length ? reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-card-top">
                <span className="review-avatar" aria-hidden="true">{initials(review.reviewer_name)}</span>
                <div className="review-stars" aria-label={`${review.rating} yıldız`}>
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={i < review.rating ? "filled" : ""} />)}
                </div>
              </div>
              <p>“{review.comment}”</p>
              <div>
                <strong>{review.reviewer_name}</strong>
                <time>{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(new Date(review.created_at))}</time>
              </div>
            </article>
          )) : (
            <div className="no-reviews">
              <MessageSquareText />
              <h3>İlk puanı siz verin</h3>
              <p>Bu ürün için henüz yayınlanmış bir değerlendirme yok.</p>
            </div>
          )}
        </div>
        <form className="review-form" onSubmit={submit}>
          <h3>Puanınızı seçin</h3>
          <p>Kısa deneyiminiz onaylandıktan sonra yayınlanır.</p>
          <div className="rating-picker">
            <div className="rating-input" role="radiogroup" aria-label="Puan">
              {[1, 2, 3, 4, 5].map((value) => (
                <button type="button" key={value} onClick={() => setRating(value)} aria-label={`${value} yıldız`} aria-pressed={rating === value}>
                  <Star className={value <= rating ? "filled" : ""} />
                </button>
              ))}
            </div>
            <strong>{rating}/5 · {ratingCopy[rating]}</strong>
          </div>
          <label>Adınız<input minLength={2} maxLength={60} value={name} onChange={(event) => setName(event.target.value)} placeholder="Adınız" required /></label>
          <label>Deneyiminiz<textarea minLength={10} maxLength={800} rows={4} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Ürünü nasıl buldunuz?" required /></label>
          <label className="honeypot" aria-hidden="true">Web sitesi<input tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></label>
          {status && <div className="review-status" role="status">{status}</div>}
          <button className="button primary" disabled={sending}><Send size={17} />{sending ? "Gönderiliyor…" : "Değerlendirmeyi gönder"}</button>
        </form>
      </div>
    </Reveal>
  );
}
