import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about Lumiro illuminated bottle art.',
};

const FAQS: [string, string][] = [
  [
    'Is every bottle really painted by hand?',
    'Yes. Every piece is painted individually with fine brushes and non-toxic acrylics. No prints or decals are used, so no two bottles are ever identical.',
  ],
  [
    'How long do the lights last?',
    'The copper LED string is rated for around 50,000 hours. It runs on 3 AA batteries (included) or USB-C, and the string is replaceable.',
  ],
  [
    'Can I request a custom design?',
    'Absolutely. Custom commissions for weddings, anniversaries, and corporate gifts are our favourite work. Reach out via the contact page with your idea.',
  ],
  [
    'How is the bottle shipped?',
    'Each bottle ships in a rigid gift box with moulded protection, inside a double-walled shipping carton. Breakage in transit is fully covered.',
  ],
  [
    'What is your return policy?',
    'Returns are accepted within 14 days of delivery for stock designs. Custom pieces are non-returnable unless damaged in transit. See our refund policy for details.',
  ],
  [
    'Do you ship internationally?',
    'Yes, we ship worldwide. Duties and taxes for international orders are calculated at checkout where applicable.',
  ],
];

export default function FaqPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <p className="section-label mb-4">Help</p>
      <h1 className="font-display text-display-md font-light">Frequently asked.</h1>
      <div className="mt-12 space-y-3">
        {FAQS.map(([q, a]) => (
          <details key={q} className="glass-card group rounded-2xl p-6 transition-colors [&[open]]:border-clay/30">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-xl transition-colors group-open:text-clay">
              {q}
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-clay/30 text-clay transition-transform duration-300 group-open:rotate-45">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </span>
            </summary>
            <p className="mt-4 leading-relaxed text-ink/65">{a}</p>
          </details>
        ))}
      </div>

      <div className="glass-card mt-10 flex flex-col items-start gap-4 rounded-3xl p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-2xl">Still have a question?</p>
          <p className="mt-1 text-sm text-ink/55">We reply within one business day.</p>
        </div>
        <a href="/contact" className="shrink-0 rounded-full border border-clay/40 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] text-clay transition-colors hover:border-clay hover:text-clay">
          Contact us
        </a>
      </div>
    </main>
  );
}
