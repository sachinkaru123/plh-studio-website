"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Infinite marquee. The animation is pure CSS (`--animate-marquee`); the track
 * is duplicated and the copy is `aria-hidden` so screen readers hear the list once.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  slow = false,
  pauseOnHover = true,
}: {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  slow?: boolean;
  pauseOnHover?: boolean;
}) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={cn("fade-edges-x group relative overflow-hidden", className)}
      onMouseEnter={pauseOnHover ? () => setPaused(true) : undefined}
      onMouseLeave={pauseOnHover ? () => setPaused(false) : undefined}
    >
      <div
        className={cn(
          "flex w-max",
          slow ? "animate-marquee-slow" : "animate-marquee",
          reverse && "[animation-direction:reverse]",
        )}
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
