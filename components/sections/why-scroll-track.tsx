"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { Icon } from "@/components/shared/icon";
import { GradientArt } from "@/components/visuals/gradient-art";
import { cn } from "@/lib/utils";
import type { ValueCard } from "@/types/content";

/**
 * Mobile-only scroll-jacked panel track: the section pins for `cards.length`
 * viewport-heights of vertical scroll, and that scroll progress drives a
 * horizontal slide through the cards — one card per screen's worth of scroll.
 *
 * Lenis (see `components/layout/smooth-scroll.tsx`) runs in native (non-virtual)
 * mode, so it eases the *real* document scroll position every frame — `useScroll`
 * reads that position directly via the DOM, which is why the horizontal slide
 * inherits the same easing as the rest of the site for free.
 *
 * `prefers-reduced-motion` users get the cards as a plain vertical stack instead
 * — no pin, no scroll-jacking — matching how the rest of this app treats that
 * preference (see `MotionProvider`).
 */
export function WhyScrollTrack({
  cards,
  className,
}: {
  cards: readonly ValueCard[];
  className?: string;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const count = cards.length;

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(count - 1) * 100}vw`]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex(Math.min(count - 1, Math.max(0, Math.round(value * (count - 1)))));
  });

  // Full-bleed edge-to-edge, breaking out of `container-luxe`'s inline padding.
  const bleed = "relative left-1/2 w-screen -ml-[50vw]";

  if (prefersReducedMotion) {
    return (
      <div className={cn(bleed, "flex flex-col", className)}>
        {cards.map((card, index) => (
          <Panel key={card.title} card={card} index={index} />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={wrapRef}
      className={cn(bleed, className)}
      style={{ height: `${count * 100}dvh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        <motion.div className="flex h-full" style={{ x }}>
          {cards.map((card, index) => (
            <Panel key={card.title} card={card} index={index} className="w-screen shrink-0" />
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-6 flex items-center justify-center gap-2"
        >
          {cards.map((card, index) => (
            <span
              key={card.title}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-white/30",
              )}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-6 font-mono text-xs tracking-[0.14em] text-gold"
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

function Panel({
  card,
  index,
  className,
}: {
  card: ValueCard;
  index: number;
  className?: string;
}) {
  return (
    <article className={cn("relative isolate flex h-full flex-col justify-end overflow-hidden", className)}>
      {card.backgroundImg ? (
        <Image
          src={card.backgroundImg}
          alt=""
          fill
          aria-hidden="true"
          sizes="100vw"
          className="-z-10 object-cover"
        />
      ) : (
        <GradientArt className="absolute inset-0 -z-10" hue={index * 40} />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 via-45% to-ink/20"
      />

      <div className="flex items-end gap-4 p-6 pb-16">
        <div className="min-w-0 flex-1">
          <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink/60 text-gold">
            <Icon name={card.icon} className="size-5" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{card.blurb}</p>
        </div>
      </div>
    </article>
  );
}
