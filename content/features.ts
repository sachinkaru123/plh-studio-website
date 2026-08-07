import type { FeatureGroup } from "@/types/content";

export const featureGroups: readonly FeatureGroup[] = [
  {
    id: "website",
    label: "Website",
    icon: "LayoutTemplate",
    headline: "Manage every page without touching code.",
    blurb:
      "A content model built for hospitality, not a generic page builder bolted onto a blog.",
    items: [
      "Page Builder",
      "Content Editor",
      "Galleries",
      "Contact Forms",
      "Blogs",
      "Promotions",
    ],
  },
  {
    id: "booking",
    label: "Booking",
    icon: "CalendarRange",
    headline: "Reservations that complete instead of stalling.",
    blurb:
      "Every step of the flow is measured and tuned to remove drop-off before payment.",
    items: [
      "Reservations",
      "Room Availability",
      "Booking Confirmation",
      "Guest Details",
      "Pricing Rules",
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "TrendingUp",
    headline: "Reach the guests who are already searching.",
    blurb:
      "Technical SEO, structured data, and campaign tooling shipped as standard.",
    items: [
      "SEO",
      "Analytics",
      "Email Campaigns",
      "Newsletter",
      "Promotions",
    ],
  },
  {
    id: "performance",
    label: "Performance",
    icon: "Gauge",
    headline: "Fast on hotel Wi-Fi and rural mobile alike.",
    blurb:
      "Performance is a booking-conversion feature, so we treat it as one.",
    items: ["Global CDN", "Image Optimization", "Caching", "Core Web Vitals"],
  },
  {
    id: "security",
    label: "Security",
    icon: "Lock",
    headline: "Guest data handled the way it should be.",
    blurb:
      "Hardened hosting, encrypted transport, and recoverable backups by default.",
    items: ["SSL", "Secure Hosting", "Daily Backup", "24/7 Monitoring"],
  },
];
