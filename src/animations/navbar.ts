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
  // Only pages with a hero (the homepage) fade the bar out. Without one, a
  // "[data-hero]" trigger falls back to the whole page and the bar faded to
  // near-transparent on scroll, letting content (the Projects tabs) show through.
  const hero = document.querySelector("[data-hero]");

  if (!root.current || !hero) {
    return () => {};
  }

  const ctx = gsap.context(() => {
    gsap.to(root.current, {
      opacity: 0,

      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, root.current);

  return () => ctx.revert();
}