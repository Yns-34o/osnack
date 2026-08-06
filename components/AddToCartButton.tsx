'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/menu';

/**
 * Square "+" add button. Flips to a check state briefly after adding, and
 * delegates the cart mutation to the shared CartContext.
 */
export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1200);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      className={`add-btn ${added ? 'added' : ''}`}
      onClick={() => {
        addItem(product);
        setAdded(true);
      }}
      data-cursor-hover
      aria-label={`Ajouter ${product.name} au panier`}
    >
      <svg className="plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <svg className="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M5 13l4 4L19 7" />
      </svg>
    </button>
  );
}
