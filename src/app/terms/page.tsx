import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Terms of Service</h1>
      <div className="mt-10 space-y-6 leading-relaxed text-ink/70">
        <p>
          By purchasing from Lumiro you agree to these terms. Prices are listed in USD and include
          the artwork, lighting, and gift packaging described on each product page.
        </p>
        <p>
          <strong className="text-ink">Handmade variance:</strong> every piece is painted by
          hand. Small variations in brushwork and color are inherent to the craft and are not
          defects.
        </p>
        <p>
          <strong className="text-ink">Intellectual property:</strong> all designs, imagery, and
          text on this site are the property of Lumiro and may not be reproduced commercially
          without written permission.
        </p>
        <p>
          <strong className="text-ink">Safe use:</strong> bottles use low-voltage LED lighting
          and are intended for indoor decorative use. Keep away from open flames and water.
        </p>
        <p>
          These terms are governed by the laws of the seller's registered jurisdiction. If any
          clause is found unenforceable, the remainder stays in effect.
        </p>
      </div>
    </main>
  );
}
