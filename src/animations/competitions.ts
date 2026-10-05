"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { fadeUp, staggerReveal } from "./primitives";
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
  const { root, heading, description, grid, cta } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    const header = [heading.current, description.current].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (header.length) {
      fadeUp(header, { stagger: 0.1, scroll: { trigger: root.current } });
    }

    if (grid.current) {
      staggerReveal(Array.from(grid.current.children), {
        scroll: { trigger: grid.current },
      });
    }

    if (cta.current) {
      fadeUp(cta.current, { scroll: { trigger: cta.current } });
    }
  }, root.current);

  return () => ctx.revert();
}
