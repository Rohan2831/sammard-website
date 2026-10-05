"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { fadeUp, staggerReveal } from "./primitives";
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
  const { root, heading, description, grid } = refs;
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
  }, root.current);

  return () => ctx.revert();
}
