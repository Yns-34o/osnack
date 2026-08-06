'use client';

import { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';

/** Bottom toast that pops whenever an item is added (driven by toastKey). */
export function Toast() {
  const { toastKey, toastMessage } = useCart();
  const [visible, setVisible] = useState(false);
  const first = useRef(true);

  useEffect(() => {
    // Skip the initial mount tick.
    if (first.current) {
      first.current = false;
      return;
    }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, [toastKey]);

  return (
    <div className={`toast ${visible ? 'show' : ''}`} id="toast">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M5 13l4 4L19 7" />
      </svg>
      <span id="toastText">{toastMessage || 'Ajouté au panier'}</span>
    </div>
  );
}
