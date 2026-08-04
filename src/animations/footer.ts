"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** See `hero.ts` for the full pattern explanation. */
export interface FooterAnimationRefs extends SectionAnimationRefs {
  logo: RefObject<HTMLElement | null>;
  quickLinks: RefObject<HTMLElement | null>;
  socials: RefObject<HTMLElement | null>;
}

/**
 * Component usage:
 *
 *   useEffect(() => {
 *     const cleanup = footerAnimation({ root, logo, quickLinks, socials });
 *     return cleanup;
 *   }, []);
 */
export function footerAnimation(refs: FooterAnimationRefs): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    // TODO: fade-in-on-scroll timeline goes here, built from
    // primitives.ts. Left empty — architecture phase only.
  }, root as unknown as HTMLElement);

  return () => ctx.revert();
}