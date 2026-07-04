# Lumiro — Luxury Hand-Painted Illuminated Bottle Art

A cinematic luxury brand experience built with Next.js 14, TypeScript, Tailwind CSS, and React Three Fiber. The centerpiece is a procedurally rendered 3D glass bottle with internal fairy lights, bloom, and scroll-driven storytelling.

## Getting started

```bash
npm install
npm run dev
```

## Stack

- **Next.js 14** (App Router) + TypeScript
- **React Three Fiber + drei + postprocessing** — 3D bottle, glass PBR material, bloom, particles
- **Tailwind CSS** — design tokens (ink / cream / gold / blush / ember)
- **Framer Motion** — scroll reveal and section transitions
- **Zustand** — persistent cart store

## Structure

```
src/
  app/            # App Router pages, layout, global styles
  components/
    three/        # BottleScene, Bottle, Particles
    sections/     # Hero, Craft, Collection, Testimonials, FinalCta
    ui/           # Reusable design-system components
  data/           # Product catalog
  lib/            # Stores and utilities
```

## Roadmap

- Product and collection pages with 3D viewer
- Cart, checkout, and payment integrations (Stripe / Razorpay / PayPal)
- Custom orders flow
- Admin dashboard
- SEO: sitemap, robots.txt, structured product data
