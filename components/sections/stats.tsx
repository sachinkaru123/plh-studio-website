import { Section } from "@/components/shared/section";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { CountUp } from "@/components/motion/count-up";
import { stats } from "@/content/stats";

export function Stats() {
  return (
    <Section
      aria-label="Key results"
      className="border-y border-line bg-surface/30"
    >
      <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="text-center">
            <p className="text-gold-gradient text-4xl font-extrabold tracking-tight sm:text-5xl">
              <CountUp
                to={stat.value}
                suffix={stat.suffix}
                decimals={stat.decimals ?? 0}
              />
            </p>
            <p className="mx-auto mt-2 max-w-40 text-sm text-muted-foreground">
              {stat.label}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
