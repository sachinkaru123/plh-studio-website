import Image from "next/image";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { TiltCard } from "@/components/motion/tilt-card";
import { showcaseCategories } from "@/content/templates";
import { cn } from "@/lib/utils";

export function Showcase() {
  return (
    <Section id="showcase" className="bg-surface/25">
      <SectionHeading
        eyebrow="Hotel Showcase"
        title="Built for every kind of property."
        lede="Whichever category you sit in, the design language adapts — the performance and the booking flow do not."
      />

      <Stagger
        className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        gap={0.06}
      >
        {showcaseCategories.map((category, index) => {
          const featured = index === 0;

          return (
            <StaggerItem
              key={category.label}
              className={cn(
                featured && "sm:col-span-2 lg:col-span-1 lg:row-span-2",
              )}
            >
              <TiltCard className="h-full" max={5}>
                <article className="gold-frame group relative h-full overflow-hidden rounded-2xl border border-line bg-ink">
                  {/* Browser chrome — these are full-page site screenshots, so a
                      window frame reads more honestly than a photo crop. */}
                  <div className="flex items-center gap-2 border-b border-line bg-surface/80 px-4 py-2.5">
                    <span className="flex gap-1.5" aria-hidden="true">
                      <span className="size-2 rounded-full bg-gold/25" />
                      <span className="size-2 rounded-full bg-gold/25" />
                      <span className="size-2 rounded-full bg-gold/25" />
                    </span>
                    <span className="mx-auto truncate rounded-full bg-ink/60 px-3 py-0.5 text-[0.65rem] text-muted-foreground">
                      {category.label.toLowerCase().replace(/\s+/g, "")}
                      .example.com
                    </span>
                  </div>

                  <div
                    className={cn(
                      "relative overflow-hidden",
                      featured
                        ? "aspect-3/4 lg:aspect-auto lg:h-[calc(100%-2.75rem)]"
                        : "aspect-4/5",
                    )}
                  >
                    <Image
                      src={category.src}
                      alt={`${category.label} website design by PLH Studio`}
                      width={category.width}
                      height={category.height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="size-full object-cover object-top transition-[object-position] duration-[2500ms] ease-linear group-hover:object-bottom"
                    />

                    {/* Legibility scrim for the label */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink via-ink/70 to-transparent"
                    />

                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                      <h3 className="text-base font-semibold">
                        {category.label}
                      </h3>
                      <span className="glass translate-y-2 rounded-full px-3 py-1.5 text-[0.7rem] font-semibold text-gold opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                        Live Preview
                      </span>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </StaggerItem>
          );
        })}
      </Stagger>
    </Section>
  );
}
