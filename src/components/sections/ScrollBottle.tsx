'use client';


import { useEffect, useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion';

/**
 * The signature centerpiece: the real hand-painted bottle, pinned in the
 * viewport and driven in 3D by scroll position + pointer parallax.
 * Inspired by pinned "hero object" scroll interactions.
 */
export default function ScrollBottle() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Smooth the raw scroll progress
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });

  // Pointer parallax (subtle, adds dimensionality)
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const pxs = useSpring(px, { stiffness: 60, damping: 18 });
  const pys = useSpring(py, { stiffness: 60, damping: 18 });

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      px.set(nx);
      py.set(ny);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [px, py, reduce]);

  // Scroll-driven transforms — bounded rotation reads as a turning object
  // without ever hitting the degenerate flat-edge angle.
  const rotY = useTransform(p, [0, 1], [-16, 26]);
  const pointerRotY = useTransform(pxs, [-1, 1], [-12, 12]);
  const pointerRotX = useTransform(pys, [-1, 1], [8, -8]);
  const scale = useTransform(p, [0, 0.35, 1], [1.35, 1.12, 0.7]);
  const y = useTransform(p, [0, 1], ['0%', '-18%']);
  const glowScale = useTransform(p, [0, 0.4, 1], [1, 1.15, 0.75]);
  const glowOpacity = useTransform(p, [0, 0.5, 1], [0.9, 0.6, 0.25]);

  // Combine scroll + pointer rotation (auto-tracks both motion values)
  const combinedRotY = useTransform(() => rotY.get() + pointerRotY.get());

  const videoRef = useRef<HTMLVideoElement>(null);

  // Skip a little of the slow intro, and reach the end slightly before full
  // scroll so the playback reads a touch faster.
  const START_TRIM = 0.07; // skip the first 7% of the clip
  const END_AT = 0.9; // video hits its last frame at 90% scroll
  useMotionValueEvent(p, "change", (latest) => {
    const v = videoRef.current;
    if (v && !isNaN(v.duration) && v.duration > 0) {
      const startTime = v.duration * START_TRIM;
      const progress = Math.min(latest / END_AT, 1);
      v.currentTime = startTime + progress * (v.duration - startTime);
    }
  });

  if (reduce) {
    return (
      <div className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center">
        <div
          className="absolute h-[62vmin] w-[62vmin] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(201,114,79,0.18), rgba(201,138,122,0.08) 45%, transparent 70%)',
          }}
        />
        <video
          src="/bottle.mp4"
          playsInline
          muted
          className="relative h-screen w-screen object-cover"
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-0 flex items-center justify-center"
      style={{ perspective: 1400 }}
    >
      {/* Ambient warm glow that breathes with scroll */}
      <motion.div
        aria-hidden
        className="absolute h-[68vmin] w-[68vmin] rounded-full blur-3xl"
        style={{
          scale: glowScale,
          opacity: glowOpacity,
          background:
            'radial-gradient(circle, rgba(201,114,79,0.20), rgba(201,138,122,0.09) 42%, transparent 70%)',
        }}
      />

      {/* Floating light sparks */}
      {SPARKS.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute rounded-full bg-ember/80 blur-[1px]"
          style={{
            width: s.size,
            height: s.size,
            left: `calc(50% + ${s.x}px)`,
            top: `calc(50% + ${s.y}px)`,
          }}
          animate={{ opacity: [0.15, 0.9, 0.15], y: [0, -10, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        className="relative will-change-transform"
        style={{
          rotateY: combinedRotY,
          rotateX: pointerRotX,
          scale,
          y,
          transformStyle: 'preserve-3d',
        }}
      >
        <video
          ref={videoRef}
          src="/bottle.mp4"
          playsInline
          muted
          preload="auto"
          className="h-screen w-screen select-none object-cover"
        />
      </motion.div>
    </div>
  );
}

const SPARKS = [
  { x: -120, y: -40, size: 5, dur: 4.5, delay: 0 },
  { x: 90, y: -120, size: 4, dur: 5.2, delay: 0.6 },
  { x: 140, y: 60, size: 6, dur: 4.0, delay: 1.1 },
  { x: -150, y: 120, size: 4, dur: 5.6, delay: 0.3 },
  { x: 40, y: 180, size: 5, dur: 4.8, delay: 0.9 },
  { x: -60, y: -160, size: 3, dur: 6.0, delay: 1.4 },
];
