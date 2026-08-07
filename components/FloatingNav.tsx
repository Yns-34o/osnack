'use client';

import { useCart } from '@/context/CartContext';

// Barre de navigation flottante (pastille centrée, toujours visible au scroll).
// Reprend l'esthétique "FloatingNav" (pastille arrondie en haut centrée) adaptée
// au design system noir/blanc du site, sans Tailwind ni framer-motion.
const NAV_ITEMS = [
  { name: 'Concept', link: '#story' },
  { name: 'Menu', link: '#menu' },
  { name: 'Avis', link: '#reviews' },
  { name: 'Contact', link: '#contact' },
];

export function FloatingNav() {
  const { totalCount, openCart } = useCart();

  return (
    <nav className="floating-nav" id="floating-nav" aria-label="Navigation principale">
      <a href="#hero" className="floating-nav-brand" data-cursor-hover>
        O&apos;SNACK<span className="dot" aria-hidden />
      </a>

      <ul className="floating-nav-links">
        {NAV_ITEMS.map((item) => (
          <li key={item.link}>
            <a href={item.link} data-cursor-hover>
              {item.name}
            </a>
          </li>
        ))}
      </ul>

      <button
        className="floating-nav-cart"
        onClick={openCart}
        data-cursor-hover
        aria-label="Ouvrir le panier"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path d="M3 3h2l.4 2M7 13h10l3-7H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className={`floating-nav-cart-badge ${totalCount > 0 ? 'active' : ''}`}>
          {totalCount}
        </span>
      </button>
    </nav>
  );
}
