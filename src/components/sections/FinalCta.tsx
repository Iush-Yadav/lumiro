'use client';

import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(181,83,46,0.07), transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <motion.p
          className="section-label mb-6 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Limited editions
        </motion.p>
        <motion.h2
          className="font-display text-display-lg font-light"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          Bring art into <span className="text-gilded italic">your home.</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-5 max-w-md text-ink/65"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          Free shipping over $100 · Signed certificate · 14-day returns on stock designs.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="mt-10 flex flex-wrap justify-center gap-3"
        >
          <Button href="/products">Shop the collection</Button>
          <Button href="/contact" variant="ghost">Commission a piece</Button>
        </motion.div>
      </div>
    </section>
  );
}
