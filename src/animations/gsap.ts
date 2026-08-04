"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let isRegistered = false;

/**
 * Registers GSAP plugins exactly once and applies project-wide
 * animation defaults. Every animation module in `src/animations/`
 * imports `gsap`/`ScrollTrigger` from this file (never directly from
 * "gsap") so registration and defaults are guaranteed to be applied
 * before any tween is created.
 *
 * Safe to call multiple times — subsequent calls are no-ops. Safe to
 * call during SSR — it bails out until `window` exists.
 */
function registerGsap(): void {
  if (isRegistered) return;
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger);

  // Cinematic, premium, minimal — no bounce/elastic/back eases anywhere
  // in the system. power-based eases only.
  gsap.defaults({
    ease: "power3.out",
    duration: 1.2,
  });

  ScrollTrigger.defaults({
    toggleActions: "play none none reverse",
  });

  isRegistered = true;
}

registerGsap();

/**
 * True when the user has requested reduced motion at the OS level.
 * Every primitive in `primitives.ts` checks this before creating a
 * tween or ScrollTrigger, so respecting it here is enough to make the
 * whole animation system reduced-motion-safe by default.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export { gsap, ScrollTrigger };