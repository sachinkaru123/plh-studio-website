import type { Route } from "next";

/**
 * Shared content shapes.
 *
 * Icons are stored as *string names*, never component references — a React
 * component cannot cross a Server → Client props boundary. `components/shared/icon.tsx`
 * resolves the name to a Lucide component at render time.
 */

export type IconName = string;

/**
 * `typedRoutes` is enabled, so hrefs are checked against the real route union.
 * `Route` also accepts a `#hash` suffix on a known route.
 */
export interface NavItem {
  label: string;
  href: Route;
}

export interface ServiceItem {
  slug: string;
  icon: IconName;
  title: string;
  blurb: string;
  bullets?: readonly string[];
  featured?: boolean;
}

export interface ValueCard {
  icon: IconName;
  title: string;
  blurb: string;
}

export interface SolutionItem {
  icon: IconName;
  title: string;
  blurb: string;
}

export interface FeatureGroup {
  id: string;
  label: string;
  icon: IconName;
  headline: string;
  blurb: string;
  items: readonly string[];
}

export interface StatItem {
  value: number;
  suffix: string;
  decimals?: number;
  label: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  blurb: string;
  icon: IconName;
}

export interface TemplatePreview {
  src: string;
  /** Intrinsic pixel size — required so next/image reserves space (optimizer is off under static export). */
  width: number;
  height: number;
}

export interface TemplateItem {
  slug: string;
  name: string;
  category: string;
  blurb: string;
  pages: readonly string[];
  booking: boolean;
  /** Hue rotation seed (deg) for the generated gradient artwork — the fallback when `preview` is absent. */
  hue: number;
  preview?: TemplatePreview;
}

export interface PortfolioItem {
  slug: string;
  client: string;
  location: string;
  category: string;
  challenge: string;
  solution: string;
  stack: readonly string[];
  results: readonly { label: string; value: string }[];
  /** Hue rotation seed (deg) for the generated gradient artwork — the fallback when `preview` is absent. */
  hue: number;
  preview?: TemplatePreview;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  property: string;
  rating: number;
}

export interface PricingTier {
  name: string;
  tagline: string;
  price: string;
  cadence: string;
  featured?: boolean;
  cta: string;
  features: readonly string[];
}

export interface ComparisonRow {
  feature: string;
  starter: string | boolean;
  professional: string | boolean;
  enterprise: string | boolean;
}

/** One orbit point in the hero: a capability plus the copy it swaps in. */
export interface HeroOrbitSlide {
  id: string;
  /** Two-digit marker rendered inside the orbit point. */
  index: string;
  /** Short name under the point, and in the hero counter. */
  label: string;
  /** Headline split in two — the second line renders in the gold gradient. */
  headline: readonly [string, string];
  blurb: string;
  /** Copy for the static disc at the center of the ring. */
  center: { title: readonly [string, string]; sub: string };
  /** One-line proof point beneath the blurb. */
  proof: string;
  cta: { label: string; href: Route };
  /** Hue rotation seed (deg) for this slide's generated backdrop. */
  hue: number;
}
