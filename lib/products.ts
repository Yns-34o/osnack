import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase';
import { MENU, type Product } from './menu';

/** Firestore collection name for menu items. */
export const PRODUCTS_COLLECTION = 'products';

/**
 * Subscribe to the full menu in real time. Calls `cb` with the (sorted) list
 * whenever anything changes in Firestore. When Firebase is not configured yet,
 * it immediately resolves with the static seed menu.
 */
export function subscribeToProducts(cb: (items: Product[]) => void): () => void {
  if (!isFirebaseConfigured || !db) {
    cb(MENU);
    return () => {};
  }

  const q = query(collection(db, PRODUCTS_COLLECTION));
  return onSnapshot(
    q,
    (snap) => {
      const items: Product[] = snap.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Product, 'id'>),
      }));
      items.sort(
        (a, b) =>
          (a.order ?? 9999) - (b.order ?? 9999) ||
          a.name.localeCompare(b.name, 'fr'),
      );
      cb(items);
    },
    (err) => {
      console.error('[products] subscribe failed, falling back to seed:', err);
      cb(MENU);
    },
  );
}

/** Create a new dish. Firestore generates the id, which becomes the product id. */
export async function createProduct(
  data: Omit<Product, 'id'>,
): Promise<string> {
  if (!db) throw new Error('Firebase non configuré');
  const ref = await addDoc(collection(db, PRODUCTS_COLLECTION), data);
  return ref.id;
}

/** Create or overwrite a dish at a fixed id (used by the seeder). */
export async function saveProductAtId(
  id: string,
  data: Omit<Product, 'id'>,
): Promise<void> {
  if (!db) throw new Error('Firebase non configuré');
  await setDoc(doc(db, PRODUCTS_COLLECTION, id), data, { merge: true });
}

/** Patch an existing dish. */
export async function updateProduct(
  id: string,
  patch: Partial<Omit<Product, 'id'>>,
): Promise<void> {
  if (!db) throw new Error('Firebase non configuré');
  await setDoc(doc(db, PRODUCTS_COLLECTION, id), patch, { merge: true });
}

/** Permanently delete a dish. */
export async function removeProduct(id: string): Promise<void> {
  if (!db) throw new Error('Firebase non configuré');
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
}

/**
 * Push the static seed menu into Firestore (creates or overwrites each item by
 * its stable id). Idempotent — safe to run repeatedly.
 */
export async function seedProducts(): Promise<void> {
  await Promise.all(
    MENU.map((p, i) =>
      saveProductAtId(p.id, { ...p, order: p.order ?? i }),
    ),
  );
}
