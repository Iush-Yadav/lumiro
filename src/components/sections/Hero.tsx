'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-between px-6 pb-10 pt-[calc(var(--header-h)+3rem)] text-center">
      {/* Top — eyebrow + headline */}
      <div className="max-w-3xl">
        <motion.p
          className="section-label mb-6 justify-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.9, ease }}
        >
          Hand-painted · Illuminated · One of one
        </motion.p>
        <motion.h1
          className="text-shadow-glow font-display text-display-lg font-light"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 1.1, ease }}
        >
          Every bottle holds
          <br />
          <span className="text-gilded italic">a story.</span>
        </motion.h1>
      </div>

      {/* Bottom — subcopy, CTAs, scroll cue */}
      <div className="flex flex-col items-center">
        <motion.p
          className="text-shadow-glow max-w-md text-balance text-base text-ink/75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1.1, ease }}
        >
          Fine-brush artistry on recycled glass, lit from within. Limited editions,
          numbered by hand, no two ever alike.
        </motion.p>
        <motion.div
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.05, duration: 0.9, ease }}
        >
          <Button href="/products">Shop the collection</Button>
          <Button href="/about" variant="ghost">
            Our craft
          </Button>
        </motion.div>

        <motion.a
          href="#craft"
          aria-label="Scroll to explore"
          className="group mt-12 flex flex-col items-center gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-ink/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          Scroll
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-ink/20 p-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-clay" />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
