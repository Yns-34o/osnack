import type { Metadata } from 'next';
import { FloatingNav } from '@/components/FloatingNav';
import { History } from '@/components/History';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: "L'Histoire du Fast-Food — O'Snack Torcy",
  description:
    "Deux mille ans d'histoire de la street-food, des thermopolia romains au burger gourmet d'aujourd'hui — et la qualité fait maison d'O'Snack Torcy.",
};

export default function HistoirePage() {
  return (
    <>
      <FloatingNav />
      <main>
        <History />
      </main>
      <Footer />
    </>
  );
}
