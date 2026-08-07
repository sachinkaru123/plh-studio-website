"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { DURATION, EASE_LUXE, VIEWPORT } from "@/lib/motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 28 },
  down: { x: 0, y: -28 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
  none: { x: 0, y: 0 },
};

export interface FadeInProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  blur?: boolean;
  once?: boolean;
  amount?: number;
}

/** The workhorse scroll reveal. Reduced motion is handled by <MotionProvider>. */
export function FadeIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = DURATION.base,
  distance = 1,
  blur = true,
  once = VIEWPORT.once,
  amount = VIEWPORT.amount,
}: FadeInProps) {
  const { x, y } = offsets[direction];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: x * distance,
      y: y * distance,
      filter: blur ? "blur(10px)" : "blur(0px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration, delay, ease: EASE_LUXE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: VIEWPORT.margin }}
    >
      {children}
    </motion.div>
  );
}
