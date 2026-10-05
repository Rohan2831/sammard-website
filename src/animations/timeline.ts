"use client";

import type { RefObject } from "react";
import { gsap, prefersReducedMotion } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

export interface TimelineAnimationRefs extends SectionAnimationRefs {
  track: RefObject<HTMLDivElement | null>;
  marker: RefObject<HTMLDivElement | null>;
}

/**
 * Scrubs the milestone track horizontally on desktop (>=768px) while a
 * `position: sticky` wrapper (see timeline.module.css's `.sticky`) holds it
 * on screen — the section itself is given extra scroll height for the
 * track's full width. Below 768px the track is a plain CSS vertical list
 * and this animation intentionally does nothing.
 *
 * Deliberately NOT using ScrollTrigger's `pin: true` here: pinning wraps
 * the trigger element in a GSAP-inserted "pin-spacer" div outside React's
 * control, and on a Next.js App Router route change (e.g. navigating away
 * via the header) React's unmount commit tries to remove a child that
 * GSAP has since relocated, throwing an uncaught
 * `NotFoundError: Failed to execute 'removeChild'`. Sticky positioning
 * gets the same "held in place while content scrolls past" effect without
 * GSAP ever touching the DOM structure, so there's nothing for a route
 * change to conflict with.
 */
export function timelineAnimation(refs: TimelineAnimationRefs): AnimationCleanup {
  const { root, track, marker } = refs;
  if (!root.current || !track.current) return () => {};

  const ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const sectionEl = root.current;
      const trackEl = track.current;
      const wrapper = trackEl?.parentElement;
      if (!sectionEl || !trackEl || !wrapper) return;

      const distance = trackEl.scrollWidth - wrapper.clientWidth;
      if (distance <= 0) return;

      sectionEl.style.height = `calc(100vh + ${distance}px)`;

      if (prefersReducedMotion()) {
        return () => {
          sectionEl.style.height = "";
        };
      }

      const tween = gsap.to(trackEl, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (marker.current) {
              marker.current.style.left = `${self.progress * 100}%`;
            }
          },
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        sectionEl.style.height = "";
      };
    });

    return () => mm.revert();
  }, root.current);

  return () => ctx.revert();
}
