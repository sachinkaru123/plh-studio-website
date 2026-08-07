"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";
import { EASE_LUXE } from "@/lib/motion";

/**
 * Animates a number into view.
 *
 * Writes straight to the DOM node via a ref rather than React state, so the
 * count doesn't trigger a render on every frame.
 */
export function CountUp({
  to,
  suffix = "",
  decimals = 0,
  duration = 2,
  className,
}: {
  to: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      node.textContent = to.toFixed(decimals) + suffix;
      return;
    }

    const controls = animate(0, to, {
      duration,
      ease: EASE_LUXE,
      onUpdate: (value) => {
        node.textContent = value.toFixed(decimals) + suffix;
      },
    });

    return () => controls.stop();
  }, [inView, to, decimals, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {/* Server-rendered fallback: the final value, so the static HTML is correct. */}
      {to.toFixed(decimals) + suffix}
    </span>
  );
}
