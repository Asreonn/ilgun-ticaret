import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types";

export type CartItem = { product: Product; quantity: number };
type CartValue = {
  items: CartItem[];
  totalItems: number;
  knownTotal: number;
  hasUnknownPrices: boolean;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const storageKey = "ilgun-ticaret-cart-v1";
const CartContext = createContext<CartValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(storageKey) || "[]") as CartItem[];
    return Array.isArray(parsed) ? parsed.filter((item) => item?.product?.id && Number.isInteger(item.quantity) && item.quantity > 0).slice(0, 50) : [];
  } catch { return []; }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  useEffect(() => { try { localStorage.setItem(storageKey, JSON.stringify(items)); } catch { /* storage may be unavailable */ } }, [items]);
  const addItem = useCallback((product: Product, quantity = 1) => setItems((current) => {
    const safeQuantity = Math.max(1, Math.min(99, Math.floor(quantity)));
    const existing = current.find((item) => item.product.id === product.id);
    return existing ? current.map((item) => item.product.id === product.id ? { ...item, product, quantity: Math.min(99, item.quantity + safeQuantity) } : item) : [...current, { product, quantity: safeQuantity }];
  }), []);
  const updateQuantity = useCallback((productId: string, quantity: number) => setItems((current) => quantity <= 0 ? current.filter((item) => item.product.id !== productId) : current.map((item) => item.product.id === productId ? { ...item, quantity: Math.min(99, Math.floor(quantity)) } : item)), []);
  const removeItem = useCallback((productId: string) => setItems((current) => current.filter((item) => item.product.id !== productId)), []);
  const clearCart = useCallback(() => setItems([]), []);
  const value = useMemo(() => ({ items, totalItems: items.reduce((sum, item) => sum + item.quantity, 0), knownTotal: items.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0), hasUnknownPrices: items.some((item) => item.product.price == null), addItem, updateQuantity, removeItem, clearCart }), [items, addItem, updateQuantity, removeItem, clearCart]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error("useCart must be used inside CartProvider");
  return value;
}
