import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms governing your use of ${siteConfig.name}.`,
};

export default function TermsPage() {
  return (
    <Section className="pt-32">
      <SectionHeading
        align="left"
        eyebrow="Legal"
        title="Terms of Service"
        lede={`The terms governing your use of the ${siteConfig.name} website and services.`}
      />
      <div className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          By using this website you agree to these terms. Content, design, and code
          on this site are the property of {siteConfig.name} unless stated otherwise.
        </p>
        <p>
          Quotes, timelines, and pricing shown here are indicative. Binding terms are
          set out in the proposal and service agreement issued for your project.
        </p>
        <p>
          Templates and demonstrations are provided for illustration. Property names
          and results shown in case studies are used with permission.
        </p>
        <p className="text-xs">
          This page is a placeholder pending review by your legal counsel and should
          be replaced before launch.
        </p>
      </div>
    </Section>
  );
}
