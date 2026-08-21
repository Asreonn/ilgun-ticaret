import { ChevronLeft, ChevronRight, Star, X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type PointerEvent } from "react";
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
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    setZoomed(false);
    const node = scrollRef.current;
    if (node) {
      node.scrollLeft = 0;
      node.scrollTop = 0;
    }
    const frame = window.requestAnimationFrame(() => {
      rootRef.current?.scrollIntoView?.({ behavior: "smooth", block: "center" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [index]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onIndexChange((index + 1) % items.length);
      if (event.key === "ArrowLeft") onIndexChange((index - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, items.length, onClose, onIndexChange]);

  const title = useMemo(
    () => (item ? `${item.review.reviewer_name} fotoğrafı, ${index + 1} / ${items.length}` : "Fotoğraf"),
    [item, index, items.length]
  );

  if (!item) return null;

  const zoomToPoint = (clientX: number, clientY: number) => {
    const node = scrollRef.current;
    if (!node) {
      setZoomed(true);
      return;
    }
    const box = node.getBoundingClientRect();
    const ratioX = (clientX - box.left + node.scrollLeft) / Math.max(node.scrollWidth, 1);
    const ratioY = (clientY - box.top + node.scrollTop) / Math.max(node.scrollHeight, 1);
    setZoomed(true);
    requestAnimationFrame(() => {
      const stage = scrollRef.current;
      if (!stage) return;
      stage.scrollLeft = ratioX * (stage.scrollWidth - stage.clientWidth);
      stage.scrollTop = ratioY * (stage.scrollHeight - stage.clientHeight);
    });
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    const node = scrollRef.current;
    if (!node) return;
    drag.current = { x: event.clientX, y: event.clientY, left: node.scrollLeft, top: node.scrollTop };
    dragged.current = false;
    node.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const start = drag.current;
    const node = scrollRef.current;
    if (!start || !node) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragged.current = true;
    node.scrollLeft = start.left - dx;
    node.scrollTop = start.top - dy;
  };

  const endDrag = () => {
    drag.current = null;
  };

  const onImageClick = (event: { clientX: number; clientY: number }) => {
    if (dragged.current) return;
    if (zoomed) {
      setZoomed(false);
      return;
    }
    zoomToPoint(event.clientX, event.clientY);
  };

  return (
    <div ref={rootRef} className="review-viewer" role="dialog" aria-modal="false" aria-label={title}>
      <div className="review-viewer-shell">
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
            ref={scrollRef}
            className={`review-viewer-scroll ${zoomed ? "is-zoomed" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onClick={onImageClick}
          >
            <div className={`review-viewer-image ${zoomed ? "is-zoomed" : ""}`}>
              <ImageWithLoader src={imageUrl(item.src)} alt={title} />
            </div>
          </div>
          {items.length > 1 && (
            <button type="button" className="review-viewer-nav is-next" onClick={() => onIndexChange((index + 1) % items.length)} aria-label="Sonraki fotoğraf">
              <ChevronRight size={22} />
            </button>
          )}
          <button
            type="button"
            className="review-viewer-zoom"
            onClick={() => (zoomed ? setZoomed(false) : zoomToPoint(window.innerWidth / 2, window.innerHeight / 2))}
            aria-label={zoomed ? "Uzaklaştır" : "Yakınlaştır"}
          >
            {zoomed ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
            {zoomed ? "Uzaklaştır" : "Yakınlaştır"}
          </button>
          <span className="review-viewer-count">{index + 1} / {items.length}</span>
        </div>
        {items.length > 1 && (
          <div className="review-viewer-thumbs">
            {items.map((photo, photoIndex) => (
              <button
                type="button"
                key={`${photo.review.id}-${photo.src}-${photoIndex}`}
                className={photoIndex === index ? "is-active" : ""}
                onClick={() => onIndexChange(photoIndex)}
                aria-label={`${photoIndex + 1}. fotoğraf`}
                aria-current={photoIndex === index}
              >
                <ImageWithLoader src={imageUrl(photo.src)} alt="" />
              </button>
            ))}
          </div>
        )}
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
