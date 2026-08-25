"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { heroOrbit, heroOrbitSlides } from "@/content/hero";
import { useFinePointer } from "@/hooks/use-fine-pointer";
import { EASE_LUXE } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { HeroOrbitSlide } from "@/types/content";

const COUNT = heroOrbitSlides.length;
const AUTOPLAY_MS = 6500;

/**
 * Point centers as percentages of the rotating ring's box — first at twelve
 * o'clock, then clockwise. Computed once at module scope; the ring never
 * changes size in a way that would move them.
 */
const POINTS = heroOrbitSlides.map((_, i) => {
  const radians = ((-90 + i * (360 / COUNT)) * Math.PI) / 180;
  return { left: 50 + 50 * Math.cos(radians), top: 50 + 50 * Math.sin(radians) };
});

/**
 * Orbit hero.
 *
 * Five capabilities ride a slowly rotating ring; hovering, focusing or tapping
 * one swaps the headline, the disc at the center and the backdrop. Autoplay
 * advances every {@link AUTOPLAY_MS} and yields to the pointer.
 *
 * The whole thing is pinned to one viewport height (`100svh` — the *small*
 * viewport unit, so mobile browser chrome can't push the ring off-screen).
 */
export function Hero() {
  const [active, setActive] = useState(0);
  /** `null` until the visitor touches the play/pause control. */
  const [playRequested, setPlayRequested] = useState<boolean | null>(null);
  const [pointerOver, setPointerOver] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();

  const slide = heroOrbitSlides[active];
  // Nothing moves on its own for visitors who asked for less motion — but they
  // can still start the rotation from the ticker's play button.
  const playing = playRequested ?? !reduceMotion;
  const paused = pointerOver || !playing;

  // Keyed on `active` as well as `paused`, so a slide the visitor just picked
  // gets a full turn rather than the remainder of the previous one.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % COUNT),
      AUTOPLAY_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, paused]);

  const registerTab = useCallback(
    (index: number, node: HTMLButtonElement | null) => {
      tabRefs.current[index] = node;
    },
    [],
  );

  const select = useCallback((index: number, focus = false) => {
    setActive(index);
    if (focus) tabRefs.current[index]?.focus();
  }, []);

  // Roving-tabindex keyboard support for the tablist (APG tabs pattern).
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const step =
        event.key === "ArrowRight" || event.key === "ArrowDown"
          ? 1
          : event.key === "ArrowLeft" || event.key === "ArrowUp"
            ? -1
            : 0;

      if (step !== 0) {
        event.preventDefault();
        select((active + step + COUNT) % COUNT, true);
      } else if (event.key === "Home") {
        event.preventDefault();
        select(0, true);
      } else if (event.key === "End") {
        event.preventDefault();
        select(COUNT - 1, true);
      }
    },
    [active, select],
  );

  return (
    <section
      id="hero"
      aria-roledescription="carousel"
      aria-label="What PLH Studio builds"
      className="relative isolate flex h-[100svh] min-h-[38rem] flex-col overflow-hidden"
    >
      <HeroBackdrop active={active} />

      <div className="container-luxe flex min-h-0 flex-1 flex-col pt-16 lg:pt-20">
        <div className="grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:grid-rows-1 lg:gap-10">
          {/* Copy — the only part of the hero that changes wholesale */}
          <div className="flex max-w-xl flex-col items-start gap-4 pt-5 sm:gap-5 lg:pt-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              {heroOrbit.kicker}
            </p>

            <div
              id={`${uid}-panel`}
              role="tabpanel"
              aria-labelledby={`${uid}-tab-${slide.id}`}
              // Announce swaps only while autoplay is stopped; otherwise the
              // rotation would talk over the visitor every few seconds.
              aria-live={paused ? "polite" : "off"}
              // One grid cell, every slide stacked in it: the entering and
              // exiting copy crossfade in place instead of collapsing the
              // column and shunting the ring sideways mid-transition.
              className="grid w-full"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={slide.id}
                  className="col-start-1 row-start-1 flex flex-col items-start gap-4 sm:gap-5"
                  initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: -14,
                    filter: "blur(10px)",
                    // The outgoing copy overlaps the incoming copy for a beat;
                    // without this its links stay clickable.
                    pointerEvents: "none",
                  }}
                  transition={{ duration: 0.5, ease: EASE_LUXE }}
                >
                  <h1 className="text-hero text-[clamp(2.1rem,6.6vw,4.4rem)] font-extrabold leading-[0.95]">
                    {slide.headline[0]}
                    <br />
                    <span className="text-gold-gradient">
                      {slide.headline[1]}
                    </span>
                  </h1>

                  <p className="max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {slide.blurb}
                  </p>

                  <p className="flex items-center gap-2 text-xs font-medium sm:text-sm">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-gold"
                    />
                    {slide.proof}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Magnetic>
                      <Button asChild size="lg" className="group">
                        <Link href={slide.cta.href}>
                          {slide.cta.label}
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </Magnetic>
                    <Button asChild size="lg" variant="outline">
                      <Link href={heroOrbit.secondaryCta.href}>
                        {heroOrbit.secondaryCta.label}
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Orbit */}
          {/* `self-stretch` fills the grid row so the ring sits centered in the
              space that's left, rather than at the top of a content-height cell. */}
          <div className="flex min-h-0 items-center justify-center self-stretch [--dial:min(80vw,36svh)] sm:[--dial:min(62vw,42svh)] lg:[--dial:min(50vw,74svh)]">
            <OrbitDial
              active={active}
              paused={paused}
              uid={uid}
              registerTab={registerTab}
              onSelect={select}
              onKeyDown={handleKeyDown}
              onPointerOverChange={setPointerOver}
            />
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 pb-5 pt-3">
          <p className="hidden text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground lg:block">
            {finePointer ? "Hover" : "Tap"} {heroOrbit.hint}
          </p>

          <HeroTicker
            slide={slide}
            active={active}
            playing={playing}
            onTogglePlay={() => setPlayRequested(!playing)}
          />
        </div>
      </div>
    </section>
  );
}

/**
 * Per-slide backdrop.
 *
 * All five are mounted and crossfaded by opacity rather than swapped, so there
 * is never a paint gap, and each is generated from the brand tokens — the hero
 * re-themes with the rest of the site and costs zero image requests. Swap the
 * `backgroundImage` for a photograph per slide when the art direction lands.
 */
function HeroBackdrop({ active }: { active: number }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {heroOrbitSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-[opacity,transform] duration-[1600ms] ease-luxe",
            i === active ? "scale-100 opacity-100" : "scale-105 opacity-0",
          )}
          style={{
            filter: `hue-rotate(${slide.hue}deg)`,
            backgroundImage: [
              "radial-gradient(58% 52% at 74% 42%, color-mix(in oklab, var(--brand-gold) 34%, transparent), transparent 70%)",
              "radial-gradient(46% 46% at 6% 14%, color-mix(in oklab, var(--brand-gold-deep) 30%, transparent), transparent 68%)",
              "linear-gradient(150deg, color-mix(in oklab, var(--brand-gold) 10%, var(--brand-bg)) 0%, var(--brand-bg) 52%, color-mix(in oklab, var(--brand-gold-deep) 18%, var(--brand-bg)) 100%)",
            ].join(","),
          }}
        />
      ))}

      {/* Reading scrim under the copy column, and a fade into the next section */}
      <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--brand-bg)_0%,color-mix(in_oklab,var(--brand-bg)_74%,transparent)_36%,transparent_72%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,var(--brand-bg),transparent)]" />
    </div>
  );
}

function OrbitDial({
  active,
  paused,
  uid,
  registerTab,
  onSelect,
  onKeyDown,
  onPointerOverChange,
}: {
  active: number;
  paused: boolean;
  uid: string;
  registerTab: (index: number, node: HTMLButtonElement | null) => void;
  onSelect: (index: number) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
  onPointerOverChange: (over: boolean) => void;
}) {
  const slide = heroOrbitSlides[active];
  const pausedRing = paused && "[animation-play-state:paused]";

  return (
    <div
      // Sized from the width alone: a definite height plus a clamped width
      // would let `aspect-square` lose, and the ring would render as an ellipse.
      // `--dial` already carries an `svh` term, so it can't outgrow its row.
      className="relative aspect-square w-[min(var(--dial),100%)]"
      onMouseEnter={() => onPointerOverChange(true)}
      onMouseLeave={() => onPointerOverChange(false)}
    >
      {/* Glow, static rim, and a dashed ring drifting at its own pace */}
      <div
        aria-hidden="true"
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,var(--fx-glow),transparent_62%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute inset-[2%] rounded-full border border-line"
      />
      <div
        aria-hidden="true"
        className={cn(
          "animate-orbit absolute inset-[19%] rounded-full border border-dashed border-line [animation-duration:96s]",
          pausedRing,
        )}
      />

      {/* Rotating ring — tabs only, so the tablist stays a clean container */}
      <div
        role="tablist"
        aria-label="PLH Studio capabilities"
        onKeyDown={onKeyDown}
        className={cn(
          "animate-orbit absolute inset-[11%] rounded-full border border-line-strong",
          pausedRing,
        )}
      >
        {heroOrbitSlides.map((point, i) => (
          <OrbitPoint
            key={point.id}
            slide={point}
            index={i}
            isActive={i === active}
            paused={paused}
            uid={uid}
            registerTab={registerTab}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Center disc */}
      <div className="glass gold-frame absolute inset-[27%] grid place-items-center rounded-full px-3 text-center">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.id}
            className="col-start-1 row-start-1"
            initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: EASE_LUXE }}
          >
            <strong className="block text-balance text-[clamp(0.8rem,2.9vw,2.1rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.02em]">
              {slide.center.title[0]}
              <br />
              {slide.center.title[1]}
            </strong>
            <span className="mt-2 block text-[clamp(0.5rem,1vw,0.65rem)] uppercase tracking-[0.16em] text-gold">
              {slide.center.sub}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function OrbitPoint({
  slide,
  index,
  isActive,
  paused,
  uid,
  registerTab,
  onSelect,
}: {
  slide: HeroOrbitSlide;
  index: number;
  isActive: boolean;
  paused: boolean;
  uid: string;
  registerTab: (index: number, node: HTMLButtonElement | null) => void;
  onSelect: (index: number) => void;
}) {
  const { left, top } = POINTS[index];

  return (
    <button
      ref={(node) => {
        registerTab(index, node);
      }}
      type="button"
      role="tab"
      id={`${uid}-tab-${slide.id}`}
      aria-controls={`${uid}-panel`}
      // Named here rather than from its text, because the label under the
      // point is hidden on small screens where the ring has no room for it.
      aria-label={`${slide.index} — ${slide.label}`}
      aria-selected={isActive}
      tabIndex={isActive ? 0 : -1}
      style={{ left: `${left}%`, top: `${top}%` }}
      onClick={() => onSelect(index)}
      onMouseEnter={() => onSelect(index)}
      onFocus={() => onSelect(index)}
      className={cn(
        "absolute size-[21%] -translate-x-1/2 -translate-y-1/2 rounded-full border",
        "transition-[background-color,border-color,box-shadow,color,scale] duration-300 ease-luxe",
        isActive
          ? "gold-gradient scale-110 border-gold text-on-gold shadow-glow"
          : "glass border-line hover:scale-105 hover:border-gold/60",
      )}
    >
      {/* Counter-rotation: cancels the ring's spin about this point's own
          center, so the number and its label read upright at every angle. */}
      <span
        className={cn(
          "animate-orbit-counter absolute inset-0 grid place-items-center",
          paused && "[animation-play-state:paused]",
        )}
      >
        <span className="text-[clamp(0.62rem,1.3vw,0.95rem)] font-semibold tracking-[0.12em]">
          {slide.index}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-full mt-2 hidden -translate-x-1/2 whitespace-nowrap",
            "text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-colors sm:block",
            isActive ? "text-gold" : "text-muted-foreground",
          )}
        >
          {slide.label}
        </span>
      </span>
    </button>
  );
}

function HeroTicker({
  slide,
  active,
  playing,
  onTogglePlay,
}: {
  slide: HeroOrbitSlide;
  active: number;
  playing: boolean;
  onTogglePlay: () => void;
}) {
  return (
    <div className="flex w-full items-center gap-4 lg:w-auto">
      <div className="min-w-0 flex-1 lg:flex-none lg:text-right">
        <p className="text-[0.62rem] font-medium tracking-[0.18em] text-muted-foreground">
          {slide.index}
          <span className="opacity-50"> / 0{COUNT}</span>
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold sm:text-base">
          {slide.label}
        </p>
        <div className="mt-2 h-0.5 w-full rounded-full bg-line-strong lg:ml-auto lg:w-44">
          <span
            className="ease-luxe block h-0.5 rounded-full bg-gold transition-[width] duration-500"
            style={{ width: `${((active + 1) / COUNT) * 100}%` }}
          />
        </div>
      </div>

      <Button
        variant="outline"
        size="icon-sm"
        onClick={onTogglePlay}
        aria-label={
          playing ? "Pause the rotating hero" : "Resume the rotating hero"
        }
        className="shrink-0 rounded-full"
      >
        {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
      </Button>
    </div>
  );
}
