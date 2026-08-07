import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Required under `output: "export"` — without it the route is treated as dynamic
// and page-data collection fails.
export const dynamic = "force-static";

// Emitted as a static /sitemap.xml at build time.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: siteConfig.url, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
