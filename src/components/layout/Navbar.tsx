'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';

const LINKS = [
  { href: '/products', label: 'Collection' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const cartItems = useCart((s) => s.items);
  const wishSlugs = useWishlist((s) => s.slugs);
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock scroll when the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const count = mounted ? cartItems.reduce((n, i) => n + i.quantity, 0) : 0;
  const wishCount = mounted ? wishSlugs.length : 0;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? 'border-b border-clay/10 bg-paper/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-[var(--header-h)] max-w-content items-center justify-between px-5 md:px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="font-display text-2xl tracking-wide text-clay"
        >
          Lumiro
        </Link>

        <div className="hidden items-center gap-9 text-sm text-ink/70 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative transition-colors hover:text-clay ${isActive(l.href) ? 'text-clay' : ''}`}
            >
              {l.label}
              {isActive(l.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 h-px w-full bg-clay"
                />
              )}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <IconLink href="/wishlist" label="Wishlist" badge={wishCount}>
            <path d="M12 20s-7-4.3-9.2-8.4C1.3 8.9 2.6 5.5 5.8 5.5c1.9 0 3.2 1.2 3.9 2.4L12 10l2.3-2.1c.7-1.2 2-2.4 3.9-2.4 3.2 0 4.5 3.4 3 6.1C19 15.7 12 20 12 20Z" />
          </IconLink>
          <IconLink href="/cart" label="Cart" badge={count} solid>
            <path d="M6 7h13l-1.3 9.2a2 2 0 0 1-2 1.8H9.3a2 2 0 0 1-2-1.8L6 7Zm0 0-.6-3H3M9 11v3m6-3v3" />
          </IconLink>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="ml-1 grid h-10 w-10 place-items-center rounded-full text-ink/80 transition-colors hover:text-clay md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-2 rotate-45' : 'top-0.5'}`} />
              <span className={`absolute left-0 top-2 h-px w-5 bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? 'top-2 -rotate-45' : 'top-[0.9rem]'}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="border-t border-clay/10 bg-paper/95 px-5 py-6 backdrop-blur-xl">
              <div className="flex flex-col gap-1">
                {LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 font-display text-2xl transition-colors ${
                      isActive(l.href) ? 'text-clay' : 'text-ink/80 hover:text-clay'
                    }`}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function IconLink({
  href,
  label,
  badge,
  solid,
  children,
}: {
  href: string;
  label: string;
  badge: number;
  solid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={badge > 0 ? `${label} (${badge})` : label}
      className={`relative grid h-10 w-10 place-items-center rounded-full transition-colors hover:text-clay ${
        solid ? 'text-clay' : 'text-ink/70'
      }`}
    >
      <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </svg>
      {badge > 0 && (
        <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-clay px-1 text-[0.6rem] font-semibold text-paper">
          {badge}
        </span>
      )}
    </Link>
  );
}
