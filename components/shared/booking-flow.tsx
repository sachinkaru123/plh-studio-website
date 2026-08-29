"use client";

import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
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

const MS_PER_DAY = 86_400_000;
const BOOKING_YEAR = new Date().getFullYear();
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date: Date, n: number) {
  return new Date(date.getFullYear(), date.getMonth() + n, 1);
}
function sameDay(a: Date, b: Date) {
  return a.getTime() === b.getTime();
}
function nightsBetween(a: Date, b: Date) {
  return Math.round((b.getTime() - a.getTime()) / MS_PER_DAY);
}
function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface Guest {
  name: string;
  email: string;
  phone: string;
  country: string;
}
const EMPTY_GUEST: Guest = { name: "", email: "", phone: "", country: "" };

/**
 * The interactive five-step booking widget, with no surrounding section
 * chrome — mount it inside a modal, a section, or anywhere else.
 *
 * Everything is live: the guest picks real dates on the calendar, chooses a
 * room, and fills in their details — later steps are derived from those.
 *
 * Pass `compact` when space is tight (e.g. a modal) to tighten spacing so the
 * whole flow fits without scrolling.
 */
export function BookingFlow({ compact = false }: { compact?: boolean }) {
  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [room, setRoom] = useState<(typeof rooms)[number]>(rooms[0]);
  const [guest, setGuest] = useState<Guest>(EMPTY_GUEST);

  const nights = checkIn && checkOut ? nightsBetween(checkIn, checkOut) : 0;
  const reference = useMemo(() => {
    const seed = `${checkIn?.getTime() ?? 0}|${checkOut?.getTime() ?? 0}|${room.name}|${guests}`;
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = (hash * 31 + seed.charCodeAt(i)) % 9000;
    }
    return `PLH-${BOOKING_YEAR}-${1000 + hash}`;
  }, [checkIn, checkOut, room.name, guests]);
  const subtotal = room.rate * nights;
  const taxes = Math.round(subtotal * 0.12);
  const isLast = step === steps.length - 1;

  const canAdvance =
    step === 0
      ? Boolean(checkIn && checkOut)
      : step === 2
        ? guest.name.trim().length > 1 && EMAIL_RE.test(guest.email)
        : true;

  function handlePickDate(date: Date) {
    if (!checkIn || checkOut) {
      setCheckIn(date);
      setCheckOut(null);
      return;
    }
    if (date.getTime() <= checkIn.getTime()) {
      setCheckIn(date);
      return;
    }
    setCheckOut(date);
  }

  function reset() {
    setStep(0);
    setCheckIn(null);
    setCheckOut(null);
    setGuests(2);
    setRoom(rooms[0]);
    setGuest(EMPTY_GUEST);
  }

  return (
    <div>
      {/* Progress */}
      <div className={compact ? "mb-4" : "mb-8"}>
        <Progress
          value={((step + 1) / steps.length) * 100}
          className="h-1"
          aria-label={`Step ${step + 1} of ${steps.length}: ${steps[step]}`}
        />
        <ol className={cn("flex flex-wrap justify-between gap-2", compact ? "mt-3" : "mt-4")}>
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
      <div
        className={cn(
          "glass gold-frame rounded-3xl",
          compact ? "min-h-0 p-5" : "min-h-96 p-6 sm:p-8",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -24, filter: "blur(8px)" }}
            transition={{ duration: 0.4, ease: EASE_LUXE }}
          >
            {step === 0 ? (
              <StepDates
                compact={compact}
                checkIn={checkIn}
                checkOut={checkOut}
                nights={nights}
                guests={guests}
                onPickDate={handlePickDate}
                onGuestsChange={setGuests}
              />
            ) : null}
            {step === 1 ? (
              <StepRooms selected={room} onSelect={setRoom} />
            ) : null}
            {step === 2 ? (
              <StepGuest value={guest} onChange={setGuest} />
            ) : null}
            {step === 3 ? (
              <StepSummary
                room={room.name}
                nights={nights}
                subtotal={subtotal}
                taxes={taxes}
              />
            ) : null}
            {step === 4 ? (
              <StepConfirmation
                room={room.name}
                checkIn={checkIn}
                checkOut={checkOut}
                guestName={guest.name}
                reference={reference}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className={cn("flex items-center justify-between gap-3", compact ? "mt-4" : "mt-6")}>
        <Button
          variant="ghost"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>

        {isLast ? (
          <Button variant="outline" onClick={reset}>
            <RotateCcw className="size-4" />
            Start over
          </Button>
        ) : (
          <Button
            className="group"
            disabled={!canAdvance}
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          >
            {step === 3 ? "Confirm booking" : "Continue"}
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        )}
      </div>
    </div>
  );
}

function StepDates({
  compact = false,
  checkIn,
  checkOut,
  nights,
  guests,
  onPickDate,
  onGuestsChange,
}: {
  compact?: boolean;
  checkIn: Date | null;
  checkOut: Date | null;
  nights: number;
  guests: number;
  onPickDate: (date: Date) => void;
  onGuestsChange: (guests: number) => void;
}) {
  return (
    <div>
      <h3 className={compact ? "text-lg font-semibold" : "text-xl font-semibold"}>
        When are you staying?
      </h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        {checkIn && !checkOut
          ? "Now pick your check-out date."
          : "Tap a start and end date on the calendar."}
      </p>

      <div className={cn("grid gap-3 sm:grid-cols-3", compact ? "mt-4" : "mt-6")}>
        <DateField label="Check in" value={checkIn ? formatDate(checkIn) : "—"} compact={compact} />
        <DateField label="Check out" value={checkOut ? formatDate(checkOut) : "—"} compact={compact} />
        <div
          className={cn(
            "rounded-xl border border-line bg-ink/50 px-4",
            compact ? "py-2" : "py-3",
          )}
        >
          <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
            Guests
          </p>
          <div className="mt-1 flex items-center justify-between">
            <button
              type="button"
              aria-label="Fewer guests"
              onClick={() => onGuestsChange(Math.max(1, guests - 1))}
              disabled={guests <= 1}
              className="grid size-6 place-items-center rounded-md border border-line text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <Minus className="size-3" />
            </button>
            <span className="text-sm font-semibold">
              {guests} {guests === 1 ? "adult" : "adults"}
            </span>
            <button
              type="button"
              aria-label="More guests"
              onClick={() => onGuestsChange(Math.min(6, guests + 1))}
              disabled={guests >= 6}
              className="grid size-6 place-items-center rounded-md border border-line text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
            >
              <Plus className="size-3" />
            </button>
          </div>
        </div>
      </div>

      <div className={compact ? "mt-4" : "mt-6"}>
        <Calendar
          compact={compact}
          checkIn={checkIn}
          checkOut={checkOut}
          onPick={onPickDate}
        />
      </div>

      {nights > 0 ? (
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {nights} {nights === 1 ? "night" : "nights"} selected
        </p>
      ) : null}
    </div>
  );
}

function DateField({
  label,
  value,
  compact,
}: {
  label: string;
  value: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-line bg-ink/50 px-4",
        compact ? "py-2.5" : "py-3.5",
      )}
    >
      <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
}

function Calendar({
  checkIn,
  checkOut,
  onPick,
  compact = false,
}: {
  checkIn: Date | null;
  checkOut: Date | null;
  onPick: (date: Date) => void;
  compact?: boolean;
}) {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [view, setView] = useState<Date>(() => startOfMonth(checkIn ?? new Date()));

  const daysInMonth = new Date(
    view.getFullYear(),
    view.getMonth() + 1,
    0,
  ).getDate();
  const leadingBlanks = startOfMonth(view).getDay();
  const cells: (Date | null)[] = [
    ...Array.from({ length: leadingBlanks }, () => null),
    ...Array.from(
      { length: daysInMonth },
      (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1),
    ),
  ];
  const canGoPrev = startOfMonth(view).getTime() > startOfMonth(today).getTime();

  return (
    <div className="rounded-xl border border-line bg-ink/50 p-3">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          aria-label="Previous month"
          onClick={() => canGoPrev && setView(addMonths(view, -1))}
          disabled={!canGoPrev}
          className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-line/40 disabled:opacity-25"
        >
          <ChevronLeft className="size-4" />
        </button>
        <p className="text-sm font-semibold">
          {view.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </p>
        <button
          type="button"
          aria-label="Next month"
          onClick={() => setView(addMonths(view, 1))}
          className="grid size-7 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-line/40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((day) => (
          <span
            key={day}
            className="text-[0.6rem] font-medium uppercase tracking-wide text-muted-foreground/60"
          >
            {day}
          </span>
        ))}
        {cells.map((date, i) => {
          if (!date) return <span key={`blank-${i}`} />;
          const disabled = date.getTime() < today.getTime();
          const isStart = checkIn ? sameDay(date, checkIn) : false;
          const isEnd = checkOut ? sameDay(date, checkOut) : false;
          const inRange =
            checkIn && checkOut
              ? date.getTime() > checkIn.getTime() &&
                date.getTime() < checkOut.getTime()
              : false;
          return (
            <button
              key={date.toISOString()}
              type="button"
              disabled={disabled}
              aria-pressed={isStart || isEnd}
              onClick={() => onPick(date)}
              className={cn(
                "grid place-items-center rounded-md text-xs transition-colors",
                compact ? "h-7" : "h-8",
                disabled && "text-muted-foreground/25",
                !disabled &&
                  !isStart &&
                  !isEnd &&
                  !inRange &&
                  "text-foreground hover:bg-gold/10",
                inRange && "bg-gold/15 text-foreground",
                (isStart || isEnd) && "gold-gradient font-semibold text-on-gold",
              )}
            >
              {date.getDate()}
            </button>
          );
        })}
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

function StepGuest({
  value,
  onChange,
}: {
  value: Guest;
  onChange: (guest: Guest) => void;
}) {
  const fields: { key: keyof Guest; label: string; type: string; placeholder: string }[] = [
    { key: "name", label: "Full name", type: "text", placeholder: "Alex Morgan" },
    { key: "email", label: "Email", type: "email", placeholder: "alex@example.com" },
    { key: "phone", label: "Phone", type: "tel", placeholder: "+1 555 0142" },
    { key: "country", label: "Country", type: "text", placeholder: "United States" },
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold">Guest information</h3>
      <p className="mt-1.5 text-sm text-muted-foreground">
        Illustrative only — this demo does not submit or store anything.
      </p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.key} className="flex flex-col gap-1.5">
            <span className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {field.label}
            </span>
            <Input
              type={field.type}
              value={value[field.key]}
              placeholder={field.placeholder}
              onChange={(e) => onChange({ ...value, [field.key]: e.target.value })}
              className="h-9"
            />
          </label>
        ))}
      </div>
    </div>
  );
}

function StepSummary({
  room,
  nights,
  subtotal,
  taxes,
}: {
  room: string;
  nights: number;
  subtotal: number;
  taxes: number;
}) {
  const rows = [
    { label: `${room} × ${nights} ${nights === 1 ? "night" : "nights"}`, value: `$${subtotal}` },
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

function StepConfirmation({
  room,
  checkIn,
  checkOut,
  guestName,
  reference,
}: {
  room: string;
  checkIn: Date | null;
  checkOut: Date | null;
  guestName: string;
  reference: string;
}) {
  const stay =
    checkIn && checkOut
      ? `${formatDate(checkIn)} – ${formatDate(checkOut)}`
      : "your selected dates";
  const who = guestName.trim() ? guestName.trim().split(" ")[0] : "there";

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
        Thanks, {who} — your {room} is reserved for {stay}. A confirmation would
        normally arrive by email within seconds.
      </p>
      <p className="mt-4 rounded-full border border-line bg-ink/50 px-4 py-1.5 text-xs text-muted-foreground">
        Reference {reference}
      </p>
    </div>
  );
}
