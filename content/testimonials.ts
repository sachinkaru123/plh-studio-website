import type { Testimonial } from "@/types/content";

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "Our direct bookings increased dramatically after launching our new website. The commission we stopped paying covered the build inside a season.",
    author: "Nadia Perera",
    role: "General Manager",
    property: "Cinnamon Bay Resort",
    rating: 5,
  },
  {
    quote:
      "The design perfectly reflects our brand. Guests tell us the site feels like the hotel before they've even arrived.",
    author: "Ruwan De Silva",
    role: "Owner",
    property: "The Lantern House",
    rating: 5,
  },
  {
    quote:
      "The booking experience is effortless. We went from fielding phone enquiries to watching reservations complete themselves.",
    author: "Amara Fernando",
    role: "Director of Revenue",
    property: "Aster Residences",
    rating: 5,
  },
  {
    quote:
      "Fast, elegant, and genuinely easy to update. Our team publishes seasonal offers without ever calling us for help.",
    author: "Dilan Jayasuriya",
    role: "Marketing Lead",
    property: "Meridian City Hotel",
    rating: 5,
  },
  {
    quote:
      "They understood hospitality, not just web design. That difference showed up in every decision they made.",
    author: "Shanika Ratnayake",
    role: "Operations Manager",
    property: "Palmara Beach Resort",
    rating: 5,
  },
];

/** Wordmarks for the Trusted By marquee (rendered as styled text, not images). */
export const trustedLogos: readonly string[] = [
  "CINNAMON BAY",
  "THE LANTERN HOUSE",
  "ASTER RESIDENCES",
  "MERIDIAN",
  "PALMARA",
  "BELVEDERE",
  "KURO HOTELS",
  "SANDBAR",
];
