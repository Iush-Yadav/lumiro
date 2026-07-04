'use client';

import { motion } from 'framer-motion';
import BorderGlow from '@/components/ui/BorderGlow/BorderGlow';

const QUALITIES = [
  'Hand Painted',
  'Recycled Glass',
  'Non-Toxic Paint',
  'Numbered Editions',
  'Warm LED Glow',
  'Plastic-Free Packaging',
  'Certificate of Authenticity',
  'Ships Worldwide',
];

const FEATURES: { title: string; body: string; icon: JSX.Element }[] = [
  {
    title: 'Painted by hand',
    body: 'Fine-brush detail on every piece — no two bottles are ever identical.',
    icon: (
      <path d="M4 20c3-1 5-3 7-6M14 8l4-4 2 2-4 4M14 8l-2 2 0 0M14 8l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: 'Lit from within',
    body: 'A warm copper LED string, 50,000-hour rated, on battery or USB-C.',
    icon: (
      <path d="M9 18h6m-5 3h4M12 3a6 6 0 0 1 4 10.5c-.7.6-1 1.2-1 2.5H9c0-1.3-.3-1.9-1-2.5A6 6 0 0 1 12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    ),
  },
  {
    title: 'Made to last',
    body: 'Rigid gift box, moulded inserts, double-walled carton. Breakage covered.',
    icon: (
      <path d="M12 3 4 6.5v6c0 5 3.4 7.6 8 8.5 4.6-.9 8-3.5 8-8.5v-6L12 3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" fill="none" />
    ),
  },
];

export default function Craft() {
  return (
    <section className="py-24 md:py-32">
      {/* Marquee band */}
      <div className="border-y border-clay/10 py-5">
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-10 whitespace-nowrap">
            {[...QUALITIES, ...QUALITIES].map((q, i) => (
              <span key={i} className="flex items-center gap-10 font-display text-xl text-ink/50">
                {q}
                <span className="text-clay/50">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Feature trio */}
      <div className="mx-auto mt-20 max-w-content px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <BorderGlow
                alwaysOn
                backgroundColor="#ffffff"
                borderRadius={24}
                glowRadius={38}
                glowIntensity={1.6}
                glowColor="16 72 58"
                pulseDuration={3.6 + i * 0.4}
                colors={['#b5532e', '#c98a7a', '#c9724f']}
                className="h-full"
              >
                <div className="p-8">
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-clay/25 text-clay">
                    <svg width="22" height="22" viewBox="0 0 24 24">{f.icon}</svg>
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-ink">{f.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/60">{f.body}</p>
                </div>
              </BorderGlow>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
