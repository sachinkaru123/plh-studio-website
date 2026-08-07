import { cn } from "@/lib/utils";

/**
 * Deterministic placeholder "photography".
 *
 * Generates a layered gradient + grain composition from a hue seed, so every
 * template/portfolio card gets distinct artwork with zero image requests. Swap
 * for real photography later by replacing this component's internals only.
 */
export function GradientArt({
  hue = 0,
  label,
  className,
}: {
  hue?: number;
  label?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate size-full overflow-hidden bg-ink",
        className,
      )}
      style={{ ["--h" as string]: `${hue}deg` }}
    >
      {/* Base wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in oklab, #c8a96a 34%, #080808), #0d0d0d 58%, color-mix(in oklab, #8a6733 26%, #080808))",
          filter: `hue-rotate(var(--h)) saturate(1.05)`,
        }}
      />
      {/* Horizon band — reads as an architectural photo without being one */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.92), rgba(8,8,8,0.15))",
        }}
      />
      {/* Light shaft */}
      <div
        className="absolute -top-1/4 left-1/4 h-[150%] w-1/3 rotate-12 opacity-40 blur-2xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(216,186,124,0.5), transparent 70%)",
          filter: `hue-rotate(var(--h))`,
        }}
      />
      {/* Grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.06]" />

      {label ? (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold/70">
            {label}
          </span>
        </div>
      ) : null}
    </div>
  );
}
