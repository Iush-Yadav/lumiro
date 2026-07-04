'use client';

import { useMemo, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/ui/ProductCard';

const TAGS = ['all', 'bestseller', 'floral', 'celestial', 'nature', 'artistic', 'minimal', 'seasonal', 'gift', 'limited'];
const SORTS = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'name', label: 'Name: A–Z' },
] as const;

type SortKey = (typeof SORTS)[number]['key'];

export default function ProductsPage() {
  const [tag, setTag] = useState('all');
  const [sort, setSort] = useState<SortKey>('featured');

  const filtered = useMemo(() => {
    const base = tag === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.tags.includes(tag));
    const arr = [...base];
    switch (sort) {
      case 'price-asc':
        return arr.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return arr.sort((a, b) => b.price - a.price);
      case 'name':
        return arr.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return arr;
    }
  }, [tag, sort]);

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-32 pt-[calc(var(--header-h)+3rem)]">
      <header className="max-w-2xl">
        <p className="section-label mb-4">The Collection</p>
        <h1 className="font-display text-display-md font-light">Illuminated bottle art</h1>
        <p className="mt-4 text-ink/60">
          Twelve hand-painted worlds, each numbered and lit from within. Filter to find the one
          that speaks to your room.
        </p>
      </header>

      <div className="mt-12 flex flex-col gap-5 border-y border-clay/10 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="mask-fade-x -mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.15em] transition-colors ${
                tag === t
                  ? 'border-clay bg-clay text-paper'
                  : 'border-clay/25 text-ink/55 hover:border-clay/60 hover:text-clay'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span className="whitespace-nowrap text-xs text-ink/40">{filtered.length} pieces</span>
          <label className="relative">
            <span className="sr-only">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="cursor-pointer appearance-none rounded-full border border-clay/25 bg-transparent py-2 pl-4 pr-9 text-xs text-ink/70 outline-none transition-colors hover:border-clay/60 focus:border-clay [&>option]:bg-paper [&>option]:text-ink"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-clay" width="10" height="10" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i < 3} />
        ))}
      </div>
    </main>
  );
}
