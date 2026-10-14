"use client";

import type { RefObject } from "react";
import SplitType from "split-type";

import { gsap, prefersReducedMotion } from "./gsap";
import { fadeUp } from "./primitives";
import type {
  AnimationCleanup,
  SectionAnimationRefs,
} from "./types";

export interface HeroAnimationRefs extends SectionAnimationRefs {
  video: RefObject<HTMLVideoElement | null>;
  heading: RefObject<HTMLHeadingElement | null>;
  ctaGroup: RefObject<HTMLDivElement | null>;
}

export function heroAnimation(
  refs: HeroAnimationRefs
): AnimationCleanup {
  const { root, video, heading, ctaGroup } = refs;

  if (!root.current) {
    return () => {};
  }

  let split: SplitType | null = null;

  const ctx = gsap.context(() => {
    /*
     * ---------------------------------------------------------------
     * VIDEO ENTRANCE
     * ---------------------------------------------------------------
     */

    gsap.from(video.current, {
      opacity: 0,
      scale: 1.08,
      duration: 1.8,
      ease: "power3.out",
    });

    /*
     * ---------------------------------------------------------------
     * HERO TITLE — LETTER BY LETTER
     * ---------------------------------------------------------------
     */

    if (heading.current) {
      if (prefersReducedMotion()) {
        gsap.set(heading.current, {
          opacity: 1,
        });
      } else {
        split = new SplitType(heading.current, {
          types: "chars",
        });

        const chars = split.chars;

        gsap.set(chars, {
          opacity: 0,
        });

        gsap.to(chars, {
          opacity: 1,
          duration: 0.035,
          stagger: 0.085,
          ease: "none",
          delay: 0.4,
        });
      }
    }

    /*
     * ---------------------------------------------------------------
     * CTA GROUP — fade in after the letter-reveal
     * ---------------------------------------------------------------
     */

    if (ctaGroup.current) {
      fadeUp(ctaGroup.current, { delay: 1.2, duration: 0.9 });
    }

    /*
     * ---------------------------------------------------------------
     * HERO SCROLL TRANSITION
     * ---------------------------------------------------------------
     */

    if (!prefersReducedMotion()) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        })
        .to(
          video.current,
          {
            scale: 1.15,
            ease: "none",
          },
          0
        )
        .to(
          [heading.current, ctaGroup.current].filter(Boolean),
          {
            opacity: 0,
            y: -80,
            ease: "none",
          },
          0
        );
    }
  }, root.current);

  return () => {
    ctx.revert();
    split?.revert();
  };
}