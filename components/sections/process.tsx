import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon } from "@/components/shared/icon";
import { processSteps } from "@/content/process";

export function Process() {
  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Our Process"
        title="Six steps from first call to steady growth."
        lede="No mystery, no drift — you always know which stage you're in and what comes next."
      />

      <div className="relative mt-16">
        {/* Timeline rail */}
        <div
          aria-hidden="true"
          className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent lg:block"
        />

        <Stagger className="flex flex-col gap-5" gap={0.09}>
          {processSteps.map((step) => (
            <StaggerItem key={step.index}>
              <article className="group relative flex gap-5 lg:pl-20">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-3 hidden size-12 place-items-center rounded-full border border-line bg-ink text-gold transition-all duration-500 group-hover:border-gold/50 group-hover:shadow-glow lg:grid"
                >
                  <Icon name={step.icon} className="size-5" />
                </span>

                <div className="glass gold-frame flex-1 rounded-2xl p-6 transition-all duration-500 group-hover:shadow-glow sm:p-7">
                  <div className="flex items-center gap-3">
                    <span className="text-gold-gradient text-sm font-extrabold tracking-widest">
                      {step.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className="grid size-9 place-items-center rounded-lg border border-line bg-surface/60 text-gold lg:hidden"
                    >
                      <Icon name={step.icon} className="size-4" />
                    </span>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.blurb}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </Section>
  );
}
