import { FloatingNav } from '@/components/FloatingNav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Story } from '@/components/Story';
import { BestSellers } from '@/components/BestSellers';
import { Reviews } from '@/components/Reviews';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <BestSellers />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}
