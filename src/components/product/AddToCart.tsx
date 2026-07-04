'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/lib/cart';
import Button from '@/components/ui/Button';
import type { Product } from '@/data/products';

export default function AddToCart({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    add({ slug: product.slug, name: product.name, price: product.price }, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border border-clay/30">
          <button
            type="button"
            aria-label="Decrease quantity"
            className="grid h-11 w-11 place-items-center text-lg text-clay transition-colors hover:text-clay disabled:opacity-30"
            disabled={qty <= 1}
            onClick={() => setQty((q) => Math.max(1, q - 1))}
          >
            −
          </button>
          <span className="w-8 text-center tabular-nums">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            className="grid h-11 w-11 place-items-center text-lg text-clay transition-colors hover:text-clay disabled:opacity-30"
            disabled={qty >= 10}
            onClick={() => setQty((q) => Math.min(10, q + 1))}
          >
            +
          </button>
        </div>
        <Button variant="ghost" onClick={addToCart} className="flex-1 sm:flex-none">
          {added ? 'Added ✓' : 'Add to cart'}
        </Button>
        <Button
          className="flex-1 sm:flex-none"
          onClick={() => {
            addToCart();
            router.push('/checkout');
          }}
        >
          Buy now
        </Button>
      </div>
      <p className="mt-3 flex items-center gap-2 text-xs text-ink/45">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
        In stock · ships within 2 business days
      </p>
    </div>
  );
}
