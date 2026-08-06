'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import {
  CATEGORIES,
  CATEGORY_LABELS,
  countByCategory,
  effectivePrice,
  hasPromo,
  isAvailable,
  promoPercent,
  type Category,
  type Product,
} from '@/lib/menu';
import { useProducts } from '@/lib/useProducts';
import { formatPrice } from '@/lib/format';
import { AddToCartButton } from './AddToCartButton';
import { Reveal } from './Reveal';

type Filter = Category | 'all';

export function Menu() {
  const [filter, setFilter] = useState<Filter>('all');
  const { products } = useProducts();

  // Hide dishes the admin has toggled off (soft remove). Deletion is permanent.
  const visible = useMemo(() => products.filter(isAvailable), [products]);

  const filtered = useMemo(
    () => (filter === 'all' ? visible : visible.filter((p) => p.category === filter)),
    [filter, visible],
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
              onClick={() => setFilter(cat)}
            >
              {CATEGORY_LABELS[cat]} <span className="count">({countByCategory(cat, visible)})</span>
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

function MenuCard({ product }: { product: Product }) {
  const ref = useRef<HTMLDivElement>(null);
  const promo = hasPromo(product);

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
        {promo && (
          <div className="menu-card-tag promo">-{promoPercent(product)} %</div>
        )}
      </div>
      <div className="menu-card-body">
        <h3 className="menu-card-name">{product.name}</h3>
        <p className="menu-card-desc">{product.desc}</p>
        <div className="menu-card-footer">
          <div className={`menu-card-price ${promo ? 'is-promo' : ''}`}>
            {promo && <span className="price-old">{formatPrice(product.price)}</span>}
            <span className="price-now">
              {formatPrice(effectivePrice(product))}
            </span>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
