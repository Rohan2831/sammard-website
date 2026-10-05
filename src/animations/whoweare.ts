"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { staggerReveal } from "./primitives";
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
  const { root, heading, description, missionVision } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    const targets = [heading.current, description.current, missionVision.current].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    staggerReveal(targets, { scroll: { trigger: root.current } });
  }, root.current);

  return () => ctx.revert();
}
