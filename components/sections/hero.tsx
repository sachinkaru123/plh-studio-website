import Link from "next/link";
import { ArrowRight, CalendarCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { TextReveal } from "@/components/motion/text-reveal";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { AuroraBackground } from "@/components/visuals/aurora-background";
import { Eyebrow } from "@/components/shared/section-heading";
import { heroContent } from "@/content/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pb-20 pt-32 lg:pb-32 lg:pt-44">
      <AuroraBackground />

      <div className="container-luxe">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Copy */}
          <div className="flex flex-col items-start gap-7">
            <FadeIn duration={0.5}>
              <Eyebrow>{heroContent.eyebrow}</Eyebrow>
            </FadeIn>

            <TextReveal
              text={heroContent.headline}
              delay={0.15}
              className="text-hero max-w-xl text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
            />

            <FadeIn delay={0.5} className="max-w-xl">
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                {heroContent.lede}
              </p>
            </FadeIn>

            <FadeIn delay={0.65}>
              <div className="flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Button asChild size="lg" className="group">
                    <Link href={heroContent.primaryCta.href}>
                      {heroContent.primaryCta.label}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button asChild size="lg" variant="outline">
                  <Link href={heroContent.secondaryCta.href}>
                    {heroContent.secondaryCta.label}
                  </Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn delay={0.8}>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                {heroContent.proof.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-gold"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>

          {/* Floating booking-widget mockup */}
          <FadeIn delay={0.35} direction="left" className="relative">
            <Parallax speed={0.25}>
              <div className="relative mx-auto max-w-md">
                <BookingWidgetMockup />
                {/* <FloatingRateCard /> */}
                <FloatingReviewCard />
              </div>
            </Parallax>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function BookingWidgetMockup() {
  return (
    <div className="glass gold-frame animate-float rounded-3xl p-6 shadow-luxe">
      <div className="flex items-center gap-2.5">
        <CalendarCheck className="size-4 text-gold" aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
          Direct Booking
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {[
          { label: "Check in", value: "12 Aug" },
          { label: "Check out", value: "16 Aug" },
        ].map((field) => (
          <div
            key={field.label}
            className="rounded-xl border border-line bg-ink/50 px-3.5 py-3"
          >
            <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              {field.label}
            </p>
            <p className="mt-1 text-sm font-semibold">{field.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl border border-line bg-ink/50 px-3.5 py-3">
        <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
          Guests
        </p>
        <p className="mt-1 text-sm font-semibold">2 adults · 1 room</p>
      </div>

      <div className="mt-5 space-y-3">
        {[
          { room: "Ocean Suite", price: "$420" },
          { room: "Garden Villa", price: "$365" },
        ].map((room) => (
          <div
            key={room.room}
            className="flex items-center justify-between rounded-xl border border-line bg-card/60 px-3.5 py-3"
          >
            <div className="flex items-center gap-3">
              <div className="gold-gradient size-9 rounded-lg opacity-70" />
              <span className="text-sm font-medium">{room.room}</span>
            </div>
            <span className="text-sm font-bold text-gold">{room.price}</span>
          </div>
        ))}
      </div>

      <div className="gold-gradient mt-5 grid h-11 place-items-center rounded-xl text-sm font-semibold text-on-gold">
        Reserve Now
      </div>
    </div>
  );
}

function FloatingRateCard() {
  return (
    <div className="glass animate-float absolute -left-6 top-1/3 hidden rounded-2xl px-4 py-3 shadow-luxe [animation-delay:-3s] sm:block">
      <p className="text-[0.65rem] uppercase tracking-wider text-muted-foreground">
        Commission saved
      </p>
      <p className="mt-0.5 text-lg font-extrabold text-gold">$18,400</p>
    </div>
  );
}

function FloatingReviewCard() {
  return (
    <div className="glass animate-float absolute -right-4 bottom-10 hidden rounded-2xl px-4 py-3 shadow-luxe [animation-delay:-6s] sm:block">
      <div className="flex gap-0.5" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="size-3 fill-gold text-gold" />
        ))}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">Guest rating 4.9</p>
    </div>
  );
}
