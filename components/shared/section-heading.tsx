import { FadeIn } from "@/components/motion/fade-in";
import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5",
        "text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1 rounded-full bg-gold" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lede?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <FadeIn
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "max-w-3xl text-balance text-3xl font-bold sm:text-4xl lg:text-5xl",
          align === "center" && "mx-auto",
        )}
      >
        {title}
      </h2>
      {lede ? (
        <p
          className={cn(
            "max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {lede}
        </p>
      ) : null}
    </FadeIn>
  );
}
