# PLH Studio — Design & Build Specification

> **Version:** 3.0
> **Design Language:** Luxury Hospitality SaaS
> **Stack:** Next.js 16 (static export) · React 19 · Tailwind v4 · shadcn/ui · Motion · Lenis
> **Font:** Inter
> **Status:** Foundation + full home page implemented. Inner pages pending.

---

## Part 0 — How to use this document

This started as a design brief. It is now the build spec: the parts below map
one-to-one onto files in the repo. When you change the product, change this
document and the corresponding `content/*.ts` file — not the JSX.

Two rules that keep the codebase coherent:

1. **All copy lives in `content/*.ts`.** Section components are presentational.
2. **Read `node_modules/next/dist/docs/` before writing Next.js code.** This is
   Next 16; several APIs you may remember are removed or renamed. See Part 4.

---

## Part 1 — Vision & Brand

PLH Studio is a premium digital platform built exclusively for the hospitality
industry, helping hotels establish a luxurious online presence while increasing
direct bookings through modern design, intelligent booking experiences, and
high-performance technology.

Every interaction should communicate elegance, trust, innovation, and premium
quality — closer to **Apple**, **Stripe**, **Linear**, or **Vercel**, while
visually embracing the aesthetic of world-class hospitality brands.

**Personality:** Premium · Elegant · Modern · Professional · Trustworthy · Luxury · Minimal · Hospitality-focused
**Values:** Simplicity · Performance · Luxury · Reliability · Innovation · Customer Experience

---

## Part 2 — Design system

Everything below is defined in [app/globals.css](app/globals.css). There is **no
`tailwind.config.ts`** — Tailwind v4 is CSS-first.

### 2.1 Color tokens

Raw brand values are declared once as `--brand-*`, then mapped onto the shadcn
semantic contract so every shadcn component inherits the theme automatically.

| Role | Hex | CSS var | Tailwind utility |
|---|---|---|---|
| Primary gold | `#C8A96A` | `--brand-gold` | `text-gold` `bg-gold` `border-gold` |
| Gold hover | `#D8BA7C` | `--brand-gold-hover` | `text-gold-hover` |
| Dark gold | `#A8874B` | `--brand-gold-dark` | `text-gold-dark` |
| Gradient terminus | `#8A6733` | `--brand-gold-deep` | `text-gold-deep` |
| Background | `#080808` | `--brand-bg` → `--background` | `bg-background` `bg-ink` |
| Surface | `#121212` | `--brand-surface` → `--secondary` | `bg-surface` |
| Cards | `#181818` | `--brand-card` → `--card` | `bg-card` |
| Border | `rgb(200 169 106 / .20)` | `--brand-line` → `--border` | `border-line` `border-border` |
| Border (strong) | `rgb(200 169 106 / .40)` | `--brand-line-strong` | `border-line-strong` |
| Primary text | `#F5F5F5` | `--brand-text` → `--foreground` | `text-foreground` |
| Secondary text | `#B5B5B5` | `--brand-text-muted` → `--muted-foreground` | `text-muted-foreground` |
| On-gold text | `#0A0A0A` | `--brand-on-gold` | `text-on-gold` |

**Accent gradient:** `#C8A96A → #8A6733` via the `gold-gradient` utility (backgrounds)
or `text-gold-gradient` (text).

> **Why hex, not oklch.** shadcn generates oklch by default. We overwrite with the
> brief's hex so the built site matches the brief exactly. Nothing is lost —
> Tailwind v4's `bg-card/60` opacity modifier compiles to `color-mix()`, which
> works with any input color space.

### 2.2 Type scale

| Role | Weight | Size | Tracking |
|---|---|---|---|
| Hero title | 800 `font-extrabold` | `text-4xl` → `xl:text-7xl` | `-0.04em` (`.text-hero`) |
| Section heading | 700 `font-bold` | `text-3xl` → `lg:text-5xl` | `-0.02em` (base layer) |
| Sub heading | 600 `font-semibold` | `text-lg` | — |
| Body | 400 | `text-sm` / `text-base` | — |
| Buttons | 600 `font-semibold` | `text-sm` | — |
| Eyebrow | 600 | `text-[0.7rem]` uppercase | `0.18em` |

### 2.3 Radius, elevation, easing

`--radius: 0.875rem` drives shadcn **controls only**. Large panels use
`rounded-2xl` (25px) and `rounded-3xl` (31px), which land inside the brief's
24–32px band via shadcn's multiplier scale.

> **Do not set `--radius` to 1.5rem.** It would deform every `Button`, `Input`,
> and `Badge` in the app.

| Token | Value |
|---|---|
| `shadow-glow` | `0 0 48px -12px rgb(200 169 106 / .35)` |
| `shadow-glow-lg` | `0 0 96px -24px rgb(200 169 106 / .45)` |
| `shadow-luxe` | `0 32px 80px -32px rgb(0 0 0 / .9)` |
| `--ease-luxe` | `cubic-bezier(0.22, 1, 0.36, 1)` |

### 2.4 Contrast audit (WCAG)

Measured against `#080808`:

| Pair | Ratio | Verdict |
|---|---|---|
| `#F5F5F5` on `#080808` | 18.6:1 | AAA |
| `#B5B5B5` on `#080808` | 9.8:1 | AAA |
| `#C8A96A` on `#080808` | 8.9:1 | AAA |
| `#B5B5B5` on `#181818` | 7.9:1 | AAA |
| `#0A0A0A` on `#C8A96A` | 8.8:1 | AAA |

The palette clears AA everywhere without modification.

### 2.5 Premium-effect utilities

Defined with Tailwind v4 `@utility`:

`glass` · `gold-frame` (gradient hairline that inherits border-radius) ·
`gold-gradient` · `text-gold-gradient` · `bg-noise` · `spotlight` ·
`fade-edges-x` · `section-y` · `container-luxe` · `text-hero`

Keyframe animations: `animate-marquee` · `animate-marquee-slow` ·
`animate-aurora` · `animate-float` · `animate-pulse-glow` · `animate-shimmer`

---

## Part 3 — Tech stack

| Concern | Choice | Notes |
|---|---|---|
| Framework | `next@16.2.12` | Turbopack default; static export |
| UI runtime | `react@19.2.4` | |
| Styling | `tailwindcss@4` | CSS-first, no config file |
| Components | shadcn/ui (`radix-nova` preset, Radix base) | `components/ui/` — do not hand-edit |
| Animation | `motion@12` | Import from **`motion/react`**, not `framer-motion` |
| Smooth scroll | `lenis@1.3` | Via `lenis/react` `<ReactLenis root>` |
| Icons | `lucide-react@1` | Brand icons removed in v1 — socials are inline SVG |
| Toasts | `sonner` | shadcn's `toast` component no longer exists |
| Font | `next/font/google` Inter | Self-hosted at build; no package |

---

## Part 4 — Platform constraints (Next 16)

Verified against `node_modules/next/dist/docs/`. These are not stylistic
preferences — violating them breaks the build.

| Rule | Why |
|---|---|
| **No `--turbopack` flag** in scripts | Turbopack is the default in 16 |
| **No `webpack` key** in `next.config.ts` | Makes `next build` fail outright |
| **`next lint` is removed** | Use bare `eslint` (already configured) |
| **No `data-scroll-behavior="smooth"` on `<html>`** | Re-enables Next's legacy scroll override, which double-eases against Lenis. Anchors go through Lenis `anchors: { offset: -96 }` instead |
| **`<Image priority>` is deprecated** | Use `loading="eager"` / `fetchPriority="high"` |
| **`params`/`searchParams` are Promises** | Sync access fully removed in 16 |
| **`typedRoutes` is top-level** | Not `experimental.typedRoutes` |
| **`colorScheme` goes in `viewport`** | Deprecated in `metadata` since 14 |
| **`middleware.ts` → `proxy.ts`** | Renamed; unsupported under export anyway |
| **`sitemap.ts`/`robots.ts` need `export const dynamic = "force-static"`** | Otherwise page-data collection fails under export |

### Static-export consequences

`output: "export"` means **no server**. Unsupported: Server Actions, request-reading
Route Handlers, `cookies()`/`headers()`, rewrites/redirects/headers, `proxy.ts`,
ISR, and `next/image`'s default loader.

Two decisions follow:

1. `images: { unoptimized: true }`. Costs nothing here because **all imagery is
   CSS/SVG-generated** — see [components/visuals/gradient-art.tsx](components/visuals/gradient-art.tsx).
2. **The contact form cannot use a Server Action.** It POSTs to a third-party
   endpoint via [lib/contact.ts](lib/contact.ts), falling back to `mailto:`.

---

## Part 5 — Information architecture

| Route | Status |
|---|---|
| `/` | ✅ Full 17-section home page |
| `/privacy`, `/terms` | ✅ Legal placeholders (need counsel review) |
| `/sitemap.xml`, `/robots.txt` | ✅ Generated statically |
| 404 | ✅ [app/not-found.tsx](app/not-found.tsx) |
| `/services`, `/templates`, `/portfolio`, `/pricing`, `/about`, `/contact` | ⬜ Pending — home sections are the source material |

The home page is one long scroll, so nav links are hash anchors (`/#services`).
Every section root carries `id` + `scroll-mt-24` so the sticky header never
covers a heading.

---

## Part 6 — Content model

| File | Feeds |
|---|---|
| [content/site.ts](content/site.ts) | Brand, hero, about, CTA, nav, footer, socials |
| [content/services.ts](content/services.ts) | The 7 offerings |
| [content/solutions.ts](content/solutions.ts) | 8 property verticals |
| [content/why.ts](content/why.ts) | 6 value cards |
| [content/features.ts](content/features.ts) | 5 feature groups |
| [content/stats.ts](content/stats.ts) | 4 counters |
| [content/process.ts](content/process.ts) | 6 process steps |
| [content/templates.ts](content/templates.ts) | Templates + showcase categories |
| [content/portfolio.ts](content/portfolio.ts) | Case studies |
| [content/testimonials.ts](content/testimonials.ts) | Quotes + trusted-by wordmarks |
| [content/pricing.ts](content/pricing.ts) | Tiers, comparison matrix, FAQs |

Shapes are in [types/content.ts](types/content.ts).

> **RSC boundary rule.** Content files store icons as **string names**, never
> component references — a React component cannot cross a Server → Client props
> boundary. [components/shared/icon.tsx](components/shared/icon.tsx) resolves
> names via an *explicit* registry; a namespace import would defeat tree-shaking
> and pull all ~1500 Lucide icons.

---

## Part 7 — Services (the 7 offerings)

| Service | Positioning |
|---|---|
| **Direct Booking Widget** ★ | Drop-in reservation widget for an existing site — commission-free bookings in under a minute |
| **Websites / Mobile Apps** | Bespoke hotel websites and companion apps built for speed, elegance, and conversion |
| **Separate Booking Engine** | Standalone, white-labelled engine with rates, inventory, and payments |
| **Digital Menu for Restaurants** | QR-first, multilingual menus for restaurants, bars, in-room dining |
| **Social Media for Hotels** | Content calendars, creative, and community management tuned to hospitality |
| **Photography / Videos** | Architectural, suite, and lifestyle shoots |
| **VLOGS** | Episodic destination and behind-the-scenes storytelling |

★ = featured card, spans two columns.

**Solutions** (property verticals — a separate section) remain: Hotel, Resort,
Villa, Apartment, Boutique, Hospitality Branding, Booking Portals, Website Redesign.

---

## Part 8 — Component inventory

```
components/
  ui/         shadcn output — do not hand-edit
  layout/     site-header · site-footer · logo · smooth-scroll
              scroll-progress · cursor-spotlight · noise-overlay
  motion/     motion-provider · fade-in · stagger · text-reveal
              count-up · marquee · magnetic · tilt-card · parallax
  visuals/    aurora-background (+ GridBackground) · gradient-art · device-mockup
  shared/     section · section-heading (+ Eyebrow) · icon · social-icon
  sections/   hero · trusted-by · why-plh · services · showcase · booking-demo
              stats · solutions · features · templates · portfolio · process
              testimonials · pricing · about · contact · cta
  forms/      contact-form
```

**Server by default.** Only these are `"use client"`: every `motion/*` primitive,
`site-header` (scroll state + sheet), `features` and `templates` (tab/filter state),
`booking-demo`, and `contact-form`. Sections pass already-rendered JSX as
`children` into motion wrappers, so copy and icons ship as HTML.

---

## Part 9 — Animation spec

| Element | Primitive | Trigger | Duration | Easing |
|---|---|---|---|---|
| Hero headline | `TextReveal` | mount | 0.9s, 0.07s word stagger | `ease-luxe` |
| Hero eyebrow/lede/CTA | `FadeIn` | mount, staggered delay | 0.5–0.7s | `ease-luxe` |
| Hero mockup | `Parallax` + `animate-float` | scroll / loop | 9s loop | `ease-in-out` |
| Section headings | `FadeIn` (in `SectionHeading`) | `whileInView` once | 0.6s | `ease-luxe` |
| Card grids | `Stagger` / `StaggerItem` | `whileInView` once | 0.6s, 0.08s gap | `ease-luxe` |
| Statistics | `CountUp` | `useInView` once | 2s | `ease-luxe` |
| Trusted-by / testimonials | `Marquee` (CSS) | continuous | 44s / 72s | `linear` |
| Primary buttons | `Magnetic` | pointer, fine only | spring 220/18 | — |
| Showcase / template cards | `TiltCard` | pointer, fine only | spring 180/20 | — |
| Booking demo steps | `AnimatePresence` | click | 0.4s | `ease-luxe` |
| Backgrounds | `animate-aurora` | continuous | 20s alternate | `ease-in-out` |
| Scroll bar | `ScrollProgress` | scroll | spring 140/30 | — |
| Cursor | `CursorSpotlight` | rAF, fine pointer only | lerp 0.08 | — |

**Reduced motion** is handled globally in two places, so no primitive branches
individually:

1. `<MotionConfig reducedMotion="user">` in [components/motion/motion-provider.tsx](components/motion/motion-provider.tsx) —
   Motion strips transform/filter and keeps opacity only.
2. A `@media (prefers-reduced-motion: reduce)` block in `globals.css` that
   neutralizes all CSS animation.

Lenis additionally drops to `lerp: 1, duration: 0` and `CursorSpotlight` renders
nothing.

---

## Part 10 — Accessibility rules

1. **Decorative layers are invisible to AT** — aurora, noise, spotlight, marquee
   duplicates, and the progress bar are all `aria-hidden` + `pointer-events-none`.
2. **Animated text stays readable** — `TextReveal` renders the full string in an
   `sr-only` node and marks the word spans `aria-hidden`. Never let a screen
   reader read a headline one word per element.
3. **Nothing is hover-only** — `Magnetic` and `TiltCard` no-op on `(pointer: coarse)`;
   all card actions are keyboard-reachable.
4. **Focus is always visible** — 2px gold `:focus-visible` outline at 3px offset.
5. **Skip link** to `#main` as the first focusable element.
6. **Form errors** use `aria-invalid` + `aria-describedby`, with a `role="status"`
   `aria-live` region announcing submission outcomes.
7. **Only transform/opacity/filter are animated** — never layout properties.

---

## Part 11 — Performance budget

| Target | Status |
|---|---|
| Lighthouse Performance | ≥ 95 (mobile) — not yet measured |
| Accessibility | 100 |
| SEO | 100 |
| CSS bundle | ~104 KB uncompressed ✅ |
| Zero image requests | ✅ all artwork is CSS/SVG |
| Code splitting | ✅ `BookingDemo`, `Features`, `Templates` are `next/dynamic` |
| Font | ✅ self-hosted Inter, `display: swap` |

---

## Part 12 — Build phases

- [x] **0** — Clear scaffold, remove stock splash and default SVGs
- [x] **1** — Deps, design tokens, config, root layout, header/footer, hero
- [x] **2** — Motion primitives + visual effects
- [x] **3** — Trusted By, Why, Services, Showcase, Booking Demo, Stats
- [x] **4** — Solutions, Features, Templates, Portfolio, Process, Testimonials
- [x] **5** — Pricing, About, Contact, CTA, 404, sitemap, robots, legal pages
- [ ] **6** — Inner pages (`/services`, `/templates`, `/portfolio`, `/pricing`, `/about`, `/contact`)
- [ ] **7** — Real photography swap, Lighthouse pass, OG image, legal review

---

## Part 13 — Deployment

```bash
npm run build      # → out/  (one HTML file per route)
npm run preview    # serve out/ locally
```

`out/` is plain HTML/CSS/JS. Deploy to cPanel, S3, Netlify, GitHub Pages, or
Nginx. With `trailingSlash: true` every route emits `<route>/index.html`, so no
server rewrite rules are needed.

Environment (see `.env.example`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `metadataBase`, canonicals, sitemap, robots |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Web3Forms/Formspree endpoint. Unset → form degrades to `mailto:` |

---

## Part 14 — Conflicts resolved

Where the original brief collided with the platform:

| Brief said | Conflict | Resolution |
|---|---|---|
| shadcn "Toast" | Removed from shadcn | Use `sonner` |
| "Auto-scroll carousel" | Embla has no auto-scroll built in | CSS `Marquee` instead — lighter, no extra dep |
| "Rounded corners 24–32px" | Would deform shadcn controls | `--radius: 0.875rem` for controls; `rounded-2xl/3xl` for panels |
| `--border: rgba(...,.20)` | Already translucent; `/opacity` would double-dip | `--color-gold` (opaque) separate from `--color-border` (finished) |
| "Smooth Scrolling (Lenis)" | Next 16 `data-scroll-behavior` fights Lenis | Omit the attribute; use Lenis `anchors` |
| "Gold particles" (canvas) | Main-thread/battery cost risks the Lighthouse goal | CSS aurora + floating glass cards instead |
| "Optimized Images" + static site | Export forbids the default optimizer | All artwork is CSS/SVG — no optimizer needed |
| Booking demo "Date Picker" | shadcn Calendar pulls `react-day-picker` + `date-fns` (~40 KB) | Lightweight month-grid mock for the marketing demo |
| Pricing comparison `Table` | Horizontal scroll fights Lenis | Wrapped in `data-lenis-prevent` |
| `tailwind.config.ts` | Does not exist in v4 | `components.json` keeps `"tailwind": { "config": "" }` |
