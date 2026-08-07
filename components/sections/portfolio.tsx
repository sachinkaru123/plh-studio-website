import Image from "next/image";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { GradientArt } from "@/components/visuals/gradient-art";
import { portfolio } from "@/content/portfolio";
import { cn } from "@/lib/utils";

export function Portfolio() {
  return (
    <Section id="portfolio" className="bg-surface/25">
      <SectionHeading
        eyebrow="Portfolio"
        title="Real properties. Measured outcomes."
        lede="Three recent builds, the problem each one solved, and what changed afterwards."
      />

      <div className="mt-14 flex flex-col gap-6">
        {portfolio.map((project, index) => (
          <FadeIn key={project.slug} delay={index * 0.05}>
            <article
              className={cn(
                "glass gold-frame group grid gap-8 overflow-hidden rounded-3xl p-6 lg:grid-cols-2 lg:p-8",
                index % 2 === 1 && "lg:[&>figure]:order-2",
              )}
            >
              <figure className="overflow-hidden rounded-2xl">
                <div className="relative aspect-4/3">
                  {project.preview ? (
                    <Image
                      src={project.preview.src}
                      alt={`${project.client} hotel website`}
                      width={project.preview.width}
                      height={project.preview.height}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <GradientArt
                      hue={project.hue}
                      label={project.category}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
              </figure>

              <div className="flex flex-col justify-center gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-2xl font-bold">{project.client}</h3>
                    <Badge variant="outline" className="border-gold/30 text-gold">
                      {project.category}
                    </Badge>
                  </div>
                  <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MapPin className="size-3.5" aria-hidden="true" />
                    {project.location}
                  </p>
                </div>

                <div className="flex flex-col gap-3 text-sm leading-relaxed">
                  <p>
                    <span className="font-semibold text-gold">Challenge — </span>
                    <span className="text-muted-foreground">
                      {project.challenge}
                    </span>
                  </p>
                  <p>
                    <span className="font-semibold text-gold">Solution — </span>
                    <span className="text-muted-foreground">
                      {project.solution}
                    </span>
                  </p>
                </div>

                <dl className="grid grid-cols-3 gap-3 border-t border-line pt-5">
                  {project.results.map((result) => (
                    <div key={result.label}>
                      <dd className="text-xl font-extrabold text-gold">
                        {result.value}
                      </dd>
                      <dt className="mt-0.5 text-[0.7rem] text-muted-foreground">
                        {result.label}
                      </dt>
                    </div>
                  ))}
                </dl>

                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-2 py-0.5 text-[0.7rem] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
