import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets Cloudflare quick tunnels (random *.trycloudflare.com hostnames) reach
  // the dev server's HMR websocket, which Next.js otherwise blocks as cross-origin.
  allowedDevOrigins: ["*.trycloudflare.com"],
  // Pin the workspace root; a lockfile higher up the tree would otherwise be inferred.
  turbopack: { root: path.resolve(import.meta.dirname) },
  // True static export: `next build` emits ./out with one HTML file per route.
  // Deployable to any static host (cPanel, S3, Netlify, Nginx) with no Node runtime.
  output: "export",
  // Emits /about/index.html rather than /about.html — friendliest for Apache/Nginx/S3.
  trailingSlash: true,
  reactStrictMode: true,
  // Stable in Next 16 (no longer experimental.typedRoutes).
  typedRoutes: true,
  images: {
    // Required under `output: "export"` — the default optimizer needs a server.
    // All site imagery is CSS/SVG-generated, so nothing is lost here.
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
  // No `webpack` key: Turbopack is the default builder in 16 and a custom
  // webpack config makes `next build` fail outright.
};

export default nextConfig;
