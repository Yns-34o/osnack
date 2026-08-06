'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { CATEGORIES, CATEGORY_LABELS, MENU, countByCategory, type Category } from '@/lib/menu';
import { formatPrice } from '@/lib/format';
import { AddToCartButton } from './AddToCartButton';
import { Reveal } from './Reveal';

type Filter = Category | 'all';

export function Menu() {
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(
    () => (filter === 'all' ? MENU : MENU.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section className="menu section-pad" id="menu">
      <div className="container">
        <Reveal className="section-label" as="div">Notre Carte</Reveal>

        <div className="menu-header">
          <h2 className="section-title">
            Le menu
            <br />
            O&apos;Snack.
          </h2>
          <p className="menu-intro">
            Des sandwichs cuits au four, des burgers signature et des accompagnements
            faits maison. Filtrez, ajoutez au panier, commandez en quelques clics.
          </p>
        </div>

        <div className="filters" id="filters">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              data-cursor-hover
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_LABELS[cat]} <span className="count">({countByCategory(cat)})</span>
            </button>
          ))}
        </div>

        <div className="menu-grid" id="menuGrid">
          {filtered.map((item) => (
            <MenuCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuCard({ product }: { product: (typeof MENU)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('is-visible');
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article className="menu-card" ref={ref}>
      <div className="menu-card-img">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        {product.tag && <div className="menu-card-tag">{product.tag}</div>}
      </div>
      <div className="menu-card-body">
        <h3 className="menu-card-name">{product.name}</h3>
        <p className="menu-card-desc">{product.desc}</p>
        <div className="menu-card-footer">
          <div className="menu-card-price">
            {formatPrice(product.price).replace(' €', '')}
            <span className="currency">€</span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
