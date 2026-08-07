import type { ComparisonRow, PricingTier } from "@/types/content";

export const pricingTiers: readonly PricingTier[] = [
  {
    name: "Starter",
    tagline: "For a single property getting online properly.",
    price: "$1,490",
    cadence: "one-time build",
    cta: "Request Quote",
    features: [
      "Up to 6 pages",
      "Template-based design",
      "Direct booking widget",
      "Mobile optimized",
      "Basic SEO setup",
      "SSL & secure hosting",
      "Email support",
    ],
  },
  {
    name: "Professional",
    tagline: "The full build most hotels actually need.",
    price: "$3,900",
    cadence: "one-time build",
    featured: true,
    cta: "Request Quote",
    features: [
      "Unlimited pages",
      "Bespoke design & art direction",
      "Separate booking engine",
      "Digital restaurant menu",
      "Advanced SEO & schema",
      "Analytics & campaign tooling",
      "Daily backups & monitoring",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    tagline: "Multi-property groups and portals.",
    price: "Custom",
    cadence: "scoped per group",
    cta: "Request Quote",
    features: [
      "Everything in Professional",
      "Multi-property booking portal",
      "CRM & PMS integration",
      "Photography & video production",
      "Social media management",
      "Dedicated account team",
      "SLA-backed availability",
    ],
  },
];

export const comparisonRows: readonly ComparisonRow[] = [
  { feature: "Pages", starter: "6", professional: "Unlimited", enterprise: "Unlimited" },
  { feature: "Bespoke design", starter: false, professional: true, enterprise: true },
  { feature: "Direct booking widget", starter: true, professional: true, enterprise: true },
  { feature: "Separate booking engine", starter: false, professional: true, enterprise: true },
  { feature: "Digital restaurant menu", starter: false, professional: true, enterprise: true },
  { feature: "Multi-property portal", starter: false, professional: false, enterprise: true },
  { feature: "Photography & video", starter: false, professional: "Add-on", enterprise: true },
  { feature: "Social media management", starter: false, professional: "Add-on", enterprise: true },
  { feature: "SEO & schema", starter: "Basic", professional: "Advanced", enterprise: "Advanced" },
  { feature: "Support", starter: "Email", professional: "Priority", enterprise: "Dedicated team" },
];

export const pricingFaqs: readonly { q: string; a: string }[] = [
  {
    q: "Is there an ongoing fee?",
    a: "Hosting, monitoring, backups, and security patching are billed annually and quoted with your build. There is no per-booking commission — ever.",
  },
  {
    q: "How long does a build take?",
    a: "Starter typically launches in two to three weeks. Professional runs four to six weeks depending on photography and content readiness.",
  },
  {
    q: "Can you migrate our existing site?",
    a: "Yes. Migration includes redirect mapping so you keep the search rankings you have already earned.",
  },
  {
    q: "Do you work with our existing PMS or channel manager?",
    a: "In most cases yes. Tell us what you run and we will confirm integration scope during discovery.",
  },
];
