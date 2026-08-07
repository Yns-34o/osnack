import type { Metadata } from 'next';
import { FloatingNav } from '@/components/FloatingNav';
import { Menu } from '@/components/Menu';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "La Carte — O'Snack Torcy",
  description:
    "Toute la carte d'O'Snack Torcy : sandwichs au four, burgers classiques et gourmets, menus, crêpes, tex-mex, desserts et milkshakes maison. 57 Rue de Paris, 77220 Torcy.",
};

export default function CartePage() {
  return (
    <>
      <FloatingNav />
      <main>
        <Menu />
      </main>
      <Footer />
    </>
  );
}
