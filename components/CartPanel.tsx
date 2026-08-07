'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/format';
import { effectivePrice } from '@/lib/menu';
import { LINKS } from '@/lib/links';

export function CartPanel() {
  const { items, isOpen, closeCart, setQty, removeItem, subtotal, totalCount } = useCart();

  return (
    <>
      <div
        className={`cart-overlay ${isOpen ? 'open' : ''}`}
        id="cartOverlay"
        onClick={closeCart}
      />
      <aside className={`cart-panel ${isOpen ? 'open' : ''}`} id="cartPanel" aria-hidden={!isOpen}>
        <div className="cart-header">
          <h3>Votre panier</h3>
          <button className="cart-close" onClick={closeCart} aria-label="Fermer le panier">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="cart-body" id="cartBody">
          {items.length === 0 ? (
            <div className="cart-empty">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2}>
                <path d="M3 3h2l.4 2M7 13h10l3-7H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17" />
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="17" cy="20" r="1.5" />
              </svg>
              <p>Votre panier est vide</p>
            </div>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-img">
                  <Image src={item.image} alt={item.name} fill sizes="70px" />
                </div>
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <div className="price">{formatPrice(effectivePrice(item))}</div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item.id, item.qty - 1)}
                      aria-label="Diminuer"
                    >
                      −
                    </button>
                    <span className="qty-num">{item.qty}</span>
                    <button
                      className="qty-btn"
                      onClick={() => setQty(item.id, item.qty + 1)}
                      aria-label="Augmenter"
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="cart-item-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    Retirer
                  </button>
                </div>
                <div className="cart-item-total">{formatPrice(effectivePrice(item) * item.qty)}</div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer" id="cartFooter" style={{ display: items.length === 0 ? 'none' : 'block' }}>
          <div className="cart-line">
            <span className="label">Sous-total</span>
            <span className="value" id="cartSubtotal">{formatPrice(subtotal)}</span>
          </div>
          <div className="cart-line">
            <span className="label">Articles</span>
            <span className="value">{totalCount}</span>
          </div>
          <div className="cart-line total">
            <span className="label">Total</span>
            <span className="value" id="cartTotal">{formatPrice(subtotal)}</span>
          </div>
          <button
            className="cart-checkout"
            data-cursor-hover
            onClick={() => window.open(LINKS.uberEats, '_blank', 'noopener,noreferrer')}
          >
            Commander sur Uber Eats <span className="btn-arrow">→</span>
          </button>
        </div>
      </aside>
    </>
  );
}
