'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Reveal } from './Reveal';

const MANIFESTO =
  "Situé au cœur de Torcy, O'Snack prépare chaque jour des sandwichs cuits au four et des burgers généreux avec des ingrédients de qualité. Pas d'approximation, pas de raccourcis. Juste des produits frais, des recettes travaillées, et l'envie de servir une street-food qui tient ses promesses.";

const IMAGES = [
  {
    src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80',
    alt: 'Burger gourmet sur fond sombre',
    label: '01 — Préparation',
  },
  {
    src: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&auto=format&fit=crop&q=80',
    alt: 'Ingrédients frais',
    label: '02 — Ingrédients',
  },
  {
    src: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?w=800&auto=format&fit=crop&q=80',
    alt: 'Cuisson au four',
    label: '03 — Cuisson four',
  },
  {
    src: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&auto=format&fit=crop&q=80',
    alt: 'Street food ambiance',
    label: '04 — Service',
  },
];

export function Story() {
  const manifestoRef = useRef<HTMLParagraphElement>(null);
  const imgsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Scrub-blur on the manifesto words.
      if (manifestoRef.current) {
        gsap.to('.manifesto .word', {
          opacity: 1,
          filter: 'blur(0px) brightness(100%)',
          stagger: 0.04,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: manifestoRef.current,
            start: 'top 82%',
            end: 'center 55%',
            scrub: true,
          },
        });
      }

      // Directional clip-path reveal for the images.
      if (imgsRef.current) {
        const dirs = [
          'inset(0 100% 0 0)',
          'inset(0 0 100% 0)',
          'inset(0 0 0 100%)',
          'inset(100% 0 0 0)',
        ];
        gsap.fromTo(
          '.story-img',
          { clipPath: (_i: number) => dirs[_i % dirs.length], opacity: 0 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power4.inOut',
            stagger: 0.15,
            scrollTrigger: { trigger: imgsRef.current, start: 'top 80%' },
          },
        );
        gsap.fromTo(
          '.story-img img',
          { scale: 1.3 },
          {
            scale: 1.05,
            duration: 1.5,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: { trigger: imgsRef.current, start: 'top 80%' },
          },
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const words = MANIFESTO.split(' ');

  return (
    <section className="story section-pad" id="story">
      <div className="container">
        <Reveal className="section-label" as="div">Le Concept</Reveal>
        <div className="story-grid">
          <div className="story-left">
            <h2 className="story-title">
              Le goût
              <br />
              authentique,
              <br />
              <span className="accent">au four.</span>
            </h2>
            <p className="manifesto" ref={manifestoRef}>
              {words.map((word, i) => (
                <span key={i} className="word">
                  {word}
                </span>
              ))}
            </p>
            <div className="story-meta">
              <div className="story-meta-item">
                <div className="num">100%</div>
                <div className="label">Fraîcheur<br />quotidienne</div>
              </div>
              <div className="story-meta-item">
                <div className="num">7j/7</div>
                <div className="label">Ouvert<br />11h30 — 01h</div>
              </div>
              <div className="story-meta-item">
                <div className="num">4.5★</div>
                <div className="label">Note moyenne<br />+250 avis</div>
              </div>
            </div>
          </div>

          <div className="story-right" ref={imgsRef}>
            {IMAGES.map((img) => (
              <div className="story-img" key={img.label}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                />
                <div className="story-img-label">{img.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
