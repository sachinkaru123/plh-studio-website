import type { PortfolioItem } from "@/types/content";

export const portfolio: readonly PortfolioItem[] = [
  {
    slug: "Cottage 42",
    client: "Cottage 42",
    location: "Nuwara Eliya, Sri Lanka",
    category: "Mount Resort",
    challenge:
      "Ninety percent of reservations arrived through OTAs, and commission was eating the margin on every room night.",
    solution:
      "A redesigned site with an embedded direct booking widget, rate-parity messaging, and a members-only offer tier.",
    stack: ["Next.js", "Booking Engine", "Stripe", "CDN"],
    results: [
      { label: "Direct bookings", value: "+78%" },
      { label: "OTA dependency", value: "-41%" },
      { label: "LCP", value: "0.9s" },
    ],
    hue: 178,
    preview: { src: "/portfolio/cottage-42.webp", width: 1024, height: 576 },
  },
  {
    slug: "the-lantern-house",
    client: "The Lantern House",
    location: "Kandy, Sri Lanka",
    category: "Boutique Hotel",
    challenge:
      "A beautiful property represented by a slow, dated site that failed on mobile entirely.",
    solution:
      "Editorial art direction, a photography reshoot, and a mobile-first booking flow rebuilt from scratch.",
    stack: ["Next.js", "Photography", "SEO", "Analytics"],
    results: [
      { label: "Mobile conversion", value: "+112%" },
      { label: "Bounce rate", value: "-34%" },
      { label: "Lighthouse", value: "98" },
    ],
    hue: 320,
    preview: {
      src: "/portfolio/the-lantern-house.webp",
      width: 1024,
      height: 683,
    },
  },
  {
    slug: "aster-residences",
    client: "Aster Residences",
    location: "Colombo, Sri Lanka",
    category: "Serviced Apartments",
    challenge:
      "Long-stay enquiries came in by phone and were lost in a shared inbox with no tracking.",
    solution:
      "A structured enquiry pipeline, long-stay rate tables, and an availability calendar tied to the CRM.",
    stack: ["Next.js", "Booking Engine", "CRM Sync"],
    results: [
      { label: "Qualified enquiries", value: "+63%" },
      { label: "Response time", value: "-70%" },
      { label: "Avg. stay length", value: "+9 nights" },
    ],
    hue: 255,
    preview: {
      src: "/portfolio/aster-residences.webp",
      width: 1024,
      height: 682,
    },
  },
];
