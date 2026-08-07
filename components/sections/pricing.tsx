import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { FadeIn } from "@/components/motion/fade-in";
import { comparisonRows, pricingFaqs, pricingTiers } from "@/content/pricing";
import { cn } from "@/lib/utils";

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <Check className="mx-auto size-4 text-gold" aria-label="Included" />
    );
  if (value === false)
    return (
      <Minus
        className="mx-auto size-4 text-muted-foreground/40"
        aria-label="Not included"
      />
    );
  return <span className="text-sm">{value}</span>;
}

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Transparent pricing. No booking commission. Ever."
        lede="One build fee, a predictable annual platform cost, and none of the per-reservation cuts an OTA takes."
      />

      <Stagger className="mt-14 grid items-start gap-6 lg:grid-cols-3">
        {pricingTiers.map((tier) => (
          <StaggerItem key={tier.name}>
            <article
              className={cn(
                "glass gold-frame relative flex h-full flex-col rounded-3xl p-8",
                tier.featured && "shadow-glow-lg lg:-mt-4 lg:pb-10 lg:pt-12",
              )}
            >
              {tier.featured ? (
                <span className="gold-gradient absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-on-gold">
                  Most popular
                </span>
              ) : null}

              <h3 className="text-lg font-semibold">{tier.name}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">
                {tier.tagline}
              </p>

              <p className="mt-6 flex items-baseline gap-2">
                <span
                  className={cn(
                    "text-4xl font-extrabold tracking-tight",
                    tier.featured && "text-gold-gradient",
                  )}
                >
                  {tier.price}
                </span>
                <span className="text-xs text-muted-foreground">
                  {tier.cadence}
                </span>
              </p>

              <ul className="mt-7 flex flex-1 flex-col gap-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                size="lg"
                variant={tier.featured ? "default" : "outline"}
                className="mt-8 w-full"
              >
                <Link href="/#contact">{tier.cta}</Link>
              </Button>
            </article>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Comparison — data-lenis-prevent so horizontal scroll doesn't fight Lenis */}
      <FadeIn className="mt-16">
        <h3 className="text-center text-xl font-semibold">
          Compare every plan
        </h3>
        <div
          data-lenis-prevent
          className="glass gold-frame mt-6 overflow-x-auto rounded-2xl"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-line hover:bg-transparent">
                <TableHead className="min-w-52">Feature</TableHead>
                {pricingTiers.map((tier) => (
                  <TableHead
                    key={tier.name}
                    className={cn(
                      "min-w-32 text-center",
                      tier.featured && "text-gold",
                    )}
                  >
                    {tier.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {comparisonRows.map((row) => (
                <TableRow key={row.feature} className="border-line">
                  <TableCell className="font-medium">{row.feature}</TableCell>
                  <TableCell className="text-center">
                    <Cell value={row.starter} />
                  </TableCell>
                  <TableCell className="bg-gold/[0.03] text-center">
                    <Cell value={row.professional} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Cell value={row.enterprise} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </FadeIn>

      <FadeIn className="mx-auto mt-16 max-w-3xl">
        <h3 className="text-center text-xl font-semibold">
          Frequently asked
        </h3>
        <Accordion type="single" collapsible className="mt-6">
          {pricingFaqs.map((faq) => (
            <AccordionItem
              key={faq.q}
              value={faq.q}
              className="border-line"
            >
              <AccordionTrigger className="text-left text-base hover:text-gold">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </FadeIn>
    </Section>
  );
}
