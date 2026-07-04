export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export const SITE_NAME = 'Lumiro';

export const CONTACT_EMAIL = 'hello@lumiro.art';

export const FREE_SHIPPING_THRESHOLD = 100;
export const FLAT_SHIPPING = 9;
export const TAX_RATE = 0.08;

export const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
];

/** Format a numeric price as USD. */
export function formatPrice(value: number): string {
  return `$${value.toFixed(value % 1 === 0 ? 0 : 2)}`;
}
