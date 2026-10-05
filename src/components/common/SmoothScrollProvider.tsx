"use client";

import { useEffect } from "react";
import { initLenis } from "@/animations/lenis";

/**
 * SmoothScrollProvider
 * Mounts Lenis smooth scrolling once at the root of the app.
 * Must be a client component because Lenis requires `window`.
 *
 * Usage in layout.tsx:
 *   <SmoothScrollProvider />
 */
export function SmoothScrollProvider() {
  useEffect(() => {
    const cleanup = initLenis();
    return cleanup;
  }, []);

  return null;
}
