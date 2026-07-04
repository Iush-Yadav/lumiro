import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story of Lumiro: hand-painted illuminated bottle art, crafted one piece at a time.',
};

export default function AboutPage() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <p className="section-label mb-4">Our Story</p>
      <h1 className="font-display text-display-md font-light">Light, held in glass.</h1>
      <div className="mt-10 space-y-6 leading-relaxed text-ink/70">
        <p>
          Lumiro began at a kitchen table with a single empty bottle, a fine brush, and a string of
          fairy lights. What started as a gift for a friend became a quiet obsession: how much
          feeling can one small vessel hold?
        </p>
        <p>
          Every Lumiro piece is painted entirely by hand. No prints, no transfers, no shortcuts.
          A single bottle takes between six and eleven hours, from the first wash of background
          color to the final highlight on a blossom petal. Then the lights go in, and the painting
          changes character completely, the way a city does at dusk.
        </p>
        <p>
          We work in small, numbered editions. When a collection sells out, it is retired. That is
          not a marketing tactic; it is simply how hands work. Each bottle ships with a signed
          certificate of authenticity and a care card.
        </p>
        <p>
          Our glass is recycled, our paints are non-toxic, and our packaging is plastic-free.
          Beautiful things should not cost the world anything.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-3 gap-4 text-center sm:gap-6">
        {[
          ['6-11h', 'to paint each piece'],
          ['100%', 'hand-painted'],
          ['0', 'plastic in packaging'],
        ].map(([stat, label]) => (
          <div key={label} className="glass-card rounded-2xl p-5 sm:p-6">
            <p className="font-display text-3xl text-gilded sm:text-4xl">{stat}</p>
            <p className="mt-2 text-xs text-ink/55">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-16">
        <a href="/products" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-clay to-clay px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-paper transition-all hover:shadow-glow">
          Explore the collection
        </a>
      </div>
    </main>
  );
}
