import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm paper base + elevation scale
        paper: '#f7f4ee',
        'paper-2': '#f1ede4',
        sand: '#ece7dc',
        'sand-2': '#e2dccd',
        // Ink (warm near-black) + muted text
        ink: '#1c1815',
        'ink-2': '#2a2521',
        'ink-soft': '#4a433c',
        cream: '#f7f4ee', // light color for text/elements sitting on dark surfaces
        // Accent — retro-editorial terracotta
        clay: '#b5532e',
        'clay-deep': '#8f3f22',
        'clay-soft': '#c9724f',
        blush: '#c98a7a',
        ember: '#b5532e',
        // Back-compat aliases so any stray legacy tokens still resolve sanely
        gold: '#b5532e',
        'gold-hi': '#8f3f22',
        'gold-deep': '#8f3f22',
        espresso: '#ece7dc',
        'espresso-2': '#e2dccd',
        'cream-dim': '#4a433c',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Fraunces', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-sm': ['clamp(2rem, 4vw + 1rem, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(2.5rem, 6vw + 1rem, 4.5rem)', { lineHeight: '1.0', letterSpacing: '-0.028em' }],
        'display-lg': ['clamp(3rem, 8vw + 1rem, 6rem)', { lineHeight: '0.96', letterSpacing: '-0.034em' }],
      },
      letterSpacing: {
        luxe: '0.32em',
      },
      maxWidth: {
        content: '76rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        // Soft neutral elevation for a clean, light editorial surface
        glow: '0 18px 44px -24px rgba(28, 24, 21, 0.28)',
        'glow-soft': '0 10px 30px -18px rgba(28, 24, 21, 0.20)',
        lift: '0 24px 60px -30px rgba(28, 24, 21, 0.30)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 40s linear infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
