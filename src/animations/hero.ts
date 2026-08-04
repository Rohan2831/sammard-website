"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/**
 * This file is the reference pattern every other module in
 * `src/animations/` follows. It is intentionally left without a
 * concrete timeline for now — this task is about the architecture,
 * not the Hero's creative direction. Wire the real animation up later
 * using the primitives in `primitives.ts` (fadeUp / splitTextReveal /
 * parallax, etc.) inside the `gsap.context()` block below.
 *
 * The shape (refs in, `gsap.context` scoped to `root`, cleanup out)
 * should NOT change — that's the contract every component relies on.
 */
export interface HeroAnimationRefs extends SectionAnimationRefs {
  video: RefObject<HTMLVideoElement | null>;
  heading: RefObject<HTMLHeadingElement | null>;
  
}

/**
 * Component usage:
 *
 *   const root = useRef<HTMLElement>(null);
 *   const heading = useRef<HTMLHeadingElement>(null);
 *   const subtext = useRef<HTMLElement>(null);
 *   const cta = useRef<HTMLElement>(null);
 *
 */
export function heroAnimation(refs: HeroAnimationRefs): AnimationCleanup {
  console.log("refs", refs);
  const { root, video, heading } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
      gsap.from(video.current, {
      opacity: 0,
      scale: 1.15,
      duration: 2,
      ease: "power3.out",
    });

    gsap.from(heading.current, {
      opacity: 0,
      y: 80,
      duration: 1.4,
      delay: 0.8,
      ease: "power4.out",
    });
    gsap.timeline({
  scrollTrigger: {
    trigger: root.current,
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
})
.to(video.current, {
  scale: 1.2,
  ease: "none",
}, 0)
.to(heading.current, {
  opacity: 0,
  y: -100,
  ease: "none",
}, 0);
    // TODO: entrance timeline goes here, built from primitives, e.g.
    //   const { revert } = splitTextReveal(refs.heading.current, { type: "lines" });
    //   fadeUp([refs.subtext.current, refs.cta.current], { stagger: 0.15, delay: 0.3 });
    //   return () => revert();
  }, root.current );

  return () => ctx.revert();
}