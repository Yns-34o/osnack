'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HERO_IMG =
  'https://images.unsplash.com/photo-1530554764233-e79e16c91d08?w=1600&auto=format&fit=crop&q=80';

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (bgRef.current) {
        gsap.from(bgRef.current, {
          scale: 1.15,
          opacity: 0,
          duration: 1.6,
          ease: 'expo.out',
        });
      }
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

  return (
    <section className="hero" id="hero">
      <div
        className="hero-bg"
        ref={bgRef}
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      ></div>
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <div className="hero-eyebrow">Sandwichs au four · Burgers maison · Torcy</div>
        <h1 className="hero-title" ref={titleRef}>
          <span className="line"><span>O&apos;SNACK</span></span>
          <span className="line"><span>TORCY</span></span>
        </h1>
        <p className="hero-subtitle">
          Préparé minute. Dévoré en un instant.
        </p>
        <p className="hero-desc">
          Produits frais sélectionnés chaque matin, pains dorés au four, viandes
          savoureuses et sauces maison. Une qualité honnête, des portions
          généreuses — le goût du vrai, sans aucun compromis.
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
