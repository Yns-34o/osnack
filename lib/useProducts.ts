'use client';

import { useEffect, useState } from 'react';
import { MENU, type Product } from './menu';
import { subscribeToProducts } from './products';

/**
 * Real-time menu hook. Renders the static seed menu immediately (SSR-safe,
 * no hydration mismatch) and upgrades to live Firestore data as soon as it
 * arrives. Re-renders automatically whenever a dish changes in the database.
 */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(MENU);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToProducts((items) => {
      setProducts(items);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return { products, loading };
}
