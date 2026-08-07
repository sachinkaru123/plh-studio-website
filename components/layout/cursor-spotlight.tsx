"use client";

import { useEffect, useRef } from "react";
import { useFinePointer } from "@/hooks/use-fine-pointer";

/**
 * Soft gold light that follows the cursor.
 *
 * Coordinates are written to CSS custom properties inside a rAF loop directly on
 * the node — no React state, so pointer movement never triggers a render.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const finePointer = useFinePointer();

  useEffect(() => {
    const node = ref.current;
    if (!node || !finePointer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let targetX = x;
    let targetY = y;

    function onMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;
    }

    function tick() {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.08;
      node!.style.setProperty("--mx", `${x}px`);
      node!.style.setProperty("--my", `${y}px`);
      frame = requestAnimationFrame(tick);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="spotlight pointer-events-none fixed inset-0 z-0 hidden md:block"
    />
  );
}
