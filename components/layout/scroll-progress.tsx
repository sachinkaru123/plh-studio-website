"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Gold reading-progress bar. Decorative — hidden from assistive tech. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="gold-gradient pointer-events-none fixed inset-x-0 top-0 z-100 h-0.5 origin-left"
    />
  );
}
