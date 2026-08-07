import { cn } from "@/lib/utils";

/**
 * Slow-drifting gold aurora. Pure CSS blobs — no canvas, no JS, no main-thread
 * cost, and it stops moving automatically under prefers-reduced-motion.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="animate-aurora absolute -top-1/3 left-[8%] h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(200,169,106,0.20),transparent_65%)] blur-3xl" />
      <div className="animate-aurora absolute -right-[10%] top-[6%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(138,103,51,0.22),transparent_65%)] blur-3xl [animation-delay:-7s]" />
      <div className="animate-aurora absolute bottom-[-20%] left-[26%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(216,186,124,0.14),transparent_65%)] blur-3xl [animation-delay:-13s]" />
    </div>
  );
}

/** Faint gold grid, used behind dense sections to add depth without noise. */
export function GridBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10",
        "[background-image:linear-gradient(to_right,rgba(200,169,106,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(200,169,106,0.05)_1px,transparent_1px)]",
        "[background-size:64px_64px]",
        "[mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_75%)]",
        className,
      )}
    />
  );
}
