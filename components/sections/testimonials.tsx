import { Quote, Star } from "lucide-react";
import { Section } from "@/components/shared/section";
import { SectionHeading } from "@/components/shared/section-heading";
import { Marquee } from "@/components/motion/marquee";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <Section
      id="testimonials"
      className="border-y border-line bg-surface/25"
      containerClassName="!max-w-none !px-0"
    >
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Testimonials"
          title="What operators say afterwards."
          lede="The measure of a hotel website is what happens to the booking numbers once it's live."
        />
      </div>

      <Marquee className="mt-14" slow>
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.author}
            className="glass gold-frame mx-3 flex w-80 shrink-0 flex-col rounded-2xl p-7 sm:w-96"
          >
            <Quote
              className="size-7 text-gold/40"
              aria-hidden="true"
            />
            <div
              className="mt-4 flex gap-0.5"
              aria-label={`${testimonial.rating} out of 5 stars`}
            >
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <Star
                  key={i}
                  className="size-3.5 fill-gold text-gold"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-pretty">
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-6 border-t border-line pt-4">
              <p className="text-sm font-semibold">{testimonial.author}</p>
              <p className="text-xs text-muted-foreground">
                {testimonial.role} · {testimonial.property}
              </p>
            </figcaption>
          </figure>
        ))}
      </Marquee>
    </Section>
  );
}
