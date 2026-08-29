"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { processSteps } from "@/content/process";
import type { ProcessStep } from "@/types/content";
import { cn } from "@/lib/utils";

const PANEL_EASE = [0.16, 0.8, 0.24, 1] as const;

/**
 * Tabbed showcase: a rail of steps on the left drives a single detail panel on
 * the right — number, title, blurb, a stage meter, and a mocked device cluster
 * whose screen tint rotates per step. Below `lg` the rail collapses into a
 * horizontally scrollable strip and the panel stacks.
 *
 * `prefers-reduced-motion` collapses every transition to a plain fade.
 */
export function Process() {
  const [active, setActive] = useState(0);
  const prefersReduced = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId().replace(/:/g, "");

  const step = processSteps[active];
  const count = processSteps.length;
  const last = count - 1;

  function handleKeyDown(event: React.KeyboardEvent, index: number) {
    let next = index;
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        next = index === last ? 0 : index + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        next = index === 0 ? last : index - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Our Process"
        title="Six steps from first call to steady growth."
        lede="No mystery, no drift — you always know which stage you're in and what comes next."
      />

      <div className="mt-14 grid gap-4 lg:grid-cols-[19rem_1fr] lg:items-stretch">
        {/* Rail */}
        <div
          role="tablist"
          aria-label="Process steps"
          aria-orientation="vertical"
          className={cn(
            "flex gap-2.5 lg:flex-col",
            "max-lg:fade-edges-x max-lg:-mx-4 max-lg:overflow-x-auto max-lg:px-4 max-lg:pb-1",
            "max-lg:[-ms-overflow-style:none] max-lg:[scrollbar-width:none] max-lg:[&::-webkit-scrollbar]:hidden",
          )}
        >
          {processSteps.map((item, index) => {
            const selected = index === active;
            return (
              <button
                key={item.index}
                ref={(el) => {
                  tabRefs.current[index] = el;
                }}
                type="button"
                role="tab"
                id={`${uid}-tab-${index}`}
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={cn(
                  "group flex shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left outline-none transition-colors duration-300",
                  "focus-visible:ring-2 focus-visible:ring-gold/60",
                  selected
                    ? "gold-frame border-gold/40 bg-gold/10"
                    : "border-line bg-surface/40 hover:border-line-strong",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs font-bold tabular-nums transition-colors",
                    selected ? "text-gold" : "text-muted-foreground/60",
                  )}
                >
                  {item.index}
                </span>
                <Icon
                  name={item.icon}
                  className={cn(
                    "size-[18px] shrink-0 transition-colors",
                    selected ? "text-gold" : "text-muted-foreground",
                  )}
                />
                <span
                  className={cn(
                    "whitespace-nowrap text-sm font-semibold transition-colors lg:whitespace-normal",
                    selected ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.title}
                </span>
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "ml-auto size-4 shrink-0 text-gold transition-all duration-300 max-lg:hidden",
                    selected
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-1 opacity-0",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Panel */}
        <div
          role="tabpanel"
          id={`${uid}-panel`}
          aria-labelledby={`${uid}-tab-${active}`}
          className="gold-frame relative flex min-h-[26rem] flex-col gap-8 overflow-hidden rounded-3xl bg-surface/25 p-7 sm:p-10 lg:flex-row lg:items-center lg:gap-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(130% 90% at 0% 0%, color-mix(in srgb, var(--brand-gold) 9%, transparent), transparent 55%)",
            }}
          />

          {/* Copy */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={step.index}
              initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.38, ease: PANEL_EASE }}
              className="flex flex-col lg:w-[20rem] lg:shrink-0"
            >
              <span className="grid size-9 place-items-center rounded-full border border-gold/50 font-mono text-xs font-bold tabular-nums text-gold">
                {step.index}
              </span>
              <h3 className="mt-5 text-xl font-bold sm:text-2xl">{step.title}</h3>
              <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-muted-foreground">
                {step.blurb}
              </p>

              <div className="mt-7">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
                  Stage {active + 1} of {count}
                </p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                  <motion.span
                    className="block h-full rounded-full bg-gold"
                    initial={false}
                    animate={{ width: `${((active + 1) / count) * 100}%` }}
                    transition={{
                      duration: prefersReduced ? 0 : 0.5,
                      ease: PANEL_EASE,
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Device cluster */}
          <div className="relative min-h-[15rem] flex-1 lg:min-h-[20rem]">
            <AnimatePresence initial={false}>
              <motion.div
                key={step.index}
                initial={
                  prefersReduced
                    ? { opacity: 0 }
                    : { opacity: 0, x: "3%", scale: 1.04 }
                }
                animate={
                  prefersReduced
                    ? { opacity: 1 }
                    : { opacity: 1, x: "-4%", scale: 1.04 }
                }
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: prefersReduced ? 0.3 : 0.5 },
                  default: {
                    duration: prefersReduced ? 0 : 2.6,
                    ease: PANEL_EASE,
                  },
                }}
                className="absolute inset-0 flex items-end justify-center"
              >
                <DeviceCluster step={step} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Section>
  );
}

/** Overlapping tablet + phone, screen tint rotated per step. */
function DeviceCluster({ step, index }: { step: ProcessStep; index: number }) {
  const hue = index * 44;

  return (
    <div className="relative aspect-4/3 w-full max-w-[26rem]">
      <div className="absolute bottom-0 left-[4%] h-[92%] w-[64%] overflow-hidden rounded-2xl border-[6px] border-[#17171a] bg-[#0c0c0e] shadow-luxe">
        <MockScreen step={step} hue={hue} lines={3} />
      </div>
      <div className="absolute -bottom-[4%] right-[3%] h-[70%] w-[30%] overflow-hidden rounded-[1.4rem] border-[5px] border-[#17171a] bg-[#0c0c0e] shadow-luxe">
        <MockScreen step={step} hue={hue} lines={2} compact />
      </div>
    </div>
  );
}

function MockScreen({
  step,
  hue,
  lines,
  compact = false,
}: {
  step: ProcessStep;
  hue: number;
  lines: number;
  compact?: boolean;
}) {
  return (
    <div className="relative isolate h-full overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(120% 120% at 18% 0%, #3a2f18, #0c0c0e 62%)",
          filter: `hue-rotate(${hue}deg) saturate(1.1)`,
        }}
      />
      <div className={cn("flex h-full flex-col", compact ? "p-2.5" : "p-3.5 sm:p-4")}>
        <span
          className={cn(
            "grid place-items-center rounded-lg bg-gold/20 text-gold",
            compact ? "size-5" : "size-7",
          )}
        >
          <Icon name={step.icon} className={compact ? "size-3" : "size-3.5"} />
        </span>
        <div className={cn("flex flex-col gap-2", compact ? "mt-2.5" : "mt-3.5")}>
          {Array.from({ length: lines }).map((_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full bg-white/15"
              style={{ width: `${80 - i * 16}%` }}
            />
          ))}
        </div>
        <span
          className={cn(
            "mt-auto self-start rounded-full border border-gold/50 font-bold uppercase tracking-[0.08em] text-gold",
            compact ? "px-2 py-0.5 text-[0.5rem]" : "px-2.5 py-1 text-[0.55rem]",
          )}
        >
          {step.title}
        </span>
      </div>
    </div>
  );
}
