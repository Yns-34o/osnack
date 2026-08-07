'use client';

import { LINKS } from '@/lib/links';

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

      <a
        href={LINKS.phoneHref}
        className="floating-nav-phone"
        data-cursor-hover
        aria-label={`Appeler ${LINKS.phone}`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Commander</span>
      </a>
    </nav>
  );
}
