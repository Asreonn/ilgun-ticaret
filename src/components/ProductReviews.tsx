import { Camera, MessageSquareText, Send, Star } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { reviewsForProduct } from "../data/reviews";
import { imageUrl } from "../lib/site";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import type { ProductReview } from "../types";
import { ImageWithLoader } from "./ImageWithLoader";
import { Reveal } from "./Reveal";
import { ReviewPhotoViewer, type ReviewPhotoItem } from "./ReviewPhotoViewer";

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

function reviewImages(review?: Pick<ProductReview, "images">) {
  return (review?.images ?? []).filter(Boolean);
}

function mergeReviews(remote: ProductReview[], local: ProductReview[]) {
  const byName = new Map(local.map((review) => [review.reviewer_name, review]));
  return remote.map((review) => {
    const seed = byName.get(review.reviewer_name);
    const images = reviewImages(review).length ? reviewImages(review) : reviewImages(seed);
    return { ...review, images };
  });
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
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

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
        if (data?.length) setReviews(mergeReviews(data as ProductReview[], local));
      });
  }, [productId, productSlug]);

  const photos = useMemo<ReviewPhotoItem[]>(
    () => reviews.flatMap((review) => reviewImages(review).map((src) => ({ src, review }))),
    [reviews]
  );

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

  const openPhoto = (src: string, review: ProductReview) => {
    const next = photos.findIndex((item) => item.src === src && item.review.id === review.id);
    setViewerIndex(next >= 0 ? next : 0);
  };

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
      {photos.length > 0 && (
        <div className="review-photos">
          <div className="review-photos-head">
            <strong><Camera size={16} /> Müşteri fotoğrafları</strong>
            <span>{photos.length} fotoğraf</span>
          </div>
          <div className="review-photos-strip">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={`${photo.review.id}-${photo.src}`}
                className="review-photo-thumb"
                onClick={() => setViewerIndex(index)}
                aria-label={`${photo.review.reviewer_name} fotoğrafını incele`}
              >
                <ImageWithLoader src={imageUrl(photo.src)} alt="" />
              </button>
            ))}
          </div>
        </div>
      )}
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
              <p>{review.comment}</p>
              {reviewImages(review).length > 0 && (
                <div className="review-card-photos">
                  {reviewImages(review).map((src) => (
                    <button type="button" key={src} onClick={() => openPhoto(src, review)} aria-label={`${review.reviewer_name} fotoğrafını incele`}>
                      <ImageWithLoader src={imageUrl(src)} alt="" />
                    </button>
                  ))}
                </div>
              )}
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
      {viewerIndex != null && photos[viewerIndex] && (
        <ReviewPhotoViewer
          items={photos}
          index={viewerIndex}
          onIndexChange={setViewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </Reveal>
  );
}
