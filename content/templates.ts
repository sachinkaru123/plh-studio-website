import type { TemplateItem } from "@/types/content";

export const templateCategories = [
  "All",
  "Luxury",
  "Resort",
  "Business",
  "Boutique",
  "Beach",
  "Minimal",
  "Modern",
  "Classic",
] as const;

export const templates: readonly TemplateItem[] = [
  {
    slug: "aurelia",
    name: "Aurelia",
    category: "Luxury",
    blurb: "A grand-hotel showcase built around full-bleed suite photography.",
    pages: ["Home", "Suites", "Dining", "Spa", "Gallery", "Contact"],
    booking: true,
    hue: 0,
    preview: { src: "/templates/aurelia.webp", width: 692, height: 442 },
  },
  {
    slug: "palmara",
    name: "Palmara",
    category: "Resort",
    blurb: "Sprawling resort layout with activities, amenities, and day passes.",
    pages: ["Home", "Rooms", "Activities", "Offers", "Contact"],
    booking: true,
    hue: 28,
    preview: { src: "/templates/palmara.webp", width: 808, height: 632 },
  },
  {
    slug: "meridian",
    name: "Meridian",
    category: "Business",
    blurb: "Efficient corporate-travel flow with meeting-room enquiry built in.",
    pages: ["Home", "Rooms", "Meetings", "Location", "Contact"],
    booking: true,
    hue: 205,
    preview: { src: "/templates/meridian.webp", width: 740, height: 493 },
  },
  {
    slug: "verre",
    name: "Verre",
    category: "Boutique",
    blurb: "Editorial, type-led design for character properties.",
    pages: ["Home", "Story", "Rooms", "Journal", "Contact"],
    booking: true,
    hue: 320,
    preview: { src: "/templates/verre.avif", width: 1800, height: 1222 },
  },
  {
    slug: "sandbar",
    name: "Sandbar",
    category: "Beach",
    blurb: "Sun-washed palette with tide-side dining and watersport booking.",
    pages: ["Home", "Villas", "Dining", "Watersports", "Contact"],
    booking: true,
    hue: 178,
    preview: { src: "/templates/sandbar.webp", width: 1500, height: 960 },
  },
  {
    slug: "kuro",
    name: "Kuro",
    category: "Minimal",
    blurb: "Radical restraint — whitespace, one accent, nothing else.",
    pages: ["Home", "Rooms", "Contact"],
    booking: true,
    hue: 250,
    preview: { src: "/templates/kuro.webp", width: 520, height: 580 },
  },
  {
    slug: "atrium",
    name: "Atrium",
    category: "Modern",
    blurb: "Asymmetric grid and motion-forward transitions.",
    pages: ["Home", "Rooms", "Dining", "Events", "Gallery", "Contact"],
    booking: true,
    hue: 95,
    preview: { src: "/templates/atrium.webp", width: 740, height: 444 },
  },
  {
    slug: "belvedere",
    name: "Belvedere",
    category: "Classic",
    blurb: "Serif-led heritage styling for historic properties.",
    pages: ["Home", "Heritage", "Rooms", "Dining", "Contact"],
    booking: false,
    hue: 45,
    preview: { src: "/templates/belvedere.webp", width: 404, height: 316 },
  },
];

/**
 * Property archetypes surfaced in the showcase strip.
 *
 * `src` points at a full-page site screenshot in /public. `width`/`height` are the
 * image's intrinsic pixel size — required so next/image reserves space and avoids
 * layout shift (the optimizer is off under `output: "export"`).
 *
 * The label ↔ image pairing is assigned in file order; re-order freely.
 */
export const showcaseCategories = [
  {
    label: "Luxury Resort",
    hue: 30,
    src: "/site-1.png",
    width: 500,
    height: 1104,
  },
  {
    label: "Boutique Hotel",
    hue: 320,
    src: "/site-3.png",
    width: 500,
    height: 1173,
  },
  {
    label: "Business Hotel",
    hue: 205,
    src: "/site-3-2.png",
    width: 500,
    height: 1187,
  },
  {
    label: "Beach Resort",
    hue: 178,
    src: "/site-4.png",
    width: 500,
    height: 1932,
  },
  {
    label: "Mountain Villa",
    hue: 150,
    src: "/site-5.png",
    width: 500,
    height: 1142,
  },
] as const;
