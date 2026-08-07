import { cn } from "@/lib/utils";

/** Browser chrome frame for desktop template previews. */
export function BrowserMockup({
  children,
  className,
  label = "hotel.example.com",
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "glass gold-frame overflow-hidden rounded-2xl shadow-luxe",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-line bg-surface/80 px-4 py-2.5">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-gold/25" />
          <span className="size-2 rounded-full bg-gold/25" />
          <span className="size-2 rounded-full bg-gold/25" />
        </span>
        <span className="mx-auto rounded-full bg-ink/60 px-3 py-0.5 text-[0.65rem] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="aspect-16/10">{children}</div>
    </div>
  );
}

/** Phone frame for mobile previews. */
export function PhoneMockup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "glass gold-frame overflow-hidden rounded-3xl p-1.5 shadow-luxe",
        className,
      )}
    >
      <div className="relative aspect-9/19 overflow-hidden rounded-[1.5rem]">
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 z-10 h-1 w-10 -translate-x-1/2 rounded-full bg-gold/25"
        />
        {children}
      </div>
    </div>
  );
}
