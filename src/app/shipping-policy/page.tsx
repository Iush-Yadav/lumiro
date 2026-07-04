import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipping Policy' };

export default function ShippingPolicyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Shipping Policy</h1>
      <div className="mt-10 space-y-6 leading-relaxed text-ink/70">
        <p>
          Every Lumiro piece is made to survive its journey. Bottles ship in a rigid gift box with
          moulded inserts inside a double-walled carton, with fragile handling labels.
        </p>
        <p>
          <strong className="text-ink">Processing time:</strong> stock designs ship within 2
          business days. Custom commissions ship on the agreed date, typically 2 to 3 weeks after
          design approval.
        </p>
        <p>
          <strong className="text-ink">Delivery:</strong> domestic orders arrive in 3 to 5
          business days. International delivery takes 7 to 14 business days depending on
          destination and customs. Tracking is provided for every order.
        </p>
        <p>
          <strong className="text-ink">Costs:</strong> shipping is free on orders over $100. A
          flat $9 fee applies to smaller orders. International duties, where applicable, are shown
          at checkout.
        </p>
        <p>
          <strong className="text-ink">Damage in transit:</strong> if your bottle arrives
          damaged, photograph the packaging and piece and contact us within 48 hours. We replace
          transit-damaged items free of charge.
        </p>
      </div>
    </main>
  );
}
