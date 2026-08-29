"use client";

import { useEffect, useState } from "react";
import { CalendarCheck } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BookingFlow } from "@/components/shared/booking-flow";

/** Fires this on `window` (or navigate to `#booking-widget`) to open the modal. */
export const OPEN_BOOKING_WIDGET_EVENT = "plh:open-booking-widget";
const HASH = "#booking-widget";

/**
 * Floating "Try our booking widget" label pinned just above the WhatsApp
 * launcher. Tapping it opens the interactive booking widget in a modal.
 */
export function BookingWidgetLauncher() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function openFromHash() {
      if (window.location.hash === HASH) setOpen(true);
    }
    function openFromEvent() {
      setOpen(true);
    }
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    window.addEventListener(OPEN_BOOKING_WIDGET_EVENT, openFromEvent);
    return () => {
      window.removeEventListener("hashchange", openFromHash);
      window.removeEventListener(OPEN_BOOKING_WIDGET_EVENT, openFromEvent);
    };
  }, []);

  function handleOpenChange(next: boolean) {
    setOpen(next);
    if (!next && window.location.hash === HASH) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group fixed right-4 bottom-20 z-50 flex items-center gap-2 rounded-full border border-line bg-background/90 py-2 pr-4 pl-3 text-sm font-medium text-foreground shadow-lg backdrop-blur transition-transform hover:scale-105 active:scale-95 sm:right-6 sm:bottom-24"
      >
        <span className="gold-gradient grid size-7 shrink-0 place-items-center rounded-full text-on-gold">
          <CalendarCheck className="size-4" />
        </span>
        Try our booking widget
      </button>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Try the booking flow yourself</DialogTitle>
            <DialogDescription>
              This is the same five-step reservation experience your guests get —
              click through it.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-1">
            <BookingFlow compact />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
