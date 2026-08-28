"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { GradientArt } from "@/components/visuals/gradient-art";
import { cn } from "@/lib/utils";
import type { ValueCard } from "@/types/content";

const CARD_HEIGHT = "22rem";
/** Scroll distance given to each card before the next one takes over — smaller feels snappier, larger feels heavier. */
const SCROLL_PER_CARD_DVH = 50;

/**
 * Mobile-only scroll-jacked card track: a single, normally-sized card (not a
 * full-screen slide) pins in place while vertical scroll drives a horizontal
 * slide through the rest of the cards behind it.
 *
 * `scrollYProgress` is passed through `useSpring` before it drives the `x`
 * transform, so the horizontal slide eases toward the scroll position instead
 * of snapping to it 1:1 every frame — this is the same smoothing technique
 * `ScrollProgress` uses for the reading bar.
 *
 * `prefers-reduced-motion` users get the cards as a plain vertical stack
 * instead — no pin, no scroll-jacking — matching how the rest of this app
 * treats that preference (see `MotionProvider`).
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
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    mass: 0.4,
    restDelta: 0.001,
  });
  const maxTranslate = ((count - 1) / count) * 100;
  const x = useTransform(smoothProgress, [0, 1], ["0%", `-${maxTranslate}%`]);

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex(Math.min(count - 1, Math.max(0, Math.round(value * (count - 1)))));
  });

  if (prefersReducedMotion) {
    return (
      <div className={cn("flex flex-col gap-5", className)}>
        {cards.map((card, index) => (
          <article
            key={card.title}
            className="gold-frame relative isolate flex flex-col justify-end overflow-hidden rounded-2xl"
            style={{ height: CARD_HEIGHT }}
          >
            <CardContent card={card} index={index} />
          </article>
        ))}
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={className} style={{ height: `${count * SCROLL_PER_CARD_DVH}dvh` }}>
      <div className="sticky top-24">
        <div className="gold-frame relative isolate overflow-hidden rounded-2xl" style={{ height: CARD_HEIGHT }}>
          <motion.div className="flex h-full" style={{ width: `${count * 100}%`, x }}>
            {cards.map((card, index) => (
              <div key={card.title} className="relative isolate flex h-full flex-col justify-end" style={{ flex: `0 0 ${100 / count}%` }}>
                <CardContent card={card} index={index} />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <span className="font-mono text-xs tracking-[0.14em] text-gold">
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="flex items-center gap-2" aria-hidden="true">
            {cards.map((card, index) => (
              <span
                key={card.title}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  index === activeIndex ? "w-6 bg-gold" : "w-1.5 bg-line",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CardContent({ card, index }: { card: ValueCard; index: number }) {
  return (
    <>
      {card.backgroundImg ? (
        <Image
          src={card.backgroundImg}
          alt=""
          fill
          aria-hidden="true"
          sizes="90vw"
          className="-z-10 object-cover"
        />
      ) : (
        <GradientArt className="absolute inset-0 -z-10" hue={index * 40} />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 via-45% to-ink/20"
      />

      <div className="flex items-end gap-4 p-6">
        <div className="min-w-0 flex-1">
          <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink/60 text-gold">
            <Icon name={card.icon} className="size-5" />
          </span>
          <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">{card.blurb}</p>
        </div>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/50 bg-ink/60 text-gold"
        >
          <ArrowRight className="size-4" />
        </span>
      </div>
    </>
  );
}
