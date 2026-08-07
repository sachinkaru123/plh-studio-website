import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon } from "@/components/shared/icon";
import { services } from "@/content/services";
import { cn } from "@/lib/utils";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What We Offer"
        title="Seven ways we grow your property."
        lede="From the booking widget that stops commission leaking to the vlogs that build your audience — every offering is built for hospitality, not adapted to it."
      />

      <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <StaggerItem
            key={service.slug}
            className={cn(service.featured && "md:col-span-2")}
          >
            <article
              className={cn(
                "glass gold-frame group flex h-full flex-col rounded-2xl p-7 transition-all duration-500 hover:shadow-glow",
                service.featured && "md:p-9",
              )}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-ink/60 text-gold transition-transform duration-500 group-hover:scale-110">
                  <Icon name={service.icon} className="size-5" />
                </span>
                {service.featured ? (
                  <span className="rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
                    Most requested
                  </span>
                ) : null}
              </div>

              <h3
                className={cn(
                  "mt-5 font-semibold",
                  service.featured ? "text-2xl" : "text-lg",
                )}
              >
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {service.blurb}
              </p>

              {service.bullets ? (
                <ul
                  className={cn(
                    "mt-5 flex flex-col gap-2",
                    service.featured && "sm:flex-row sm:flex-wrap sm:gap-x-6",
                  )}
                >
                  {service.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <Check
                        className="size-3.5 shrink-0 text-gold"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12 flex justify-center">
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/#contact">
            Discuss your requirements
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </Section>
  );
}
