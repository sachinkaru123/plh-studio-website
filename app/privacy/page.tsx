import type { Metadata } from "next";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your information.`,
};

export default function PrivacyPage() {
  return (
    <Section className="pt-32">
      <SectionHeading
        align="left"
        eyebrow="Legal"
        title="Privacy Policy"
        lede={`How ${siteConfig.name} collects, uses, and protects the information you share with us.`}
      />
      <div className="mt-10 max-w-3xl space-y-6 text-sm leading-relaxed text-muted-foreground">
        <p>
          We collect only the information you provide through our enquiry forms —
          your name, hotel, email address, phone number, and message — and use it
          solely to respond to your enquiry and to discuss our services.
        </p>
        <p>
          We do not sell your data. We do not share it with third parties except
          where strictly necessary to deliver a service you have requested, and
          only with processors bound by equivalent confidentiality obligations.
        </p>
        <p>
          Analytics, where enabled, are collected in aggregate and are not used to
          identify individual visitors. You can request access to, correction of,
          or deletion of your data at any time by writing to{" "}
          <a className="text-gold hover:underline" href={`mailto:${siteConfig.email}`}>
            {siteConfig.email}
          </a>
          .
        </p>
        <p className="text-xs">
          This page is a placeholder pending review by your legal counsel and
          should be replaced before launch.
        </p>
      </div>
    </Section>
  );
}
