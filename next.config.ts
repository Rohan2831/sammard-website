import path from "node:path";
import type { NextConfig } from "next";

/**
 * Browsers and Vercel's edge may reuse every static file for a week, then keep
 * serving the cached copy for another day while re-checking in the background.
 * Files are swapped by replacing them under the same name (see ASSETS_NEEDED.md),
 * so a swapped photo reaches returning visitors within that week.
 */
const ONE_WEEK = 60 * 60 * 24 * 7;
const WEEKLY_CACHE = `public, max-age=${ONE_WEEK}, stale-while-revalidate=${60 * 60 * 24}`;

const nextConfig: NextConfig = {
  // Pins the workspace root explicitly — an unrelated lockfile at a parent
  // directory (C:\Users\wizar\package-lock.json) otherwise makes Next.js
  // guess wrong and print a warning on every build.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // WebP only: AVIF was ~20–30% smaller but ~50% slower for Vercel to create
    // on first view and heavier to decode, which showed as black photo slots
    // and scroll jank on the dark site (2026-10-14).
    formats: ["image/webp"],
    // Resized copies made by the image optimizer are reused for a week too.
    minimumCacheTTL: ONE_WEEK,
  },
  async headers() {
    return [
      { source: "/assets/:path*", headers: [{ key: "Cache-Control", value: WEEKLY_CACHE }] },
      { source: "/vendor/:path*", headers: [{ key: "Cache-Control", value: WEEKLY_CACHE }] },
    ];
  },
};

export default nextConfig;
