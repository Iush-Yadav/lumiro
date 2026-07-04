'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { productBySlug } from '@/data/products';
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, TAX_RATE, formatPrice } from '@/lib/site';
import BottleArt from '@/components/product/BottleArt';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, remove, setQuantity } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <main className="min-h-screen pt-32" />;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Your cart</h1>

      {items.length === 0 ? (
        <div className="glass-card mt-12 rounded-4xl px-6 py-20 text-center">
          <p className="font-display text-2xl text-ink/80">Your cart is waiting for its first glow.</p>
          <p className="mt-2 text-sm text-ink/50">Add a piece and it will keep here for you.</p>
          <div className="mt-8">
            <Button href="/products">Explore the collection</Button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {/* Free shipping progress */}
            <div className="glass-card rounded-2xl p-5">
              <p className="text-sm text-ink/70">
                {remaining > 0 ? (
                  <>You&apos;re <span className="text-clay">{formatPrice(remaining)}</span> away from free shipping.</>
                ) : (
                  <span className="text-clay">You&apos;ve unlocked free shipping ✦</span>
                )}
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-gradient-to-r from-clay to-clay transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {items.map((item) => {
              const product = productBySlug(item.slug);
              return (
                <div key={item.slug} className="glass-card flex items-center gap-4 rounded-2xl p-4 sm:gap-6 sm:p-5">
                  {product && (
                    <Link href={`/products/${item.slug}`} className="shrink-0">
                      <BottleArt product={product} className="h-24 w-20 rounded-xl sm:h-28 sm:w-24" />
                    </Link>
                  )}
                  <div className="min-w-0 flex-1">
                    <Link href={`/products/${item.slug}`} className="font-display text-xl transition-colors hover:text-clay">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-clay">{formatPrice(item.price)}</p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="flex items-center rounded-full border border-clay/30">
                        <button type="button" aria-label="Decrease" className="grid h-8 w-8 place-items-center text-clay hover:text-clay" onClick={() => setQuantity(item.slug, item.quantity - 1)}>−</button>
                        <span className="w-7 text-center text-sm tabular-nums">{item.quantity}</span>
                        <button type="button" aria-label="Increase" className="grid h-8 w-8 place-items-center text-clay hover:text-clay" onClick={() => setQuantity(item.slug, item.quantity + 1)}>+</button>
                      </div>
                      <button type="button" className="text-xs uppercase tracking-[0.15em] text-ink/40 transition-colors hover:text-blush" onClick={() => remove(item.slug)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="shrink-0 self-start pt-1 text-sm text-ink/80">{formatPrice(item.price * item.quantity)}</p>
                </div>
              );
            })}
          </div>

          <aside className="glass-card h-fit rounded-3xl p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
            <h2 className="font-display text-2xl">Summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/60">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink/60">Tax (est.)</dt><dd className="tabular-nums">{formatPrice(tax)}</dd></div>
              <div className="flex justify-between border-t border-clay/20 pt-3 text-base"><dt>Total</dt><dd className="tabular-nums text-clay">{formatPrice(total)}</dd></div>
            </dl>
            <div className="mt-8">
              <Button href="/checkout" full>Checkout</Button>
            </div>
            <Link href="/products" className="mt-4 block text-center text-xs uppercase tracking-[0.15em] text-ink/45 transition-colors hover:text-clay">
              Continue shopping
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
