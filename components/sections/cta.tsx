import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion/fade-in";
import { Magnetic } from "@/components/motion/magnetic";
import { ctaContent } from "@/content/site";

export function Cta() {
  return (
    <section className="section-y relative">
      <div className="container-luxe">
        <FadeIn>
          <div className="gold-frame relative overflow-hidden rounded-3xl border border-line bg-card/60 px-8 py-16 text-center sm:px-14">
            <div
              aria-hidden="true"
              className="animate-pulse-glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(200,169,106,0.14),transparent_65%)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance text-3xl font-bold sm:text-4xl">
                {ctaContent.headline}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
                {ctaContent.blurb}
              </p>
              <div className="mt-8 flex justify-center">
                <Magnetic>
                  <Button asChild size="lg" className="group">
                    <Link href={ctaContent.cta.href}>
                      {ctaContent.cta.label}
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Magnetic>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
