import Image from 'next/image';
import type { Motif, Product } from '@/data/products';

/** Deterministic pseudo-random from a string seed (stable across SSR/CSR). */
function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Elegant bottle silhouette in a 120 x 320 canvas.
const BOTTLE_PATH =
  'M46,44 L46,74 C46,96 26,108 24,140 L24,286 Q24,300 38,300 L82,300 Q96,300 96,286 L96,140 C94,108 74,96 74,74 L74,44 Q74,34 64,34 L56,34 Q46,34 46,44 Z';

type Props = {
  product: Product;
  className?: string;
  priority?: boolean;
  /** Larger detail rendering (PDP) vs compact (cards/cart). */
  detail?: boolean;
};

export default function BottleArt({ product, className = '', priority, detail }: Props) {
  const [c1, c2, c3] = product.visual.colors;
  const uid = product.slug;

  return (
    <div className={`relative isolate overflow-hidden ${className}`}>
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `radial-gradient(70% 60% at 50% 62%, ${product.accent}33, transparent 72%)`,
        }}
      />

      {product.image ? (
        <Image
          src={product.image}
          alt={`${product.name} — hand-painted illuminated bottle`}
          width={401}
          height={599}
          priority={priority}
          sizes={detail ? '(max-width: 1024px) 90vw, 480px' : '(max-width: 640px) 90vw, 360px'}
          className="relative z-10 mx-auto h-full w-auto object-contain drop-shadow-[0_16px_32px_rgba(28,24,21,0.2)]"
        />
      ) : (
        <ProceduralBottle
          motif={product.visual.motif}
          colors={[c1, c2, c3]}
          accent={product.accent}
          seed={uid}
        />
      )}
    </div>
  );
}

function ProceduralBottle({
  motif,
  colors,
  accent,
  seed,
}: {
  motif: Motif;
  colors: [string, string, string];
  accent: string;
  seed: string;
}) {
  const rnd = seeded(seed);
  const [c1, c2, c3] = colors;
  const clip = `clip-${seed}`;
  const grad = `grad-${seed}`;
  const glass = `glass-${seed}`;

  // Fairy lights — warm glowing dots inside the glass
  const lights = Array.from({ length: 15 }, () => ({
    x: 30 + rnd() * 60,
    y: 96 + rnd() * 190,
    r: 0.9 + rnd() * 1.6,
  }));

  return (
    <svg
      viewBox="0 0 120 320"
      className="relative z-10 mx-auto h-full w-auto"
      role="img"
      aria-label={`Illuminated bottle, ${motif} design`}
    >
      <defs>
        <clipPath id={clip}>
          <path d={BOTTLE_PATH} />
        </clipPath>
        <linearGradient id={grad} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c2} stopOpacity="0.55" />
          <stop offset="55%" stopColor={c1} stopOpacity="0.4" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={glass} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0.22" />
          <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`core-${seed}`} cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fff3d8" stopOpacity="0.9" />
          <stop offset="45%" stopColor={accent} stopOpacity="0.35" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Glass body base */}
      <g clipPath={`url(#${clip})`}>
        <rect x="0" y="0" width="120" height="320" fill="#0f0c0a" />
        <rect x="0" y="0" width="120" height="320" fill={`url(#${grad})`} />
        {/* warm inner core light */}
        <ellipse cx="60" cy="210" rx="46" ry="90" fill={`url(#core-${seed})`} />

        {/* Motif painting */}
        <MotifArt motif={motif} colors={colors} accent={accent} rnd={rnd} />

        {/* Fairy lights */}
        {lights.map((l, i) => (
          <g key={i}>
            <circle cx={l.x} cy={l.y} r={l.r * 3} fill="#ffd9a0" opacity={0.18} />
            <circle cx={l.x} cy={l.y} r={l.r} fill="#fff6e0" />
          </g>
        ))}

        {/* Glass highlight sweep */}
        <rect x="0" y="0" width="120" height="320" fill={`url(#${glass})`} />
      </g>

      {/* Cork / cap */}
      <rect x="49" y="20" width="22" height="20" rx="4" fill="#7a5a3a" />
      <rect x="49" y="20" width="22" height="6" rx="3" fill="#9c7f4a" />

      {/* Bottle outline */}
      <path
        d={BOTTLE_PATH}
        fill="none"
        stroke="#c9a86a"
        strokeOpacity="0.35"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function MotifArt({
  motif,
  colors,
  accent,
  rnd,
}: {
  motif: Motif;
  colors: [string, string, string];
  accent: string;
  rnd: () => number;
}) {
  const [c1, , c3] = colors;

  switch (motif) {
    case 'stars': {
      const stars = Array.from({ length: 34 }, () => ({
        x: 28 + rnd() * 64,
        y: 92 + rnd() * 200,
        r: 0.4 + rnd() * 1.4,
      }));
      return (
        <g>
          {stars.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={i % 4 === 0 ? c3 : '#ffffff'} opacity={0.85} />
          ))}
        </g>
      );
    }
    case 'waves':
    case 'wave': {
      const rows = motif === 'wave' ? 3 : 5;
      return (
        <g stroke={c1} strokeWidth="1.6" fill="none" opacity="0.7">
          {Array.from({ length: rows }, (_, i) => {
            const y = 170 + i * 26;
            return (
              <path
                key={i}
                d={`M20,${y} q15,-12 30,0 t30,0 t30,0 t30,0`}
                strokeOpacity={0.4 + i * 0.12}
              />
            );
          })}
        </g>
      );
    }
    case 'aurora':
      return (
        <g opacity="0.6">
          {[c1, accent, c1].map((c, i) => (
            <path
              key={i}
              d={`M${34 + i * 18},96 C${20 + i * 18},150 ${50 + i * 14},190 ${30 + i * 18},260`}
              stroke={c}
              strokeWidth={10 - i * 2}
              strokeLinecap="round"
              fill="none"
              opacity={0.5}
            />
          ))}
        </g>
      );
    case 'forest':
      return (
        <g fill={c1}>
          {Array.from({ length: 7 }, (_, i) => {
            const x = 26 + i * 10 + rnd() * 4;
            const h = 40 + rnd() * 46;
            const base = 292;
            return (
              <path key={i} d={`M${x},${base} L${x - 7},${base} L${x - 3.5},${base - h} Z`} opacity={0.85} />
            );
          })}
        </g>
      );
    case 'lavender':
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => {
            const x = 28 + i * 7.5 + rnd() * 2;
            const top = 150 + rnd() * 30;
            return (
              <g key={i} stroke={c1} strokeWidth="1" opacity="0.8">
                <line x1={x} y1={top} x2={x} y2={288} strokeOpacity="0.5" />
                {Array.from({ length: 5 }, (_, j) => (
                  <circle key={j} cx={x} cy={top + j * 6} r="1.6" fill={c1} stroke="none" />
                ))}
              </g>
            );
          })}
        </g>
      );
    case 'sun':
      return (
        <g>
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const cx = 60;
            const cy = 190;
            return (
              <ellipse
                key={i}
                cx={cx + Math.cos(a) * 22}
                cy={cy + Math.sin(a) * 22}
                rx="4.5"
                ry="9"
                fill={c1}
                opacity="0.85"
                transform={`rotate(${(a * 180) / Math.PI + 90} ${cx + Math.cos(a) * 22} ${cy + Math.sin(a) * 22})`}
              />
            );
          })}
          <circle cx="60" cy="190" r="12" fill={c3} />
        </g>
      );
    case 'mandala':
      return (
        <g stroke={c1} fill="none" opacity="0.75">
          {[10, 18, 26, 34].map((r) => (
            <circle key={r} cx="60" cy="196" r={r} strokeWidth="1" />
          ))}
          {Array.from({ length: 16 }, (_, i) => {
            const a = (i / 16) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={60 + Math.cos(a) * 10}
                y1={196 + Math.sin(a) * 10}
                x2={60 + Math.cos(a) * 34}
                y2={196 + Math.sin(a) * 34}
                strokeWidth="0.8"
              />
            );
          })}
        </g>
      );
    case 'snow':
      return (
        <g>
          <path d="M28,286 L48,268 L68,286 Z" fill={colors[1]} opacity="0.9" />
          <path d="M58,286 L82,262 L96,286 Z" fill={colors[1]} opacity="0.8" />
          {Array.from({ length: 26 }, (_, i) => (
            <circle key={i} cx={26 + rnd() * 68} cy={96 + rnd() * 150} r={0.8 + rnd()} fill="#ffffff" opacity="0.9" />
          ))}
        </g>
      );
    case 'blossom':
    case 'floral': {
      const petals = Array.from({ length: 26 }, () => ({
        x: 34 + rnd() * 52,
        y: 110 + rnd() * 150,
        r: 1.6 + rnd() * 2.2,
      }));
      return (
        <g>
          {/* branch */}
          <path
            d="M44,290 C52,240 40,200 56,150 C62,130 58,120 66,104"
            stroke={c3}
            strokeWidth="2.4"
            fill="none"
            opacity="0.85"
          />
          <path d="M52,210 C64,204 72,196 82,190" stroke={c3} strokeWidth="1.4" fill="none" opacity="0.7" />
          <path d="M50,170 C40,166 34,160 28,152" stroke={c3} strokeWidth="1.2" fill="none" opacity="0.7" />
          {petals.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={c1} opacity={0.85} />
          ))}
        </g>
      );
    }
    case 'stroke':
      return (
        <path
          d="M30,250 C60,210 64,150 92,110"
          stroke={c1}
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
      );
    default:
      return null;
  }
}
