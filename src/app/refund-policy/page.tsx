import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Refund Policy' };

export default function RefundPolicyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Refund Policy</h1>
      <div className="mt-10 space-y-6 leading-relaxed text-ink/70">
        <p>
          We want every Lumiro piece to be loved. If yours is not, here is how returns and refunds
          work.
        </p>
        <p>
          <strong className="text-ink">Stock designs:</strong> returnable within 14 days of
          delivery in original packaging and unused condition. Refunds are issued to the original
          payment method within 5 business days of the return arriving at our studio. Return
          shipping is the customer's responsibility unless the item was damaged or incorrect.
        </p>
        <p>
          <strong className="text-ink">Custom commissions:</strong> because each custom piece is
          painted to your brief, custom orders are non-returnable, except when damaged in transit
          or materially different from the approved design.
        </p>
        <p>
          <strong className="text-ink">Damaged arrivals:</strong> transit damage reported within
          48 hours with photos is replaced free of charge, or fully refunded, your choice.
        </p>
        <p>To start a return, contact us with your order number.</p>
      </div>
    </main>
  );
}
