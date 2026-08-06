'use client';

import { useCart } from '@/context/CartContext';

/** Mobile-only floating cart button (CSS shows it under 768px). */
export function CartFloating() {
  const { totalCount, openCart } = useCart();
  return (
    <button className="cart-floating" id="cartFloating" onClick={openCart}>
      Panier <span className="badge" id="cartFloatingBadge">{totalCount}</span>
    </button>
  );
}
