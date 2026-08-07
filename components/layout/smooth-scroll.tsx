"use client";

import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

function ScrollReset() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}

/**
 * Lenis smooth scrolling.
 *
 * Note: <html> deliberately carries NO `data-scroll-behavior="smooth"`. In Next 16
 * that attribute re-enables Next's legacy override of `scroll-behavior` during
 * navigation, which double-eases against Lenis and produces visible jitter.
 *
 * `anchors` routes every same-page `href="#id"` through Lenis with a header offset,
 * so no custom scroll-link component is needed.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReduced = useReducedMotion();

  return (
    <ReactLenis
      root
      options={{
        lerp: prefersReduced ? 1 : 0.1,
        duration: prefersReduced ? 0 : 1.2,
        smoothWheel: !prefersReduced,
        syncTouch: false,
        touchMultiplier: 1.6,
        wheelMultiplier: 1,
        autoRaf: true,
        anchors: { offset: -96 },
      }}
    >
      <ScrollReset />
      {children}
    </ReactLenis>
  );
}
