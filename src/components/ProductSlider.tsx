import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type ProductSliderProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderSlide: (item: T, index: number) => ReactNode;
  variant?: "page" | "peek";
  autoPlayMs?: number;
  className?: string;
  previousLabel?: string;
  nextLabel?: string;
  dotLabel?: (index: number) => string;
  index?: number;
  onIndexChange?: (index: number) => void;
};

export function ProductSlider<T>({
  items,
  getKey,
  renderSlide,
  variant = "page",
  autoPlayMs = 0,
  className = "",
  previousLabel = "Önceki ürün",
  nextLabel = "Sonraki ürün",
  dotLabel = (index) => `${index + 1}. ürünü göster`,
  index,
  onIndexChange
}: ProductSliderProps<T>) {
  const [internal, setInternal] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  const current = Math.min(index ?? internal, Math.max(items.length - 1, 0));
  const go = useCallback((next: number) => {
    if (!items.length) return;
    const normalized = (next + items.length) % items.length;
    if (normalized === current) return;
    if (index == null) setInternal(normalized);
    onIndexChange?.(normalized);
  }, [current, index, items.length, onIndexChange]);

  useEffect(() => {
    if (items.length < 2 || paused || autoPlayMs < 1) return;
    if (typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => go(current + 1), autoPlayMs);
    return () => window.clearTimeout(timer);
  }, [autoPlayMs, current, go, items.length, paused]);

  if (!items.length) return null;

  return (
    <div
      className={`product-slider product-slider-${variant} ${paused ? "is-paused" : ""} ${className}`}
      style={{ "--slider-index": String(current) } as CSSProperties}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onTouchStart={(event) => {
        touchStart.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        const distance = event.changedTouches[0].clientX - touchStart.current;
        if (Math.abs(distance) > 40) go(current + (distance < 0 ? 1 : -1));
      }}
    >
      <div className="product-slider-viewport">
        <div className="product-slider-track">
          {items.map((item, itemIndex) => (
            <div className="product-slider-slide" key={getKey(item)} data-active={itemIndex === current}>
              {renderSlide(item, itemIndex)}
            </div>
          ))}
        </div>
      </div>
      {items.length > 1 && (
        <div className="product-slider-controls">
          <button type="button" onClick={() => go(current - 1)} aria-label={previousLabel}>
            <ChevronLeft />
          </button>
          <div>
            {items.map((item, itemIndex) => (
              <button
                type="button"
                key={getKey(item)}
                className={itemIndex === current ? "active" : ""}
                onClick={() => go(itemIndex)}
                aria-label={dotLabel(itemIndex)}
              />
            ))}
          </div>
          <button type="button" onClick={() => go(current + 1)} aria-label={nextLabel}>
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
