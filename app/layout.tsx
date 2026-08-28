import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { MotionProvider } from "@/components/motion/motion-provider";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { CursorSpotlight } from "@/components/layout/cursor-spotlight";
import { NoiseOverlay } from "@/components/layout/noise-overlay";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppWidget } from "@/components/shared/whatsapp-widget";
import { siteConfig } from "@/content/site";
import { whatsappConfig } from "@/content/whatsapp";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: "PLH Studio designs premium hotel websites with integrated booking experiences that inspire confidence, increase direct reservations, and showcase your property with exceptional elegance.",
  applicationName: siteConfig.name,
  keywords: [
    "hotel website design",
    "direct booking engine",
    "hospitality web design",
    "luxury hotel websites",
    "booking widget",
    "hotel digital marketing",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

// colorScheme belongs here, not in `metadata` — deprecated there since Next 14.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Both are supported; the actual scheme is pinned per-theme in globals.css.
  colorScheme: "light dark",
  // Browser UI colour follows the OS preference so the address bar matches.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // No `data-scroll-behavior="smooth"`: in Next 16 that re-enables Next's legacy
    // scroll-behavior override, which fights Lenis. See components/layout/smooth-scroll.tsx.
    // `suppressHydrationWarning` is required: next-themes writes the theme class
    // onto <html> before React hydrates.
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-semibold focus:text-on-gold"
        >
          Skip to content
        </a>

        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>
              <ScrollProgress />
              <CursorSpotlight />
              <NoiseOverlay />
              <SiteHeader />
              <main id="main" className="relative flex-1">
                {children}
              </main>
              <SiteFooter />
            </SmoothScroll>
          </MotionProvider>

          <Toaster position="bottom-right" />
          <WhatsAppWidget {...whatsappConfig} />
        </ThemeProvider>
      </body>
    </html>
  );
}
