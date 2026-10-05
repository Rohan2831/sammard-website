import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pins the workspace root explicitly — an unrelated lockfile at a parent
  // directory (C:\Users\wizar\package-lock.json) otherwise makes Next.js
  // guess wrong and print a warning on every build.
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
