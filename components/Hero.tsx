'use client';

import { useEffect, useRef, type CSSProperties } from 'react';
import { gsap } from 'gsap';

const ROWS = 6;
const COLS = 8;
const WHITE_CELLS = [
  { r: 0, c: 2 }, { r: 1, c: 6 }, { r: 2, c: 0 },
  { r: 3, c: 4 }, { r: 4, c: 7 }, { r: 5, c: 3 },
];
const BLACK_CELLS = [
  { r: 0, c: 5 }, { r: 2, c: 7 }, { r: 4, c: 1 }, { r: 5, c: 6 },
];
const HERO_IMG =
  'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?w=1600&auto=format&fit=crop&q=80';

export function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const ctx = gsap.context(() => {
      const cells = grid.querySelectorAll('.grid-cell');
      gsap.from(cells, {
        rotateX: 90,
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: { each: 0.04, from: 'random' },
      });
      if (titleRef.current) {
        gsap.to(titleRef.current.querySelectorAll('.line > span'), {
          y: 0,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.12,
          delay: 0.3,
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const cells: { key: string; className: string; style: CSSProperties }[] = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const isWhite = WHITE_CELLS.some((p) => p.r === r && p.c === c);
      const isBlack = BLACK_CELLS.some((p) => p.r === r && p.c === c);
      const style: CSSProperties = {
        left: `${(c / COLS) * 100}%`,
        top: `${(r / ROWS) * 100}%`,
        width: `${100 / COLS}%`,
        height: `${100 / ROWS}%`,
      };
      if (!isWhite && !isBlack) {
        style.backgroundImage = `url(${HERO_IMG})`;
        style.backgroundSize = `${COLS * 100}% ${ROWS * 100}%`;
        style.backgroundPosition = `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`;
      }
      cells.push({
        key: `${r}-${c}`,
        className: ['grid-cell', isWhite ? 'is-white' : '', isBlack ? 'is-black' : '']
          .filter(Boolean)
          .join(' '),
        style,
      });
    }
  }

  return (
    <section className="hero" id="hero">
      <div className="hero-grid" ref={gridRef}>
        {cells.map((cell) => (
          <div key={cell.key} className={cell.className} style={cell.style} />
        ))}
      </div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-eyebrow">57 Rue de Paris — Torcy · Depuis le premier jour</div>
        <h1 className="hero-title" ref={titleRef}>
          <span className="line"><span>O&apos;SNACK</span></span>
          <span className="line"><span>TORCY</span></span>
        </h1>
        <p className="hero-subtitle">
          Sandwichs au four &amp; burgers gourmands. Le goût authentique au cœur de
          Torcy — préparé minute, produits frais, générosité garantie.
        </p>
        <div className="hero-ctas">
          <a href="#menu" className="btn btn-primary" data-cursor-hover>
            Commander en ligne <span className="btn-arrow">→</span>
          </a>
          <a href="#menu" className="btn" data-cursor-hover>
            Voir le menu <span className="btn-arrow">→</span>
          </a>
        </div>
      </div>

      <div className="hero-meta">
        <strong>OUVERT 7J/7</strong>
        <br />
        11h30 — 14h30
        <br />
        18h00 — 01h00
      </div>

      <div className="hero-scroll">
        <span className="line-vert"></span>
        Scroll
      </div>
    </section>
  );
}
