import type { Metadata, Viewport } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { SITE_URL } from '@/lib/site';
import './globals.css';

// Retro-editorial display serif — high contrast, expressive italics
const display = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz', 'SOFT'],
  variable: '--font-display',
  display: 'swap',
});

const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Lumiro — Luxury Hand-Painted Illuminated Bottle Art',
    template: '%s — Lumiro',
  },
  description:
    'Hand-painted, individually crafted glass bottles illuminated from within. Limited collections of luxury handcrafted decor.',
  openGraph: {
    title: 'Lumiro — Luxury Hand-Painted Illuminated Bottle Art',
    description:
      'Hand-painted, individually crafted glass bottles illuminated from within.',
    type: 'website',
    siteName: 'Lumiro',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lumiro — Illuminated Bottle Art',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#f7f4ee',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-clay focus:px-5 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <div id="main">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
