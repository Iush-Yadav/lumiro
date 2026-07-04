'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useWishlist } from '@/lib/wishlist';
import BottleArt from '@/components/product/BottleArt';
import type { Product } from '@/data/products';

const BADGE: Record<string, string> = {
  bestseller: 'Bestseller',
  limited: 'Limited',
  seasonal: 'Seasonal',
  custom: 'Made to order',
};

export default function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  const toggle = useWishlist((s) => s.toggle);
  const slugs = useWishlist((s) => s.slugs);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saved = mounted && slugs.includes(product.slug);
  const badge = product.tags.map((t) => BADGE[t]).find(Boolean);

  return (
    <article className="glass-card interactive group relative overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1.5">
      {badge && (
        <span className="absolute left-4 top-4 z-20 rounded-full border border-clay/30 bg-paper/60 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-clay backdrop-blur">
          {badge}
        </span>
      )}
      <button
        type="button"
        aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-pressed={saved}
        onClick={() => toggle(product.slug)}
        className={`absolute right-3.5 top-3.5 z-20 grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 ${
          saved
            ? 'border-blush/60 bg-blush/15 text-blush'
            : 'border-ink/10 bg-paper/40 text-ink/40 backdrop-blur hover:border-blush/40 hover:text-blush'
        }`}
      >
        <span className="text-lg leading-none">{saved ? '♥' : '♡'}</span>
      </button>

      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <BottleArt
            product={product}
            priority={priority}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        </div>
        <div className="border-t border-clay/10 p-6">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl leading-tight">{product.name}</h3>
            <p className="shrink-0 pt-1 text-lg text-clay">${product.price}</p>
          </div>
          <p className="mt-2 line-clamp-2 text-sm text-ink/55">{product.tagline}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.18em] text-clay/80 transition-colors group-hover:text-clay">
            View piece
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
              <path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
