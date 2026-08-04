"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** See `hero.ts` for the full pattern explanation. */
export interface SponsorsAnimationRefs extends SectionAnimationRefs {
  heading: RefObject<HTMLElement | null>;
  description: RefObject<HTMLElement | null>;
  grid: RefObject<HTMLElement | null>;
  ctaBlock: RefObject<HTMLElement | null>;
}

/**
 * Component usage:
 *
 *   useEffect(() => {
 *     const cleanup = sponsorsAnimation({ root, heading, description, grid, ctaBlock });
 *     return cleanup;
 *   }, []);
 */
export function sponsorsAnimation(refs: SponsorsAnimationRefs): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    // TODO: staggered logo-reveal + CTA block fade-in goes here, built
    // from primitives.ts. Left empty — architecture phase only.
  }, root as unknown as HTMLElement);

  return () => ctx.revert();
}