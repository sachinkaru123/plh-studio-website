import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon } from "@/components/shared/icon";
import { GridBackground } from "@/components/visuals/aurora-background";
import { GradientArt } from "@/components/visuals/gradient-art";
import { whyCards } from "@/content/why";

export function WhyPlh() {
  return (
    <Section id="why">
      <GridBackground />

      <SectionHeading
        eyebrow="Why PLH Studio"
        title={
          <>
            Everything a hotel website should be —{" "}
            <span className="text-gold-gradient">and usually isn&apos;t.</span>
          </>
        }
        lede="Six things we refuse to compromise on, because each one shows up directly in your booking numbers."
      />

      <Stagger
        lenisPrevent
        className="relative left-1/2 mt-14 -ml-[50vw] w-screen flex snap-x snap-mandatory gap-0 overflow-x-auto sm:static sm:left-auto sm:ml-0 sm:w-auto sm:grid sm:snap-none sm:gap-5 sm:overflow-visible sm:grid-cols-2 lg:grid-cols-3"
      >
        {whyCards.map((card, index) => (
          <StaggerItem
            key={card.title}
            className="w-screen shrink-0 snap-center sm:w-auto sm:max-w-none sm:shrink sm:snap-align-none"
          >
            <article className="gold-frame group relative isolate flex h-full min-h-[80dvh] flex-col justify-end overflow-hidden rounded-none transition-all duration-500 hover:shadow-glow sm:min-h-[19rem] sm:rounded-2xl">
              {/* Photography — `fill` needs the positioned parent above. */}
              {card.backgroundImg ? (
                <Image
                  src={card.backgroundImg}
                  alt=""
                  fill
                  aria-hidden="true"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <GradientArt
                  className="absolute inset-0 -z-10 transition-transform duration-700 group-hover:scale-105"
                  hue={index * 40}
                />
              )}

              {/* Legibility wash: dark at the foot of the card, clearing toward the top. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 via-45% to-ink/20"
              />

              <div className="flex items-end gap-4 p-6">
                <div className="min-w-0 flex-1">
                  <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink/60 text-gold transition-transform duration-500 group-hover:scale-110">
                    <Icon name={card.icon} className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                    {card.blurb}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/50 bg-ink/60 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-on-gold"
                >
                  <ArrowRight className="size-4" />
                </span>
              </div>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
