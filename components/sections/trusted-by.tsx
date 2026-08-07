import { Marquee } from "@/components/motion/marquee";
import { trustedLogos } from "@/content/testimonials";

export function TrustedBy() {
  return (
    <section
      aria-labelledby="trusted-by-heading"
      className="border-y border-line bg-surface/30 py-10"
    >
      <div className="container-luxe">
        <h2
          id="trusted-by-heading"
          className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
        >
          Trusted by properties across the region
        </h2>
      </div>

      <Marquee className="mt-8">
        {trustedLogos.map((logo) => (
          <span
            key={logo}
            className="mx-10 whitespace-nowrap text-sm font-bold tracking-[0.2em] text-muted-foreground/45 transition-colors duration-300 hover:text-gold sm:mx-14 sm:text-base"
          >
            {logo}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
