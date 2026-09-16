# LahainaOceanfrontRentals

A direct-booking marketing website for LahainaOceanfrontRentals — oceanfront
condos across Lahaina & Kaanapali, Maui, hosted by Louis & Kristine Trinh.
Redesigned from the original WordPress site into a modern, fast, static
Next.js site, with real content (photos, descriptions, pricing) pulled from
the client's Hostaway listings.

## Tech stack

- **[Next.js](https://nextjs.org)** (App Router) — statically generated (SSG)
- **TypeScript**
- **Tailwind CSS v4**
- **[lucide-react](https://lucide.dev)** for icons

No backend/database — content lives in typed data files under `lib/data/`.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build (fully static — generateStaticParams for all property pages)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```
app/
  page.tsx                    Home
  about/page.tsx               About
  contact/page.tsx             Contact (form UI only — no backend wired up)
  properties/page.tsx          Properties listing
  properties/[slug]/page.tsx   Property detail (gallery, booking card, map, policies)
  privacy/, terms/             Legal pages (template content — see note below)

components/                    All UI components (Hero, Navbar, Footer, booking
                                widget + calendar, property cards, icon sets, etc.)

lib/
  types.ts                     Property / Testimonial / ServiceHighlight types
  date.ts                      Date-range calendar helpers (no date library dependency)
  data/properties.ts           The 4 real listings — see "Swapping in live data" below
  data/testimonials.ts         Placeholder guest reviews
  data/services.ts             "What We Offer" content
  data/policies.ts             House rules / cancellation policy template
```
