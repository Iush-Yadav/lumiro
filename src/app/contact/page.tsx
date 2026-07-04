'use client';

import { useState } from 'react';
import { CONTACT_EMAIL } from '@/lib/site';
import Button from '@/components/ui/Button';

const REASONS = [
  { title: 'Custom commissions', body: 'Weddings, anniversaries, corporate gifts — painted to your brief.' },
  { title: 'Order support', body: 'Questions about an existing order, shipping, or returns.' },
  { title: 'Wholesale', body: 'Stocking Lumiro in your boutique or gallery.' },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <p className="section-label mb-4">Contact</p>
      <h1 className="font-display text-display-md font-light">Say hello.</h1>
      <p className="mt-6 max-w-xl text-ink/70">
        Questions, custom commissions, or corporate gifting — write to us at{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="text-clay underline-offset-4 hover:underline">
          {CONTACT_EMAIL}
        </a>{' '}
        or use the form. We reply within one business day.
      </p>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-3">
          {REASONS.map((r) => (
            <div key={r.title} className="glass-card rounded-2xl p-6">
              <p className="font-display text-xl text-ink/90">{r.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{r.body}</p>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-4xl p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-clay/30 text-clay">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 13 4 4 10-11" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <p className="mt-5 font-display text-2xl">Message received.</p>
              <p className="mt-2 text-sm text-ink/55">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form 
              className="space-y-4" 
              onSubmit={async (e) => { 
                e.preventDefault(); 
                setIsSubmitting(true);
                
                try {
                  const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({}),
                  });
                  const data = await res.json();
                  if (data.success) {
                    setSent(true);
                  } else {
                    alert(data.error || 'Failed to send message');
                  }
                } catch (err) {
                  alert('Network error. Please try again.');
                } finally {
                  setIsSubmitting(false);
                }
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Your name" autoComplete="name" className="input-field" disabled={isSubmitting} />
                <input required type="email" placeholder="Your email" autoComplete="email" className="input-field" disabled={isSubmitting} />
              </div>
              <input placeholder="Subject" className="input-field" disabled={isSubmitting} />
              <textarea required placeholder="Your message" rows={6} className="input-field resize-none" disabled={isSubmitting} />
              <Button type="submit" full disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send message'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
