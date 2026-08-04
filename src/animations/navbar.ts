"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** See `hero.ts` for the full pattern explanation. */
export interface NavbarAnimationRefs extends SectionAnimationRefs {
  logo: RefObject<HTMLElement | null>;
  links: RefObject<HTMLElement | null>;
}

/**
 * Component usage:
 *
 *   useEffect(() => {
 *     const cleanup = navbarAnimation({ root, logo, links });
 *     return cleanup;
 *   }, []);
 */
export function navbarAnimation(refs: NavbarAnimationRefs): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    // TODO: entrance/scroll-state timeline goes here, built from
    // primitives.ts. Left empty — architecture phase only.
  }, root as unknown as HTMLElement);

  return () => ctx.revert();
}