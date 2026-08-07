import { FloatingNav } from '@/components/FloatingNav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Story } from '@/components/Story';
import { Menu } from '@/components/Menu';
import { Reviews } from '@/components/Reviews';
import { Footer } from '@/components/Footer';
import { CartPanel } from '@/components/CartPanel';
import { CartFloating } from '@/components/CartFloating';
import { Toast } from '@/components/Toast';

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <Marquee />
        <Story />
        <Menu />
        <Reviews />
      </main>
      <Footer />
      <CartPanel />
      <CartFloating />
      <Toast />
    </>
  );
}
