import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon } from "@/components/shared/icon";
import { GridBackground } from "@/components/visuals/aurora-background";
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

      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyCards.map((card) => (
          <StaggerItem key={card.title}>
            <article className="glass gold-frame group h-full rounded-2xl p-7 transition-all duration-500 hover:shadow-glow">
              <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink/60 text-gold transition-transform duration-500 group-hover:scale-110">
                <Icon name={card.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.blurb}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
