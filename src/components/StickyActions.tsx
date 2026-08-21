import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export function StickyActions({ children, className = "" }: { children: ReactNode; className?: string }) {
  if (typeof document === "undefined") return null;
  return createPortal(
    <div className={`sticky-actions ${className}`.trim()} role="region" aria-label="Sipariş işlemleri">
      <div className="sticky-actions-inner">{children}</div>
    </div>,
    document.body
  );
}
