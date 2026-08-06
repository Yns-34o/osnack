'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  CATEGORY_LABELS,
  type Category,
  type Product,
} from '@/lib/menu';
import { createProduct, updateProduct } from '@/lib/products';

const CATS: Category[] = ['sandwichs', 'burgers', 'sides', 'boissons'];

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80';

interface Props {
  initial?: Product;
  onClose: () => void;
}

export function ProductForm({ initial, onClose }: Props) {
  const [name, setName] = useState(initial?.name ?? '');
  const [desc, setDesc] = useState(initial?.desc ?? '');
  const [category, setCategory] = useState<Category>(initial?.category ?? 'sandwichs');
  const [price, setPrice] = useState(initial ? String(initial.price) : '');
  const [promoPrice, setPromoPrice] = useState(
    initial?.promoPrice != null ? String(initial.promoPrice) : '',
  );
  const [image, setImage] = useState(initial?.image ?? '');
  const [tag, setTag] = useState(initial?.tag ?? '');
  const [available, setAvailable] = useState(initial?.available !== false);
  const [order, setOrder] = useState(initial?.order != null ? String(initial.order) : '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEdit = Boolean(initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const basePrice = Number(price);
    if (!name.trim()) return setError('Le nom est obligatoire.');
    if (!Number.isFinite(basePrice) || basePrice < 0) return setError('Prix invalide.');

    const promo = promoPrice.trim() === '' ? null : Number(promoPrice);
    if (promo != null && (!Number.isFinite(promo) || promo < 0))
      return setError('Prix promo invalide.');

    const data: Omit<Product, 'id'> = {
      name: name.trim(),
      desc: desc.trim(),
      category,
      price: Math.round(basePrice * 100) / 100,
      promoPrice: promo != null ? Math.round(promo * 100) / 100 : null,
      image: image.trim() || FALLBACK_IMG,
      tag: tag.trim() || undefined,
      available,
      order: order.trim() === '' ? undefined : Number(order),
    };

    setSaving(true);
    try {
      if (initial) {
        await updateProduct(initial.id, data);
      } else {
        await createProduct(data);
      }
      onClose();
    } catch (err) {
      console.error(err);
      setError("Échec de l'enregistrement. Firebase est-il configuré ?");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-head">
          <h2>{isEdit ? 'Modifier le plat' : 'Nouveau plat'}</h2>
          <button className="admin-x" onClick={onClose} aria-label="Fermer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="admin-preview">
            <Image
              src={image.trim() || FALLBACK_IMG}
              alt="Aperçu"
              fill
              sizes="120px"
              unoptimized
            />
          </div>

          <label className="admin-field">
            <span>Image (URL)</span>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://…"
            />
          </label>

          <label className="admin-field">
            <span>Nom *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Le Torcy" />
          </label>

          <label className="admin-field">
            <span>Description</span>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={3}
              placeholder="Ingrédients, garniture…"
            />
          </label>

          <div className="admin-row">
            <label className="admin-field">
              <span>Catégorie</span>
              <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
                {CATS.map((c) => (
                  <option key={c} value={c}>
                    {CATEGORY_LABELS[c]}
                  </option>
                ))}
              </select>
            </label>

            <label className="admin-field">
              <span>Prix (€) *</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="8,50"
              />
            </label>
          </div>

          <div className="admin-row">
            <label className="admin-field">
              <span>Prix promo (€)</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={promoPrice}
                onChange={(e) => setPromoPrice(e.target.value)}
                placeholder="Laisser vide = pas de promo"
              />
            </label>

            <label className="admin-field">
              <span>Badge / tag</span>
              <input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="Signature, Épicé…" />
            </label>
          </div>

          <div className="admin-row">
            <label className="admin-field">
              <span>Ordre d’affichage</span>
              <input
                type="number"
                min="0"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="plus bas = en premier"
              />
            </label>

            <label className="admin-check">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              <span>Visible sur le site</span>
            </label>
          </div>

          {error && <div className="admin-error">{error}</div>}

          <div className="admin-actions">
            <button type="button" className="admin-btn ghost" onClick={onClose} disabled={saving}>
              Annuler
            </button>
            <button type="submit" className="admin-btn solid" disabled={saving}>
              {saving ? 'Enregistrement…' : isEdit ? 'Enregistrer' : 'Créer le plat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
