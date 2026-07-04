'use client';

import { useEffect, useState } from 'react';
import { PRODUCTS } from '@/data/products';
import { useWishlist } from '@/lib/wishlist';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';

export default function WishlistPage() {
  const slugs = useWishlist((s) => s.slugs);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const saved = mounted ? PRODUCTS.filter((p) => slugs.includes(p.slug)) : [];

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Wishlist</h1>
      {mounted && saved.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-ink/60">No treasures saved yet. Tap the heart on any bottle.</p>
          <div className="mt-8">
            <Button href="/products">Explore The Collection</Button>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {saved.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </main>
  );
}
