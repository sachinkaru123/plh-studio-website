import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Parallax } from "@/components/motion/parallax";
import { GradientArt } from "@/components/visuals/gradient-art";
import { aboutContent } from "@/content/site";

export function About() {
  return (
    <Section id="about" className="bg-surface/25">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={aboutContent.eyebrow}
            title={aboutContent.headline}
          />

          <FadeIn delay={0.1} className="mt-6 flex flex-col gap-4">
            {aboutContent.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </FadeIn>

          <FadeIn delay={0.2}>
            <dl className="mt-9 grid gap-5 sm:grid-cols-2">
              {aboutContent.pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="border-l-2 border-gold/40 pl-4"
                >
                  <dt className="text-sm font-semibold">{pillar.title}</dt>
                  <dd className="mt-0.5 text-sm text-muted-foreground">
                    {pillar.blurb}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>

        <FadeIn direction="left" delay={0.15}>
          <Parallax speed={0.15}>
            <div className="grid grid-cols-2 gap-4">
              <div className="gold-frame overflow-hidden rounded-2xl">
                <div className="aspect-3/4">
                  <GradientArt hue={30} />
                </div>
              </div>
              <div className="mt-10 flex flex-col gap-4">
                <div className="gold-frame overflow-hidden rounded-2xl">
                  <div className="aspect-square">
                    <GradientArt hue={178} />
                  </div>
                </div>
                <div className="gold-frame overflow-hidden rounded-2xl">
                  <div className="aspect-4/3">
                    <GradientArt hue={320} />
                  </div>
                </div>
              </div>
            </div>
          </Parallax>
        </FadeIn>
      </div>
    </Section>
  );
}
