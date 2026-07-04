'use client';

import { motion } from 'framer-motion';

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-15%' },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const },
};

export default function Manifesto() {
  return (
    <section id="craft" className="relative mx-auto flex min-h-[100svh] max-w-content flex-col justify-center px-6 py-24">
      <div className="grid gap-y-24 md:grid-cols-2 md:gap-x-24">
        <motion.div {...reveal} className="md:pr-8 md:pt-10">
          <p className="section-label mb-5">The ritual</p>
          <p className="text-shadow-glow font-display text-3xl font-light leading-snug md:text-4xl">
            Six to eleven hours with a single-hair brush, before the first light ever goes in.
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
            No prints. No transfers. Every petal, wave, and star is laid down by hand on
            recycled glass, then wired with a warm copper LED string.
          </p>
        </motion.div>

        <motion.div {...reveal} className="self-end md:pl-8 md:text-right">
          <p className="section-label mb-5 md:justify-end">The moment</p>
          <p className="text-shadow-glow font-display text-3xl font-light leading-snug md:text-4xl">
            Then the lights come on — and the painting changes character, the way a city does at dusk.
          </p>
          <p className="ml-auto mt-5 max-w-sm text-sm leading-relaxed text-ink/60">
            Numbered in small editions and retired when they sell out. Each ships with a signed
            certificate of authenticity.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
