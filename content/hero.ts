import type { HeroOrbitSlide } from "@/types/content";

export const heroOrbit = {
  kicker: "PLH Studio · Direct Booking Experience",
  /** Constant across slides; the primary CTA rotates with the active slide. */
  secondaryCta: { label: "Book a Demo", href: "/#contact" },
  /** Shown beside the orbit; the verb swaps for touch devices at runtime. */
  hint: "a point to explore",
} as const;

/**
 * Five capabilities, one per orbit point.
 *
 * Order matters twice over: it sets the clockwise position on the ring (12
 * o'clock first) and the autoplay sequence, so the copy reads as a funnel —
 * bookings → website → engine → journey → growth.
 */
export const heroOrbitSlides: readonly HeroOrbitSlide[] = [
  {
    id: "direct",
    index: "01",
    label: "Direct Bookings",
    headline: ["Stop Renting", "Your Guests."],
    blurb:
      "Turn the visitors you already have into direct reservations — and keep the guest relationship, the data and the margin inside your hotel.",
    center: { title: ["OWN", "THE GUEST"], sub: "Commission-free revenue" },
    proof: "65% average lift in direct bookings",
    cta: { label: "Why Direct Wins", href: "/#why" },
    hue: 0,
  },
  {
    id: "websites",
    index: "02",
    label: "Hotel Websites",
    headline: ["Your Website", "Should Sell."],
    blurb:
      "A cinematic, sub-second site built around your property's story — and engineered around a single outcome: the booking.",
    center: { title: ["MAKE THE", "IMPRESSION"], sub: "Design that converts" },
    proof: "0.9s median load on mobile",
    cta: { label: "View Templates", href: "/#templates" },
    hue: 14,
  },
  {
    id: "engine",
    index: "03",
    label: "Booking Engine",
    headline: ["Less Friction.", "More Bookings."],
    blurb:
      "A mobile-first path from room discovery to confirmed stay. Five steps, no redirects, no third-party checkout, no dead ends.",
    center: { title: ["MAKE IT", "EFFORTLESS"], sub: "Five steps to confirmed" },
    proof: "38% fewer abandoned checkouts",
    cta: { label: "Try the Flow", href: "/#booking-demo" },
    hue: -12,
  },
  {
    id: "journey",
    index: "04",
    label: "Guest Journey",
    headline: ["Every Stay.", "One Story."],
    blurb:
      "Search, stay and the weeks after checkout, designed as one connected experience that carries your brand the whole way.",
    center: { title: ["BUILD", "THE JOURNEY"], sub: "Discovery to return stay" },
    proof: "4.9 average guest rating",
    cta: { label: "Explore Solutions", href: "/#solutions" },
    hue: 24,
  },
  {
    id: "growth",
    index: "05",
    label: "Growth",
    headline: ["One Booking.", "Many More."],
    blurb:
      "Guest data, email and analytics working together, so every stay you earn quietly pays for the next one.",
    center: { title: ["GROW", "DIRECT"], sub: "Revenue that compounds" },
    proof: "120+ properties launched",
    cta: { label: "See Pricing", href: "/#pricing" },
    hue: -22,
  },
];
