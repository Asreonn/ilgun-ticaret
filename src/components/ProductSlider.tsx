import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type ProductSliderProps<T> = {
  items: T[];
  getKey: (item: T) => string;
  renderSlide: (item: T, index: number) => ReactNode;
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
  autoPlayMs = 0,
  className = "",
  previousLabel = "Önceki ürün",
  nextLabel = "Sonraki ürün",
  dotLabel = (slideIndex) => `${slideIndex + 1}. ürünü göster`,
  index,
  onIndexChange
}: ProductSliderProps<T>) {
  const [internal, setInternal] = useState(0);
  const [exitIndex, setExitIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "previous">("next");
  const [paused, setPaused] = useState(false);
  const [hasSlid, setHasSlid] = useState(false);
  const lastShown = useRef(0);
  const lock = useRef(false);
  const touchStart = useRef(0);
  const current = Math.min(index ?? internal, Math.max(items.length - 1, 0));

  useEffect(() => {
    if (current === lastShown.current) return;
    const from = lastShown.current;
    const length = Math.max(items.length, 1);
    const forward = (current - from + length) % length;
    const backward = (from - current + length) % length;
    setDirection(forward <= backward ? "next" : "previous");
    setExitIndex(from);
    setHasSlid(true);
    lastShown.current = current;
    const timer = window.setTimeout(() => setExitIndex(null), 560);
    return () => window.clearTimeout(timer);
  }, [current, items.length]);

  const go = useCallback((next: number) => {
    if (!items.length || lock.current) return;
    const normalized = (next + items.length) % items.length;
    if (normalized === current) return;
    lock.current = true;
    window.setTimeout(() => {
      lock.current = false;
    }, 520);
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
      className={`product-slider ${hasSlid ? "has-slid" : ""} ${paused ? "is-paused" : ""} ${className}`}
      data-direction={direction}
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
        {items.map((item, itemIndex) => (
          <div
            className={`product-slider-slide${itemIndex === current ? " is-active" : ""}${itemIndex === exitIndex ? " is-exit" : ""}`}
            key={getKey(item)}
            data-active={itemIndex === current}
            aria-hidden={itemIndex !== current}
          >
            {renderSlide(item, itemIndex)}
          </div>
        ))}
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
