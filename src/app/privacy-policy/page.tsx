import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <h1 className="font-display text-display-sm font-light">Privacy Policy</h1>
      <div className="mt-10 space-y-6 leading-relaxed text-ink/70">
        <p>
          Lumiro collects only the information needed to fulfil your order and provide support:
          your name, email, shipping address, and order history. Payment details are handled
          entirely by our payment providers and never touch our servers.
        </p>
        <p>
          We do not sell, rent, or share your personal data with third parties for marketing. We
          use it to process orders, respond to enquiries, and, only if you opt in, send occasional
          collection announcements. You can unsubscribe at any time with one click.
        </p>
        <p>
          Cookies on this site are limited to essential functionality such as your cart and
          wishlist, which are stored locally in your browser.
        </p>
        <p>
          You may request a copy or deletion of your data at any time by contacting us. We respond
          to all data requests within 30 days.
        </p>
      </div>
    </main>
  );
}
