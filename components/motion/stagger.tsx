"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem, VIEWPORT } from "@/lib/motion";

export function Stagger({
  children,
  className,
  gap = 0.08,
  lenisPrevent = false,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  /** Set when this container scrolls its own axis (e.g. a horizontal card rail) — stops Lenis from hijacking that gesture. */
  lenisPrevent?: boolean;
}) {
  return (
    <motion.div
      className={className}
      data-lenis-prevent={lenisPrevent || undefined}
      variants={{
        ...staggerContainer,
        visible: { transition: { staggerChildren: gap, delayChildren: 0.05 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
    >
      {children}
    </motion.div>
  );
}

/** Must be rendered inside <Stagger> — it inherits the parent's variant state. */
export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
