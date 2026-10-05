"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { fadeUp, staggerReveal } from "./primitives";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

export interface EvolutionOfFlightAnimationRefs extends SectionAnimationRefs {
  heading: RefObject<HTMLElement | null>;
  description: RefObject<HTMLElement | null>;
  /** The fleet lineup <ol>; each rocket staggers in. */
  fleet: RefObject<HTMLElement | null>;
}

/**
 * Section header reveal plus a left-to-right stagger over the fleet lineup
 * (oldest rocket first). The 3D "closer look" above it has its own
 * scroll wiring — see rocketsubsystemshowcase.ts.
 */
export function evolutionOfFlightAnimation(refs: EvolutionOfFlightAnimationRefs): AnimationCleanup {
  const { root, heading, description, fleet } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    const header = [heading.current, description.current].filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (header.length) {
      fadeUp(header, { stagger: 0.1, scroll: { trigger: root.current } });
    }

    if (fleet.current) {
      staggerReveal(Array.from(fleet.current.children), {
        scroll: { trigger: fleet.current },
      });
    }
  }, root.current);

  return () => ctx.revert();
}
