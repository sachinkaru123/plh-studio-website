"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, Monitor, Smartphone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { TiltCard } from "@/components/motion/tilt-card";
import { BrowserMockup, PhoneMockup } from "@/components/visuals/device-mockup";
import { GradientArt } from "@/components/visuals/gradient-art";
import { templateCategories, templates } from "@/content/templates";
import { cn } from "@/lib/utils";

export function Templates() {
  const [category, setCategory] = useState<string>("All");

  const visible =
    category === "All"
      ? templates
      : templates.filter((template) => template.category === category);

  return (
    <Section id="templates">
      <SectionHeading
        eyebrow="Templates"
        title="Thirty-five starting points, none of them generic."
        lede="Every template ships with desktop and mobile layouts, a defined page set, and booking support."
      />

      {/* Filter */}
      <div
        className="mt-10 flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter templates by category"
      >
        {templateCategories.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-colors duration-300",
              category === item
                ? "border-gold/50 bg-gold/10 text-gold"
                : "border-line text-muted-foreground hover:border-gold/30 hover:text-foreground",
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((template) => (
          <TiltCard key={template.slug} max={6}>
            <article className="glass gold-frame group flex h-full flex-col rounded-2xl p-5">
              <div className="relative">
                <BrowserMockup label={`${template.slug}.plhconnect.com`}>
                  {template.preview ? (
                    <Image
                      src={template.preview.src}
                      alt={`${template.name} hotel website template preview`}
                      width={template.preview.width}
                      height={template.preview.height}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <GradientArt
                      hue={template.hue}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </BrowserMockup>
                <PhoneMockup className="absolute -bottom-4 -right-2 w-16">
                  {template.preview ? (
                    <Image
                      src={template.preview.src}
                      alt=""
                      aria-hidden="true"
                      width={template.preview.width}
                      height={template.preview.height}
                      sizes="64px"
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    <GradientArt hue={template.hue + 12} />
                  )}
                </PhoneMockup>
              </div>

              <div className="mt-7 flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold">{template.name}</h3>
                <Badge variant="outline" className="border-gold/30 text-gold">
                  {template.category}
                </Badge>
              </div>

              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                {template.blurb}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {template.pages.map((page) => (
                  <li
                    key={page}
                    className="rounded-md border border-line px-2 py-0.5 text-[0.7rem] text-muted-foreground"
                  >
                    {page}
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center gap-4 border-t border-line pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Monitor className="size-3.5" aria-hidden="true" />
                  Desktop
                </span>
                <span className="flex items-center gap-1.5">
                  <Smartphone className="size-3.5" aria-hidden="true" />
                  Mobile
                </span>
                {template.booking ? (
                  <span className="flex items-center gap-1.5 text-gold">
                    <Check className="size-3.5" aria-hidden="true" />
                    Booking
                  </span>
                ) : null}
              </div>
            </article>
          </TiltCard>
        ))}
      </div>
    </Section>
  );
}
