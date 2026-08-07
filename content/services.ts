import type { ServiceItem } from "@/types/content";

/** The seven core offerings. Icon values are Lucide names resolved by <Icon />. */
export const services: readonly ServiceItem[] = [
  {
    slug: "direct-booking-widget",
    icon: "CalendarCheck",
    title: "Direct Booking Widget",
    blurb:
      "A drop-in reservation widget for your existing site — commission-free bookings in under a minute.",
    bullets: ["Real-time availability", "Zero OTA commission", "One-line embed"],
    featured: true,
  },
  {
    slug: "websites-mobile-apps",
    icon: "MonitorSmartphone",
    title: "Websites / Mobile Apps",
    blurb:
      "Bespoke hotel websites and companion apps built for speed, elegance, and conversion.",
    bullets: ["Custom design", "iOS & Android", "Core Web Vitals tuned"],
  },
  {
    slug: "booking-engine",
    icon: "ServerCog",
    title: "Separate Booking Engine",
    blurb:
      "A standalone, white-labelled engine with rates, inventory, and payments built in.",
    bullets: ["Rate & inventory control", "Secure payments", "Channel sync"],
  },
  {
    slug: "digital-menu",
    icon: "QrCode",
    title: "Digital Menu for Restaurants",
    blurb:
      "QR-first, multilingual menus for your restaurants, bars, and in-room dining.",
    bullets: ["Instant updates", "Multilingual", "Allergen tagging"],
  },
  {
    slug: "social-media",
    icon: "Share2",
    title: "Social Media for Hotels",
    blurb:
      "Content calendars, creative, and community management tuned to hospitality.",
    bullets: ["Monthly calendar", "Creative production", "Community management"],
  },
  {
    slug: "photography-video",
    icon: "Camera",
    title: "Photography / Videos",
    blurb:
      "Architectural, suite, and lifestyle shoots that make your property look its best.",
    bullets: ["Architectural stills", "Drone & aerial", "Lifestyle reels"],
  },
  {
    slug: "vlogs",
    icon: "Clapperboard",
    title: "VLOGS",
    blurb:
      "Episodic destination and behind-the-scenes storytelling that builds a following.",
    bullets: ["Series planning", "Full production", "Channel growth"],
  },
];
