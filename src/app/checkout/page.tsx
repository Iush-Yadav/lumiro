'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { FLAT_SHIPPING, FREE_SHIPPING_THRESHOLD, TAX_RATE, formatPrice } from '@/lib/site';
import Button from '@/components/ui/Button';

const PAYMENT_METHODS = ['Card (Stripe)', 'PayPal', 'UPI', 'Razorpay'];

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const [mounted, setMounted] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  useEffect(() => setMounted(true), []);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!mounted) return <main className="min-h-screen pt-32" />;

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total, method }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        clear();
        setOrderId(data.orderId);
      } else {
        alert(data.error || 'Checkout failed');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-clay/30 text-clay">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 13 4 4 10-11" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <p className="section-label mb-4 mt-6 justify-center">Order confirmed</p>
        <h1 className="font-display text-display-sm font-light">Thank you.</h1>
        <p className="mt-4 text-ink/70">
          Your order <span className="text-clay">{orderId}</span> is being hand-prepared in our
          atelier. A confirmation email is on its way.
        </p>
        <div className="mt-10">
          <Button href="/products">Continue browsing</Button>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display text-display-sm font-light">Nothing to check out yet.</h1>
        <div className="mt-8">
          <Button href="/products">Explore the collection</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Checkout</h1>
      <form
        className="mt-10 grid gap-8 lg:grid-cols-3"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6 lg:col-span-2">
          <fieldset className="glass-card rounded-3xl p-6 sm:p-8">
            <legend className="section-label px-2">Shipping details</legend>
            <div className="mt-2 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Full name" autoComplete="name" className="input-field" />
              <input required type="email" placeholder="Email" autoComplete="email" className="input-field" />
              <input required placeholder="Address" autoComplete="street-address" className="input-field sm:col-span-2" />
              <input required placeholder="City" autoComplete="address-level2" className="input-field" />
              <input required placeholder="Postal code" autoComplete="postal-code" className="input-field" />
              <input required placeholder="Country" autoComplete="country-name" className="input-field sm:col-span-2" />
            </div>
          </fieldset>
          <fieldset className="glass-card rounded-3xl p-6 sm:p-8">
            <legend className="section-label px-2">Payment method</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {PAYMENT_METHODS.map((m) => (
                <label
                  key={m}
                  className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 text-sm transition-colors ${
                    method === m ? 'border-clay bg-clay/5 text-clay' : 'border-clay/15 text-ink/60 hover:border-clay/40'
                  }`}
                >
                  <span className={`grid h-4 w-4 place-items-center rounded-full border ${method === m ? 'border-clay' : 'border-ink/30'}`}>
                    {method === m && <span className="h-2 w-2 rounded-full bg-clay" />}
                  </span>
                  <input type="radio" name="payment" value={m} checked={method === m} onChange={() => setMethod(m)} className="sr-only" />
                  {m}
                </label>
              ))}
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink/40">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
              Secured by the selected provider at the next step.
            </p>
          </fieldset>
        </div>

        <aside className="glass-card h-fit rounded-3xl p-8 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)]">
          <h2 className="font-display text-2xl">Order</h2>
          <ul className="mt-6 space-y-3 text-sm text-ink/70">
            {items.map((i) => (
              <li key={i.slug} className="flex justify-between gap-4">
                <span className="min-w-0 truncate">{i.name} <span className="text-ink/40">× {i.quantity}</span></span>
                <span className="shrink-0 tabular-nums">{formatPrice(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-clay/15 pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-ink/60">Subtotal</dt><dd className="tabular-nums">{formatPrice(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink/60">Shipping</dt><dd className="tabular-nums">{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-ink/60">Tax</dt><dd className="tabular-nums">{formatPrice(tax)}</dd></div>
          </dl>
          <p className="mt-4 flex justify-between border-t border-clay/20 pt-4 text-base">
            <span>Total</span>
            <span className="tabular-nums text-clay">{formatPrice(total)}</span>
          </p>
          <div className="mt-8">
            <Button type="submit" full disabled={isSubmitting}>
              {isSubmitting ? 'Processing...' : 'Place order'}
            </Button>
          </div>
        </aside>
      </form>
    </main>
  );
}
