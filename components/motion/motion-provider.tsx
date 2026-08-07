"use client";

import { MotionConfig } from "motion/react";
import { DURATION, EASE_LUXE } from "@/lib/motion";

/**
 * `reducedMotion="user"` is the single highest-leverage line in the app: Motion
 * strips transform/filter animation and keeps only opacity for users who ask for
 * reduced motion, so no primitive needs its own branching.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: DURATION.base, ease: EASE_LUXE }}
    >
      {children}
    </MotionConfig>
  );
}
