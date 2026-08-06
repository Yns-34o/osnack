'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Product } from '@/lib/menu';
import { effectivePrice } from '@/lib/menu';

export interface CartLine extends Product {
  qty: number;
}

interface CartContextValue {
  items: CartLine[];
  isOpen: boolean;
  totalCount: number;
  subtotal: number;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toastKey: number;
  toastMessage: string;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'osnack-cart';

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toastKey, setToastKey] = useState(0);
  const [toastMessage, setToastMessage] = useState('');
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  // Lock body scroll while the cart panel is open.
  useEffect(() => {
    document.body.classList.toggle('cart-open', isOpen);
    return () => document.body.classList.remove('cart-open');
  }, [isOpen]);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToastMessage(`${product.name} ajouté au panier`);
    setToastKey((k) => k + 1);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const totalCount = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.qty * effectivePrice(i), 0),
    [items],
  );

  const value: CartContextValue = {
    items,
    isOpen,
    totalCount,
    subtotal,
    addItem,
    removeItem,
    setQty,
    openCart,
    closeCart,
    toastKey,
    toastMessage,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
