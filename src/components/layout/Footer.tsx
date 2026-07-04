'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CONTACT_EMAIL, SOCIALS } from '@/lib/site';

const SHOP_LINKS = [
  { href: '/products', label: 'All pieces' },
  { href: '/wishlist', label: 'Wishlist' },
  { href: '/about', label: 'Our story' },
  { href: '/contact', label: 'Commissions' },
];

const POLICY_LINKS = [
  { href: '/shipping-policy', label: 'Shipping' },
  { href: '/refund-policy', label: 'Refunds' },
  { href: '/privacy-policy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <footer className="relative z-10 border-t border-clay/10 bg-sand">
      <div className="mx-auto max-w-content px-6 py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          <div>
            <p className="font-display text-3xl text-clay">Lumiro</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/55">
              Hand-painted illuminated bottle art. Each piece individually crafted, numbered,
              and lit from within. No two alike.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block text-sm text-clay transition-colors hover:text-clay"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <FooterCol title="Shop" links={SHOP_LINKS} />
          <FooterCol title="Company" links={POLICY_LINKS} />

          <div>
            <p className="section-label mb-4">Stay illuminated</p>
            <p className="mb-4 text-sm text-ink/55">
              New editions, quietly announced. No spam, ever.
            </p>
            {subscribed ? (
              <p className="rounded-xl border border-clay/25 bg-clay/5 px-4 py-3 text-sm text-clay">
                Welcome to the atelier. Watch your inbox.
              </p>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={async (e) => {
                  e.preventDefault();
                  if (!email.includes('@')) return;
                  setIsSubmitting(true);
                  try {
                    const res = await fetch('/api/newsletter', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      setSubscribed(true);
                    } else {
                      alert(data.error || 'Subscription failed');
                    }
                  } catch (err) {
                    alert('Network error. Please try again.');
                  } finally {
                    setIsSubmitting(false);
                  }
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  aria-label="Email address"
                  disabled={isSubmitting}
                  className="input-field flex-1 rounded-full disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 rounded-full bg-gradient-to-b from-clay to-clay px-5 py-2.5 text-sm font-medium text-paper transition-all hover:shadow-glow-soft disabled:opacity-50"
                >
                  {isSubmitting ? '...' : 'Join'}
                </button>
              </form>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-clay/10 pt-8 sm:flex-row">
          <p className="text-xs text-ink/40">
            © {new Date().getFullYear()} Lumiro. Handcrafted with light.
          </p>
          <div className="flex items-center gap-6">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.18em] text-ink/50 transition-colors hover:text-clay"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <p className="section-label mb-4">{title}</p>
      <ul className="space-y-2.5 text-sm text-ink/55">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-clay">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
