import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS, productBySlug } from '@/data/products';
import { BOTTLE_SPECS, skuFor } from '@/data/specs';
import { SITE_URL, formatPrice } from '@/lib/site';
import AddToCart from '@/components/product/AddToCart';
import BottleArt from '@/components/product/BottleArt';
import ProductCard from '@/components/ui/ProductCard';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = productBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: `${product.name} — Lumiro`, description: product.description },
  };
}

const TRUST = [
  { title: 'Free shipping', body: 'On orders over $100' },
  { title: 'Signed & numbered', body: 'Certificate included' },
  { title: 'Arrives protected', body: 'Breakage fully covered' },
];

export default function ProductPage({ params }: Props) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.tags.some((t) => product.tags.includes(t)),
  ).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    sku: skuFor(product.slug),
    brand: { '@type': 'Brand', name: 'Lumiro' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/products/${product.slug}`,
    },
  };

  const specs: [string, string][] = [
    ['SKU', skuFor(product.slug)],
    ['Light color', product.lightColor],
    ['Materials', BOTTLE_SPECS.materials],
    ['Dimensions', BOTTLE_SPECS.dimensions],
    ['Weight', BOTTLE_SPECS.weight],
    ['Power', BOTTLE_SPECS.power],
    ['In the box', BOTTLE_SPECS.packageContents],
    ['Care', BOTTLE_SPECS.care],
  ];

  return (
    <main className="mx-auto min-h-screen max-w-content px-6 pb-32 pt-[calc(var(--header-h)+2rem)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-ink/40">
        <Link href="/" className="transition-colors hover:text-clay">Home</Link>
        <span>/</span>
        <Link href="/products" className="transition-colors hover:text-clay">Collection</Link>
        <span>/</span>
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Visual */}
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
          <div className="glass-card relative overflow-hidden rounded-4xl">
            <BottleArt product={product} detail priority className="h-[460px] w-full md:h-[560px]" />
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex flex-wrap gap-2">
            {product.tags.map((t) => (
              <span key={t} className="rounded-full border border-clay/25 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-clay/80">
                {t}
              </span>
            ))}
          </div>
          <h1 className="mt-5 font-display text-display-sm font-light">{product.name}</h1>
          <p className="mt-2 font-display text-xl italic text-ink/65">{product.tagline}</p>
          <p className="mt-6 text-3xl text-clay">{formatPrice(product.price)}</p>
          <p className="mt-6 leading-relaxed text-ink/70">{product.description}</p>

          <AddToCart product={product} />

          {/* Trust row */}
          <div className="mt-10 grid grid-cols-3 gap-3">
            {TRUST.map((t) => (
              <div key={t.title} className="rounded-2xl border border-clay/10 bg-ink/[0.03] p-4 text-center">
                <p className="text-sm text-ink/85">{t.title}</p>
                <p className="mt-1 text-xs text-ink/45">{t.body}</p>
              </div>
            ))}
          </div>

          {/* Specs */}
          <dl className="mt-10 divide-y divide-clay/10 border-t border-clay/10">
            {specs.map(([label, value]) => (
              <div key={label} className="grid grid-cols-3 gap-4 py-3.5 text-sm">
                <dt className="text-ink/45">{label}</dt>
                <dd className="col-span-2 text-ink/80">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-28">
          <h2 className="font-display text-display-sm font-light">You may also love</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
