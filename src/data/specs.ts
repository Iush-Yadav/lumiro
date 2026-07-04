export const BOTTLE_SPECS = {
  materials: 'Recycled glass, non-toxic acrylic paint, copper LED string',
  dimensions: '9 cm × 9 cm × 25 cm',
  weight: '620 g',
  power: '3 × AA batteries (included) or USB-C',
  packageContents:
    'Illuminated bottle, luxury gift box, care card, certificate of authenticity',
  care: 'Wipe gently with a dry microfibre cloth. Keep away from direct sunlight and moisture.',
} as const;

export function skuFor(slug: string): string {
  return `LMR-${slug.toUpperCase().replace(/-/g, '').slice(0, 10)}`;
}
