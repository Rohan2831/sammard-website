"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** See `hero.ts` for the full pattern explanation. */
export interface TeamInActionAnimationRefs extends SectionAnimationRefs {
  heading: RefObject<HTMLElement | null>;
  description: RefObject<HTMLElement | null>;
  grid: RefObject<HTMLElement | null>;
}

/**
 * Component usage:
 *
 *   useEffect(() => {
 *     const cleanup = teamInActionAnimation({ root, heading, description, grid });
 *     return cleanup;
 *   }, []);
 */
export function teamInActionAnimation(
  refs: TeamInActionAnimationRefs
): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    // TODO: staggered card-reveal timeline goes here, built from
    // primitives.ts (staggerReveal on the grid's card children).
    // Left empty — architecture phase only.
  }, root as unknown as HTMLElement);

  return () => ctx.revert();
}