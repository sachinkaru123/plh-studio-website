"use client";

import { Check } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Icon } from "@/components/shared/icon";
import { GridBackground } from "@/components/visuals/aurora-background";
import { featureGroups } from "@/content/features";

export function Features() {
  return (
    <Section id="features" className="bg-surface/25">
      <GridBackground />

      <SectionHeading
        eyebrow="Platform Features"
        title="Everything included, nothing bolted on."
        lede="Five capability groups that ship with every PLH Studio build."
      />

      <Tabs defaultValue={featureGroups[0].id} className="mt-12">
        <TabsList className="mx-auto flex h-auto w-full max-w-3xl flex-wrap justify-center gap-1 bg-transparent p-0">
          {featureGroups.map((group) => (
            <TabsTrigger
              key={group.id}
              value={group.id}
              className="gap-2 rounded-full border border-line px-4 py-2 text-sm data-[state=active]:border-gold/40 data-[state=active]:bg-gold/10 data-[state=active]:text-gold"
            >
              <Icon name={group.icon} className="size-4" />
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {featureGroups.map((group) => (
          <TabsContent key={group.id} value={group.id} className="mt-10">
            <div className="glass gold-frame grid gap-8 rounded-3xl p-8 lg:grid-cols-[1fr_1.1fr] lg:p-10">
              <div>
                <h3 className="text-2xl font-bold">{group.headline}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {group.blurb}
                </p>
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-line bg-ink/40 px-4 py-3 text-sm"
                  >
                    <Check
                      className="size-4 shrink-0 text-gold"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  );
}
