import type { NavItem } from "@/types/content";

export const siteConfig = {
  name: "PLH Studio",
  tagline: "Digital Luxury Begins Here",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://plhconnect.com",
  description:
    "PLH Studio designs premium hotel websites with integrated booking experiences that inspire confidence, increase direct reservations, and showcase your property with exceptional elegance.",
  email: "hello@plhconnect.com",
  phone: "+94 77 000 0000",
  address: "Colombo, Sri Lanka",
} as const;

export const heroContent = {
  eyebrow: "Premium Hospitality Technology",
  headline: "Digital Luxury Begins Here.",
  lede: siteConfig.description,
  primaryCta: { label: "Explore Solutions", href: "#services" },
  secondaryCta: { label: "Book a Demo", href: "#contact" },
  proof: [
    "120+ properties launched",
    "65% average lift in direct bookings",
    "99.9% platform availability",
  ],
} as const;

export const aboutContent = {
  eyebrow: "About PLH Studio",
  headline: "Premium design, engineered for measurable growth.",
  paragraphs: [
    "PLH Studio combines premium design with cutting-edge technology to create exceptional digital experiences for hotels around the world.",
    "We believe every hotel deserves a website that reflects its brand while delivering measurable business growth — not just a brochure, but a booking engine that pays for itself.",
  ],
  pillars: [
    { title: "Simplicity", blurb: "Interfaces guests understand instantly." },
    { title: "Performance", blurb: "Sub-second loads on every device." },
    { title: "Reliability", blurb: "Monitored, backed up, always online." },
    { title: "Innovation", blurb: "Modern tooling, continuously improved." },
  ],
} as const;

export const ctaContent = {
  headline: "Ready to elevate your property's first impression?",
  blurb:
    "Tell us about your hotel and we'll show you exactly what a PLH Studio launch would look like.",
  cta: { label: "Request Consultation", href: "#contact" },
} as const;

export const mainNav: readonly NavItem[] = [
  { label: "Services", href: "/#services" },
  { label: "Solutions", href: "/#solutions" },
  { label: "Templates", href: "/#templates" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Pricing", href: "/#pricing" },
  { label: "About", href: "/#about" },
];

export const footerNav: readonly {
  title: string;
  links: readonly NavItem[];
}[] = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/#about" },
      { label: "Process", href: "/#process" },
      { label: "Portfolio", href: "/#portfolio" },
      { label: "Contact", href: "/#contact" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "Services", href: "/#services" },
      { label: "Solutions", href: "/#solutions" },
      { label: "Templates", href: "/#templates" },
      { label: "Pricing", href: "/#pricing" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export const socialLinks: readonly { label: string; href: string; icon: string }[] =
  [
    { label: "Instagram", href: "https://instagram.com", icon: "Instagram" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Linkedin" },
    { label: "YouTube", href: "https://youtube.com", icon: "Youtube" },
    { label: "Facebook", href: "https://facebook.com", icon: "Facebook" },
  ];
