"use client";

import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

let lenisInstance: Lenis | null = null;

/**
 * Initializes Lenis smooth scrolling and synchronizes it with GSAP's
 * ticker + ScrollTrigger so every scroll-driven animation reads from
 * the smoothed scroll position instead of the raw (jittery) native
 * scroll event.
 *
 * Call this ONCE, high in the tree — e.g. inside a client-only
 * `<SmoothScrollProvider>` mounted in the root layout. Do NOT call it
 * from individual section components; sections only ever call their
 * own animation function (see `hero.ts`, `navbar.ts`, etc.).
 *
 * Returns a cleanup function that tears everything down. Intended
 * usage:
 *
 * useEffect(() => {
 *   const cleanup = initLenis();
 *   return cleanup;
 * }, []);
 */
export function initLenis(): () => void {
  if (typeof window === "undefined") return () => {};
  if (lenisInstance) return () => {};

  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
  });

  lenisInstance = lenis;

  function raf(time: number) {
    // GSAP's ticker time is in seconds; Lenis expects milliseconds.
    lenis.raf(time * 1000);
  }

  gsap.ticker.add(raf);
  // Prevents GSAP from trying to "catch up" after a long tab-blur,
  // which would otherwise cause a jarring scroll-linked jump.
  gsap.ticker.lagSmoothing(0);

  lenis.on("scroll", ScrollTrigger.update);

  return () => {
    gsap.ticker.remove(raf);
    lenis.destroy();
    lenisInstance = null;
  };
}

/** Access the active Lenis instance (e.g. for programmatic `.scrollTo()`). */
export function getLenis(): Lenis | null {
  return lenisInstance;
}