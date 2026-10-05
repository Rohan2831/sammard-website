"use client";

import { gsap } from "./gsap";
import type {
  AnimationCleanup,
  SectionAnimationRefs,
} from "./types";

export type NavbarAnimationRefs = SectionAnimationRefs;

export function navbarAnimation(
  refs: NavbarAnimationRefs
): AnimationCleanup {
  const { root } = refs;

  if (!root.current) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    gsap.to(root.current, {
      opacity: 0,

      scrollTrigger: {
        trigger: "[data-hero]",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, root.current);

  return () => ctx.revert();
}