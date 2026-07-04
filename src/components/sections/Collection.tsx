'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

const FEATURED = PRODUCTS.slice(0, 6);

export default function Collection() {
  return (
    <section className="mx-auto max-w-content px-6 py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="section-label mb-4">The Collection</p>
          <h2 className="font-display text-display-md font-light">Twelve worlds. One glow.</h2>
        </div>
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-clay transition-colors hover:text-clay"
        >
          View all pieces
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5">
            <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURED.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: (i % 3) * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProductCard product={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
