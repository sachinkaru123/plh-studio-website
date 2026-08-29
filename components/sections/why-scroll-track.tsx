"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionTemplate,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { ArrowRight } from "lucide-react";
import { Icon } from "@/components/shared/icon";
import { GradientArt } from "@/components/visuals/gradient-art";
import { EASE_SWIFT } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { ValueCard } from "@/types/content";

const CARD_HEIGHT = "24rem";
/** Vertical scroll budget per card. Lower feels snappier; higher feels heavier. */
const SCROLL_PER_CARD_DVH = 78;
/**
 * Fraction of each card's scroll segment the track sits still on that card
 * before sliding to the next. The remainder is the slide itself — so the
 * effect reads as "focus one card, move, focus the next" rather than a
 * continuous smear.
 */
const HOLD_FRACTION = 0.62;

const slideEase = cubicBezier(...EASE_SWIFT);

/**
 * Mobile-only scroll-jacked card track: a full-screen slide pins in place
 * while vertical scroll drives a horizontal slide through the cards.
 *
 * Smoothness comes from three things working together:
 *  - the horizontal `x` is a *stepped* transform of scroll progress — it
 *    rests on each card for most of that card's scroll range, then eases
 *    across to the next, so the motion always settles instead of drifting;
 *  - a light, non-overshooting spring takes the last bit of frame-to-frame
 *    jitter out of native touch scrolling;
 *  - when scrolling goes idle mid-slide, we snap to the nearest card via
 *    Lenis so a card is always centered.
 *
 * The ambient "color shadow" behind the card is a single blurred layer that
 * crossfades on the active card — not one blurred copy per card — which keeps
 * the GPU cost flat as the track grows.
 *
 * `prefers-reduced-motion` users get a plain vertical stack — no pin, no
 * scroll-jacking — matching how the rest of the app treats that preference.
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
  const lenis = useLenis();
  const count = cards.length;
  const segments = Math.max(1, count - 1);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Stepped mapping: hold on card k, then ease to card k+1, repeated per segment.
  const inputRange: number[] = [0];
  const outputRange: number[] = [0];
  for (let k = 0; k < segments; k++) {
    const start = k / segments;
    const end = (k + 1) / segments;
    inputRange.push(start + (end - start) * HOLD_FRACTION, end);
    outputRange.push(-((k * 100) / count), -(((k + 1) * 100) / count));
  }

  const xRaw = useTransform(scrollYProgress, inputRange, outputRange, {
    ease: slideEase,
  });
  const xSpring = useSpring(xRaw, {
    stiffness: 200,
    damping: 40,
    mass: 0.3,
    restDelta: 0.001,
  });
  const x = useMotionTemplate`${xSpring}%`;

  const [activeIndex, setActiveIndex] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    setActiveIndex(Math.min(count - 1, Math.max(0, Math.round(value * segments))));
  });

  // Snap to the nearest card once vertical scrolling goes quiet.
  const snapTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const snapToNearest = useCallback(() => {
    if (prefersReducedMotion) return;
    const el = wrapRef.current;
    if (!el) return;
    const distance = el.offsetHeight - window.innerHeight;
    if (distance <= 0) return;
    const progress = (window.scrollY - el.offsetTop) / distance;
    if (progress < -0.05 || progress > 1.05) return;
    const clamped = Math.min(1, Math.max(0, progress));
    const nearest = Math.round(clamped * segments) / segments;
    const targetY = el.offsetTop + nearest * distance;
    if (Math.abs(targetY - window.scrollY) < 2) return;
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.6, easing: (t) => 1 - (1 - t) ** 3 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }, [lenis, prefersReducedMotion, segments]);

  useLenis(
    () => {
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(snapToNearest, 140);
    },
    [snapToNearest],
  );

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

  // Full-bleed edge-to-edge, breaking out of `container-luxe`'s inline padding.
  const bleed = "relative left-1/2 w-screen -ml-[50vw]";
  const activeCard = cards[activeIndex];

  return (
    <div
      ref={wrapRef}
      className={cn(bleed, className)}
      style={{ height: `${count * SCROLL_PER_CARD_DVH}dvh` }}
    >
      <div className="sticky top-0 h-dvh overflow-hidden">
        {/* Single ambient "color shadow" layer — crossfades on the active card. */}
        <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={activeIndex}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "linear" }}
            >
              {activeCard.backgroundImg ? (
                <Image
                  src={activeCard.backgroundImg}
                  alt=""
                  fill
                  sizes="100vw"
                  className="scale-125 object-cover opacity-60 blur-2xl"
                />
              ) : (
                <GradientArt
                  className="size-full scale-125 opacity-60 blur-2xl"
                  hue={activeIndex * 40}
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-ink/80" />
        </div>

        <motion.div
          className="flex h-full"
          style={{ width: `${count * 100}%`, x, willChange: "transform" }}
        >
          {cards.map((card, index) => (
            <div
              key={card.title}
              className="relative isolate flex h-full items-center justify-center p-6"
              style={{ flex: `0 0 ${100 / count}%` }}
            >
              <article
                className="gold-frame relative isolate flex w-full max-w-sm flex-col justify-end overflow-hidden rounded-2xl shadow-luxe"
                style={{ height: CARD_HEIGHT }}
              >
                <CardContent card={card} index={index} />
              </article>
            </div>
          ))}
        </motion.div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-4 z-20 flex -translate-y-1/2 flex-col items-center gap-2"
        >
          {cards.map((card, index) => (
            <span
              key={card.title}
              className={cn(
                "w-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "h-6 bg-gold" : "h-1.5 bg-white/30",
              )}
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-6 z-20 font-mono text-xs tracking-[0.14em] text-gold"
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
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
          sizes="(min-width: 400px) 384px, 90vw"
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
