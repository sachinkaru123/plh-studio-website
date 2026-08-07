"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { GradientArt } from "@/components/visuals/gradient-art";
import { EASE_LUXE } from "@/lib/motion";
import { cn } from "@/lib/utils";

const steps = [
  "Choose Dates",
  "Select Room",
  "Guest Information",
  "Payment Summary",
  "Confirmation",
] as const;

const rooms = [
  { name: "Ocean Suite", rate: 420, hue: 178 },
  { name: "Garden Villa", rate: 365, hue: 120 },
  { name: "Deluxe King", rate: 290, hue: 32 },
] as const;

const NIGHTS = 4;

export function BookingDemo() {
  const [step, setStep] = useState(0);
  const [room, setRoom] = useState<(typeof rooms)[number]>(rooms[0]);

  const isLast = step === steps.length - 1;
  const subtotal = room.rate * NIGHTS;
  const taxes = Math.round(subtotal * 0.12);

  return (
    <Section id="booking-demo">
      <SectionHeading
        eyebrow="Interactive Demo"
        title="Try the booking flow yourself."
        lede="This is the same five-step reservation experience your guests get — click through it."
      />

      <div className="mx-auto mt-14 max-w-3xl">
        {/* Progress */}
        <div className="mb-8">
          <Progress
            value={((step + 1) / steps.length) * 100}
            className="h-1"
            aria-label={`Step ${step + 1} of ${steps.length}: ${steps[step]}`}
          />
          <ol className="mt-4 flex flex-wrap justify-between gap-2">
            {steps.map((label, i) => (
              <li
                key={label}
                aria-current={i === step ? "step" : undefined}
                className={cn(
                  "text-[0.7rem] font-medium transition-colors sm:text-xs",
                  i === step
                    ? "text-gold"
                    : i < step
                      ? "text-muted-foreground"
                      : "text-muted-foreground/40",
                )}
              >
                {label}
              </li>
            ))}
          </ol>
        </div>

        {/* Panel */}
        <div className="glass gold-frame min-h-96 rounded-3xl p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: EASE_LUXE }}
            >
              {step === 0 ? <StepDates /> : null}
              {step === 1 ? (
                <StepRooms selected={room} onSelect={setRoom} />
              ) : null}
              {step === 2 ? <StepGuest /> : null}
              {step === 3 ? (
                <StepSummary
                  room={room.name}
                  subtotal={subtotal}
                  taxes={taxes}
                />
              ) : null}
              {step === 4 ? <StepConfirmation room={room.name} /> : null}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>

          {isLast ? (
            <Button variant="outline" onClick={() => setStep(0)}>
              <RotateCcw className="size-4" />
              Start over
            </Button>
          ) : (
            <Button
              className="group"
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            >
              {step === 3 ? "Confirm booking" : "Continue"}
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}

function StepDates() {
  return (
    <div>
      <h3 className="text-xl font-semibold">When are you staying?</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Four nights, two guests — pre-filled for the demo.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Check in", value: "12 Aug 2026" },
          { label: "Check out", value: "16 Aug 2026" },
          { label: "Guests", value: "2 adults" },
        ].map((field) => (
          <div
            key={field.label}
            className="rounded-xl border border-line bg-ink/50 px-4 py-3.5"
          >
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {field.label}
            </p>
            <p className="mt-1 text-sm font-semibold">{field.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-7 gap-1.5" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "grid aspect-square place-items-center rounded-lg text-xs",
              i >= 11 && i <= 14
                ? "gold-gradient font-semibold text-on-gold"
                : "border border-line text-muted-foreground/50",
            )}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepRooms({
  selected,
  onSelect,
}: {
  selected: (typeof rooms)[number];
  onSelect: (room: (typeof rooms)[number]) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold">Choose your room</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Rates shown per night, inclusive of breakfast.
      </p>
      <div className="mt-6 flex flex-col gap-3" role="radiogroup" aria-label="Room type">
        {rooms.map((option) => {
          const active = option.name === selected.name;
          return (
            <button
              key={option.name}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onSelect(option)}
              className={cn(
                "flex items-center gap-4 rounded-xl border p-3 text-left transition-all duration-300",
                active
                  ? "border-gold/50 bg-gold/5 shadow-glow"
                  : "border-line hover:border-gold/30",
              )}
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-lg">
                <GradientArt hue={option.hue} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{option.name}</p>
                <p className="text-xs text-muted-foreground">
                  King bed · Sea view · 42m²
                </p>
              </div>
              <div className="text-right">
                <p className="text-base font-bold text-gold">${option.rate}</p>
                <p className="text-[0.65rem] text-muted-foreground">per night</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepGuest() {
  return (
    <div>
      <h3 className="text-xl font-semibold">Guest information</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Illustrative only — this demo does not submit or store anything.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {[
          { label: "Full name", value: "Alex Morgan" },
          { label: "Email", value: "alex@example.com" },
          { label: "Phone", value: "+1 555 0142" },
          { label: "Country", value: "United States" },
        ].map((field) => (
          <div
            key={field.label}
            className="rounded-xl border border-line bg-ink/50 px-4 py-3.5"
          >
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {field.label}
            </p>
            <p className="mt-1 text-sm font-semibold">{field.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function StepSummary({
  room,
  subtotal,
  taxes,
}: {
  room: string;
  subtotal: number;
  taxes: number;
}) {
  const rows = [
    { label: `${room} × ${NIGHTS} nights`, value: `$${subtotal}` },
    { label: "Taxes & fees", value: `$${taxes}` },
    { label: "OTA commission", value: "$0", accent: true },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold">Payment summary</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Booked direct — so the commission line is zero.
      </p>
      <dl className="mt-6 flex flex-col gap-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-line pb-3 text-sm"
          >
            <dt className="text-muted-foreground">{row.label}</dt>
            <dd
              className={cn(
                "font-semibold",
                row.accent && "text-gold",
              )}
            >
              {row.value}
            </dd>
          </div>
        ))}
        <div className="flex items-center justify-between pt-1">
          <dt className="text-base font-semibold">Total</dt>
          <dd className="text-2xl font-extrabold text-gold">
            ${subtotal + taxes}
          </dd>
        </div>
      </dl>
    </div>
  );
}

function StepConfirmation({ room }: { room: string }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <motion.span
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE_LUXE }}
        className="gold-gradient grid size-16 place-items-center rounded-full text-on-gold"
      >
        <Check className="size-8" aria-hidden="true" />
      </motion.span>
      <h3 className="mt-6 text-2xl font-bold">Booking confirmed</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Your {room} is reserved for 12–16 August. A confirmation would normally
        arrive by email within seconds.
      </p>
      <p className="mt-4 rounded-full border border-line bg-ink/50 px-4 py-1.5 text-xs text-muted-foreground">
        Reference PLH-2026-0842
      </p>
    </div>
  );
}
