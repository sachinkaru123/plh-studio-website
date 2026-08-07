import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Required under `output: "export"` — see app/sitemap.ts.
export const dynamic = "force-static";

// Emitted as a static /robots.txt at build time.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
