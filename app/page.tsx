import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { TrustedBy } from "@/components/sections/trusted-by";
import { WhyPlh } from "@/components/sections/why-plh";
import { Services } from "@/components/sections/services";
import { Showcase } from "@/components/sections/showcase";
import { Stats } from "@/components/sections/stats";
import { Solutions } from "@/components/sections/solutions";
import { Portfolio } from "@/components/sections/portfolio";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Cta } from "@/components/sections/cta";
import { siteConfig } from "@/content/site";
import { services } from "@/content/services";

// Heaviest interactive sections, all below the fold — split out of the initial bundle.
// They still prerender, because `ssr: false` is not used.
const Features = dynamic(() =>
  import("@/components/sections/features").then((m) => m.Features),
);
const Templates = dynamic(() =>
  import("@/components/sections/templates").then((m) => m.Templates),
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  description: siteConfig.description,
  address: { "@type": "PostalAddress", addressLocality: siteConfig.address },
  makesOffer: services.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.blurb,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Content is a local literal, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Hero />
      <TrustedBy />
      <WhyPlh />
      <Services />
      <Showcase />
      <Stats />
      <Solutions />
      <Features />
      <Templates />
      <Portfolio />
      <Process />
      <Testimonials />
      <Pricing />
      <About />
      <Contact />
      <Cta />
    </>
  );
}
