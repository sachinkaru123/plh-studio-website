import { Mail, MapPin, Phone } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { ContactForm } from "@/components/forms/contact-form";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { siteConfig } from "@/content/site";

export function Contact() {
  return (
    <Section id="contact" className="relative isolate overflow-hidden">
      <AuroraBackground />

      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title="Let's talk about your property."
            lede="Tell us where you are today and we'll come back with a specific, costed recommendation — not a generic brochure."
          />

          <FadeIn delay={0.15}>
            <ul className="mt-9 flex flex-col gap-4">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group flex items-center gap-3.5 text-sm transition-colors hover:text-gold"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface/60 text-gold">
                    <Mail className="size-4" aria-hidden="true" />
                  </span>
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="group flex items-center gap-3.5 text-sm transition-colors hover:text-gold"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface/60 text-gold">
                    <Phone className="size-4" aria-hidden="true" />
                  </span>
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-sm text-muted-foreground">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-surface/60 text-gold">
                  <MapPin className="size-4" aria-hidden="true" />
                </span>
                {siteConfig.address}
              </li>
            </ul>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.1}>
          <div className="glass gold-frame rounded-3xl p-7 sm:p-9">
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
