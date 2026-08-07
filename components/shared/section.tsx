import { cn } from "@/lib/utils";

/**
 * Standard section wrapper.
 *
 * `scroll-mt-24` keeps the sticky header from covering the heading when Lenis
 * lands on a hash anchor.
 */
export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      id={id}
      className={cn("section-y relative scroll-mt-24", className)}
    >
      <div className={cn("container-luxe", containerClassName)}>{children}</div>
    </section>
  );
}
