"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reusable floating WhatsApp widget.
 *
 * Drop this single file into any Next.js + Tailwind project — it has no
 * dependency on this project's design tokens or component library, only
 * React and Tailwind's base utilities plus the `dark:` variant (works with
 * any class-based dark mode, e.g. next-themes).
 *
 * Usage:
 *   <WhatsAppWidget
 *     phoneNumber="14155552671"      // digits only, country code first, no "+"
 *     businessName="Acme Support"
 *     quickReplies={[{ label: "Pricing", message: "Hi! I'd like pricing info." }]}
 *   />
 *
 * Everything below `DEFAULT_CONFIG` is a fallback used for any prop you
 * don't pass — edit it directly if you'd rather configure in-file than
 * via props.
 */

export interface WhatsAppQuickReply {
  /** Short label shown as a tappable chip, e.g. "Pricing". */
  label: string;
  /** Message pre-filled into WhatsApp when this chip is tapped. */
  message: string;
}

export interface WhatsAppWidgetConfig {
  /** E.164 number, digits only — no "+", spaces, or dashes (e.g. "14155552671"). */
  phoneNumber: string;
  /** Shown in the panel header. */
  businessName: string;
  /** Small line under the business name (e.g. "Typically replies in an hour"). */
  statusLine: string;
  /** Avatar image URL for the panel header; omit to fall back to initials. */
  avatarSrc?: string;
  /** Which bottom corner the launcher sits in. */
  position: "bottom-right" | "bottom-left";
  /** Predefined topics — tapping one opens WhatsApp with `message` pre-filled. */
  quickReplies: readonly WhatsAppQuickReply[];
  /** Message used when `quickReplies` is empty and the launcher is tapped directly. */
  fallbackMessage: string;
  /** Soft attention-ring animation on the launcher button. */
  pulse: boolean;
}

const DEFAULT_CONFIG: WhatsAppWidgetConfig = {
  phoneNumber: "10000000000",
  businessName: "Chat with us",
  statusLine: "Typically replies within an hour",
  avatarSrc: "/icon_plh.png",
  position: "bottom-right",
  quickReplies: [
    { label: "General enquiry", message: "Hi! I have a question." },
  ],
  fallbackMessage: "Hi! I have a question.",
  pulse: true,
};

function buildDeepLink(phoneNumber: string, message: string) {
  const digits = phoneNumber.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
    </svg>
  );
}

function CloseGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function SendGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function WhatsAppWidget(props: Partial<WhatsAppWidgetConfig> = {}) {
  const config: WhatsAppWidgetConfig = { ...DEFAULT_CONFIG, ...props };
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointer(event: PointerEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("pointerdown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const hasQuickReplies = config.quickReplies.length > 0;
  const isLeft = config.position === "bottom-left";

  function handleLauncherClick() {
    if (!hasQuickReplies) {
      window.open(buildDeepLink(config.phoneNumber, config.fallbackMessage), "_blank", "noopener,noreferrer");
      return;
    }
    setOpen((value) => !value);
  }

  function handleQuickReply(message: string) {
    window.open(buildDeepLink(config.phoneNumber, message), "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  const initials = config.businessName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div
      ref={rootRef}
      className={`fixed bottom-4 z-50 sm:bottom-6 ${isLeft ? "left-4 sm:left-6" : "right-4 sm:right-6"}`}
    >
      {open && hasQuickReplies ? (
        <div
          role="dialog"
          aria-label={`Chat with ${config.businessName} on WhatsApp`}
          className={`absolute bottom-[calc(100%+0.75rem)] w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-900 ${isLeft ? "left-0" : "right-0"}`}
        >
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3.5 text-white">
            <span className="grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white/15 text-sm font-semibold">
              {config.avatarSrc ? (
                // eslint-disable-next-line @next/next/no-img-element -- portable widget, avoids a Next-only dependency
                <img src={config.avatarSrc} alt="" className="size-full object-cover" />
              ) : (
                initials
              )}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">{config.businessName}</p>
              <p className="truncate text-xs text-white/75">{config.statusLine}</p>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="grid size-7 shrink-0 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            >
              <CloseGlyph className="size-4" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto bg-[#e5ddd5] p-3 dark:bg-neutral-800">
            <p className="px-1 pb-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
              What can we help with?
            </p>
            <div className="flex flex-col gap-2">
              {config.quickReplies.map((reply) => (
                <button
                  key={reply.label}
                  type="button"
                  onClick={() => handleQuickReply(reply.message)}
                  className="group flex items-center justify-between gap-2 rounded-xl border border-black/5 bg-white px-3.5 py-2.5 text-left text-sm text-neutral-800 shadow-sm transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/5 dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-100"
                >
                  <span className="min-w-0 truncate">{reply.label}</span>
                  <SendGlyph className="size-3.5 shrink-0 text-[#25D366] opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        aria-expanded={hasQuickReplies ? open : undefined}
        aria-label={open ? "Close WhatsApp chat menu" : `Chat with ${config.businessName} on WhatsApp`}
        onClick={handleLauncherClick}
        className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
      >
        {config.pulse && !open ? (
          <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-60" />
        ) : null}
        {open && hasQuickReplies ? (
          <CloseGlyph className="size-6" />
        ) : (
          <WhatsAppGlyph className="size-7" />
        )}
      </button>
    </div>
  );
}
