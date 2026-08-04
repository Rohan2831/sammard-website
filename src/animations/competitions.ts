"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** See `hero.ts` for the full pattern explanation. */
export interface CompetitionsAnimationRefs extends SectionAnimationRefs {
  heading: RefObject<HTMLElement | null>;
  description: RefObject<HTMLElement | null>;
  grid: RefObject<HTMLElement | null>;
  cta: RefObject<HTMLElement | null>;
}

/**
 * Component usage:
 *
 *   useEffect(() => {
 *     const cleanup = competitionsAnimation({ root, heading, description, grid, cta });
 *     return cleanup;
 *   }, []);
 */
export function competitionsAnimation(
  refs: CompetitionsAnimationRefs
): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    // TODO: staggered card-reveal + CTA fade-in goes here, built from
    // primitives.ts. Left empty — architecture phase only.
  }, root as unknown as HTMLElement);

  return () => ctx.revert();
}