"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { fadeIn } from "./primitives";
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
  const { root, logo, quickLinks, socials } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    const targets = [logo.current, quickLinks.current, socials.current].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (targets.length) {
      fadeIn(targets, { stagger: 0.15, scroll: { trigger: root.current, start: "top 90%" } });
    }
  }, root.current);

  return () => ctx.revert();
}
