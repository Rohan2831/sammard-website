"use client";

import { gsap, prefersReducedMotion } from "./gsap";

/**
 * Eases a scroll-progress value toward its target on GSAP's ticker, so scenes
 * driven by scroll position glide between wheel notches while the page itself
 * scrolls natively (native scrolling stays smooth even when the main thread is
 * busy; JS-driven smooth scrolling does not). The ticker only runs while the
 * value is still catching up.
 */
export function smoothProgress(render: (progress: number) => void, sharpness = 10) {
  const reduced = prefersReducedMotion();
  let current = 0;
  let target = 0;
  let running = false;

  const tick = (_time: number, deltaMs: number) => {
    current += (target - current) * (1 - Math.exp((-sharpness * deltaMs) / 1000));
    if (Math.abs(target - current) < 0.0002) {
      current = target;
      gsap.ticker.remove(tick);
      running = false;
    }
    render(current);
  };

  return {
    /** New scroll progress; eased toward unless `immediate` (first paint, resize, reduced motion). */
    set(progress: number, immediate = false) {
      target = progress;
      if (immediate || reduced) {
        current = target;
        if (running) gsap.ticker.remove(tick);
        running = false;
        render(current);
      } else if (!running) {
        running = true;
        gsap.ticker.add(tick);
      }
    },
    dispose() {
      gsap.ticker.remove(tick);
      running = false;
    },
  };
}
