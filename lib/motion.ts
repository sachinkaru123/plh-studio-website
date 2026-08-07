import type { Variants } from "motion/react";

/** Shared easing/duration constants so timings aren't scattered as magic numbers. */
export const EASE_LUXE = [0.22, 1, 0.36, 1] as const;
export const EASE_SWIFT = [0.4, 0, 0.2, 1] as const;

export const DURATION = {
  fast: 0.3,
  base: 0.6,
  slow: 0.9,
} as const;

/** Default viewport config for scroll-triggered reveals. */
export const VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: DURATION.base, ease: EASE_LUXE },
  },
};
