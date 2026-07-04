'use client';

import { motion } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote:
      'It sits on our mantel and every guest asks about it. The blossoms look painted with a single hair.',
    name: 'Amelia R.',
    location: 'London',
  },
  {
    quote:
      'I bought the Galaxy edition as an anniversary gift. When the lights came on, my wife teared up.',
    name: 'Daniel K.',
    location: 'Toronto',
  },
  {
    quote:
      'The packaging alone felt like unboxing jewellery. The bottle itself is a small miracle.',
    name: 'Priya S.',
    location: 'Mumbai',
  },
];

function initials(name: string) {
  return name.split(' ').map((p) => p[0]).join('').slice(0, 2);
}

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-content px-6 py-24 md:py-32">
      <div className="text-center">
        <p className="section-label mb-4 justify-center">Voices</p>
        <h2 className="font-display text-display-md font-light">Loved in living rooms worldwide.</h2>
        <div className="mt-4 flex items-center justify-center gap-2 text-clay">
          <span aria-hidden>★★★★★</span>
          <span className="text-sm text-ink/50">4.9 from 1,200+ makers of memories</span>
        </div>
      </div>
      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            className="glass-card flex flex-col rounded-3xl p-8"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-sm text-clay" aria-hidden>★★★★★</span>
            <p className="mt-4 flex-1 font-display text-xl italic leading-relaxed text-ink/90">
              “{t.quote}”
            </p>
            <footer className="mt-6 flex items-center gap-3 border-t border-clay/10 pt-5">
              <span className="grid h-10 w-10 place-items-center rounded-full border border-clay/25 font-display text-sm text-clay">
                {initials(t.name)}
              </span>
              <span className="text-sm text-ink/70">
                {t.name}
                <span className="text-ink/40"> · {t.location}</span>
              </span>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </section>
  );
}
