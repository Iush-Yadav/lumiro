export type Motif =
  | 'blossom'
  | 'stars'
  | 'waves'
  | 'aurora'
  | 'forest'
  | 'lavender'
  | 'sun'
  | 'mandala'
  | 'wave'
  | 'snow'
  | 'floral'
  | 'stroke';

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  accent: string;
  lightColor: string;
  tags: string[];
  /** Real product photograph (transparent PNG), when available. */
  image?: string;
  /** Procedural painted-scene palette + motif for products without a photo. */
  visual: { motif: Motif; colors: [string, string, string] };
};

export const PRODUCTS: Product[] = [
  {
    slug: 'cherry-blossom',
    name: 'Cherry Blossom',
    tagline: 'A spring evening in Kyoto, sealed in glass.',
    description:
      'A hand-painted sakura branch winds around warm fairy lights, casting soft pink shadows across the room.',
    price: 89,
    accent: '#e8b4c0',
    lightColor: 'Warm White',
    tags: ['floral', 'bestseller'],
    image: '/bottle.png',
    visual: { motif: 'blossom', colors: ['#e8b4c0', '#c0392b', '#3a2a1e'] },
  },
  {
    slug: 'galaxy',
    name: 'Galaxy',
    tagline: 'A private nebula for your nightstand.',
    description:
      'Layers of deep indigo and violet pigment swirl around cool-white micro lights, like starlight through cosmic dust.',
    price: 99,
    accent: '#7b6cf6',
    lightColor: 'Cool White',
    tags: ['celestial', 'bestseller'],
    visual: { motif: 'stars', colors: ['#7b6cf6', '#2a2266', '#e7d4ff'] },
  },
  {
    slug: 'ocean',
    name: 'Ocean',
    tagline: 'Bioluminescent tides, bottled.',
    description:
      'Hand-painted waves in teal and foam white glow from within, evoking moonlit surf on a quiet shore.',
    price: 89,
    accent: '#4fd1c5',
    lightColor: 'Aqua',
    tags: ['nature'],
    visual: { motif: 'waves', colors: ['#4fd1c5', '#12505a', '#d9fbf5'] },
  },
  {
    slug: 'northern-lights',
    name: 'Northern Lights',
    tagline: 'Aurora borealis over a silent fjord.',
    description:
      'Ribbons of emerald and violet sweep across the glass, illuminated by slowly shifting cool light.',
    price: 109,
    accent: '#48e5a3',
    lightColor: 'Multi',
    tags: ['celestial', 'limited'],
    visual: { motif: 'aurora', colors: ['#48e5a3', '#7b6cf6', '#0f3d3a'] },
  },
  {
    slug: 'mountain-forest',
    name: 'Mountain Forest',
    tagline: 'Pine silhouettes under amber dusk.',
    description:
      'A layered alpine treeline painted in deep greens, backlit by a warm amber glow like a cabin window at dusk.',
    price: 89,
    accent: '#3e7c4f',
    lightColor: 'Amber',
    tags: ['nature'],
    visual: { motif: 'forest', colors: ['#3e7c4f', '#16241a', '#ffb56b'] },
  },
  {
    slug: 'lavender-garden',
    name: 'Lavender Garden',
    tagline: 'Provence at golden hour.',
    description:
      'Rows of hand-dotted lavender sway beneath a honey-warm glow, calm enough to fall asleep to.',
    price: 85,
    accent: '#b79ce8',
    lightColor: 'Warm White',
    tags: ['floral'],
    visual: { motif: 'lavender', colors: ['#b79ce8', '#5b3f86', '#f0e6ff'] },
  },
  {
    slug: 'sunflower',
    name: 'Sunflower',
    tagline: 'A jar of July.',
    description:
      'Bold golden petals painted stroke by stroke, radiating a bright, joyful warmth into any room.',
    price: 85,
    accent: '#f2c14e',
    lightColor: 'Warm White',
    tags: ['floral'],
    visual: { motif: 'sun', colors: ['#f2c14e', '#b5651d', '#fff1c2'] },
  },
  {
    slug: 'mandala',
    name: 'Mandala',
    tagline: 'Meditation in light and line.',
    description:
      'An intricate hand-painted mandala wraps the full circumference, glowing like stained glass at night.',
    price: 119,
    accent: '#d98e5f',
    lightColor: 'Warm White',
    tags: ['artistic', 'limited'],
    visual: { motif: 'mandala', colors: ['#d98e5f', '#7a3b1d', '#ffe0c2'] },
  },
  {
    slug: 'ukiyo',
    name: 'Ukiyo',
    tagline: 'The great wave, reimagined in glass.',
    description:
      'Inspired by classic Japanese woodblock art, indigo waves crest around a glowing amber horizon.',
    price: 119,
    accent: '#3b6ea5',
    lightColor: 'Amber',
    tags: ['artistic', 'limited'],
    visual: { motif: 'wave', colors: ['#3b6ea5', '#12294a', '#ffd59e'] },
  },
  {
    slug: 'christmas-edition',
    name: 'Christmas Edition',
    tagline: 'Snowfall you can keep.',
    description:
      'A snow-dusted village scene with hand-painted rooftops, lit by twinkling warm lights. Seasonal release.',
    price: 95,
    accent: '#c0392b',
    lightColor: 'Twinkle Warm',
    tags: ['seasonal', 'gift'],
    visual: { motif: 'snow', colors: ['#c0392b', '#1f4535', '#ffffff'] },
  },
  {
    slug: 'wedding-edition',
    name: 'Wedding Edition',
    tagline: 'Two names. One light.',
    description:
      'Ivory florals and gold leaf accents frame space for hand-lettered names and a date. Made to order.',
    price: 139,
    accent: '#e9dcc9',
    lightColor: 'Champagne',
    tags: ['custom', 'gift', 'limited'],
    visual: { motif: 'floral', colors: ['#e9dcc9', '#c9a86a', '#fff7ec'] },
  },
  {
    slug: 'minimal-white-gold',
    name: 'Minimal White Gold',
    tagline: 'Quiet luxury, distilled.',
    description:
      'A single brushstroke of gold across frosted white glass. For rooms that whisper rather than shout.',
    price: 129,
    accent: '#c9a86a',
    lightColor: 'Champagne',
    tags: ['minimal', 'limited'],
    visual: { motif: 'stroke', colors: ['#c9a86a', '#8a6a3a', '#fbf6ea'] },
  },
];

export function productBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
