'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

export function Nav() {
  const { totalCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'is-scrolled' : ''}`} id="nav">
      <a href="#" className="nav-logo" data-cursor-hover>
        O&apos;SNACK<span className="dot"></span>
      </a>
      <ul className="nav-links">
        <li><a href="#story" data-cursor-hover>Concept</a></li>
        <li><a href="#menu" data-cursor-hover>Menu</a></li>
        <li><a href="#reviews" data-cursor-hover>Avis</a></li>
        <li><a href="#contact" data-cursor-hover>Contact</a></li>
      </ul>
      <div className="nav-right">
        <a href="tel:0988086125" className="nav-phone" data-cursor-hover>
          09 88 08 61 25
        </a>
        <button
          className="cart-toggle"
          onClick={openCart}
          data-cursor-hover
          aria-label="Ouvrir le panier"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path d="M3 3h2l.4 2M7 13h10l3-7H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className={`cart-count ${totalCount > 0 ? 'active' : ''}`} id="cartCount">
            {totalCount}
          </span>
        </button>
      </div>
    </nav>
  );
}
