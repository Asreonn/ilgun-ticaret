import { ChevronLeft, ChevronRight, Star, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { ImageWithLoader } from "./ImageWithLoader";
import { imageUrl } from "../lib/site";
import type { ProductReview } from "../types";

export type ReviewPhotoItem = {
  src: string;
  review: ProductReview;
};

type ReviewPhotoViewerProps = {
  items: ReviewPhotoItem[];
  index: number;
  onIndexChange: (index: number) => void;
  onClose: () => void;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium" }).format(new Date(value));
}

export function ReviewPhotoViewer({ items, index, onIndexChange, onClose }: ReviewPhotoViewerProps) {
  const item = items[index];
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setZoomed(false);
    setOrigin("50% 50%");
  }, [index]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [index, items.length, onClose, onIndexChange]);

  const title = useMemo(
    () => (item ? `${item.review.reviewer_name} fotoğrafı, ${index + 1} / ${items.length}` : "Fotoğraf"),
    [item, index, items.length]
  );

  if (!item) return null;

  const setOriginFromEvent = (event: MouseEvent<HTMLDivElement>) => {
    const box = stageRef.current?.getBoundingClientRect();
    if (!box) return;
    const x = ((event.clientX - box.left) / box.width) * 100;
    const y = ((event.clientY - box.top) / box.height) * 100;
    setOrigin(`${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`);
  };

  return (
    <div className="review-viewer" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="review-viewer-shell" onClick={(event) => event.stopPropagation()}>
        <button className="review-viewer-close" type="button" onClick={onClose} aria-label="Kapat">
          <X size={20} />
        </button>
        <div className="review-viewer-stage">
          {items.length > 1 && (
            <button type="button" className="review-viewer-nav is-prev" onClick={() => onIndexChange((index - 1 + items.length) % items.length)} aria-label="Önceki fotoğraf">
              <ChevronLeft size={22} />
            </button>
          )}
          <div
            ref={stageRef}
            className={`review-viewer-image ${zoomed ? "is-zoomed" : ""}`}
            style={{ transformOrigin: origin }}
            onClick={(event) => {
              setOriginFromEvent(event);
              setZoomed((value) => !value);
            }}
            onMouseMove={(event) => {
              if (zoomed) setOriginFromEvent(event);
            }}
          >
            <ImageWithLoader src={imageUrl(item.src)} alt={title} />
          </div>
          {items.length > 1 && (
            <button type="button" className="review-viewer-nav is-next" onClick={() => onIndexChange((index + 1) % items.length)} aria-label="Sonraki fotoğraf">
              <ChevronRight size={22} />
            </button>
          )}
          <button
            type="button"
            className="review-viewer-zoom"
            onClick={() => setZoomed((value) => !value)}
            aria-label={zoomed ? "Uzaklaştır" : "Yakınlaştır"}
          >
            {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            {zoomed ? "Uzaklaştır" : "İncele"}
          </button>
          <span className="review-viewer-count">{index + 1} / {items.length}</span>
        </div>
        <aside className="review-viewer-meta">
          <div className="review-stars" aria-label={`${item.review.rating} yıldız`}>
            {Array.from({ length: 5 }).map((_, star) => (
              <Star key={star} className={star < item.review.rating ? "filled" : ""} />
            ))}
          </div>
          <strong>{item.review.reviewer_name}</strong>
          <time>{formatDate(item.review.created_at)}</time>
          <p>{item.review.comment}</p>
        </aside>
      </div>
    </div>
  );
}
