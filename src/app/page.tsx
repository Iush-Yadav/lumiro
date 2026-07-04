import ScrollBottle from '@/components/sections/ScrollBottle';
import Hero from '@/components/sections/Hero';
import Manifesto from '@/components/sections/Manifesto';
import Craft from '@/components/sections/Craft';
import Collection from '@/components/sections/Collection';
import Testimonials from '@/components/sections/Testimonials';
import FinalCta from '@/components/sections/FinalCta';

export default function Home() {
  return (
    <main className="relative">
      {/* Pinned, scroll-driven hand-painted bottle centerpiece */}
      <ScrollBottle />

      <div className="relative z-10">
        {/* Transparent zone — the bottle turns and recedes as you scroll */}
        <Hero />
        <Manifesto />

        {/* Opaque content — glides up over the receding bottle */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-x-0 -top-40 h-40 bg-gradient-to-b from-transparent to-paper" />
          <div className="relative bg-paper">
            <Craft />
            <Collection />
            <Testimonials />
            <FinalCta />
          </div>
        </div>
      </div>
    </main>
  );
}
