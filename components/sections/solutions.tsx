import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon } from "@/components/shared/icon";
import { solutions } from "@/content/solutions";

export function Solutions() {
  return (
    <Section id="solutions">
      <SectionHeading
        eyebrow="Solutions"
        title="The property types we build for."
        lede="Each vertical brings its own booking patterns and guest expectations. We design to those, not to a generic template."
      />

      <Stagger
        className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
        gap={0.05}
      >
        {solutions.map((solution) => (
          <StaggerItem key={solution.title} className="bg-ink">
            <article className="group h-full p-7 transition-colors duration-500 hover:bg-card">
              <span className="grid size-10 place-items-center rounded-lg border border-line bg-surface/60 text-gold transition-transform duration-500 group-hover:scale-110">
                <Icon name={solution.icon} className="size-4.5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{solution.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {solution.blurb}
              </p>
            </article>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
