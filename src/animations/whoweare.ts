"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** See `hero.ts` for the full pattern explanation. */
export interface WhoWeAreAnimationRefs extends SectionAnimationRefs {
  heading: RefObject<HTMLElement | null>;
  description: RefObject<HTMLElement | null>;
  missionVision: RefObject<HTMLElement | null>;
}

/**
 * Component usage:
 *
 *   useEffect(() => {
 *     const cleanup = whoWeAreAnimation({ root, heading, description, missionVision });
 *     return cleanup;
 *   }, []);
 */
export function whoWeAreAnimation(refs: WhoWeAreAnimationRefs): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    // TODO: scroll-reveal timeline goes here, built from primitives.ts.
    // Left empty — architecture phase only.
  }, root as unknown as HTMLElement);

  return () => ctx.revert();
}