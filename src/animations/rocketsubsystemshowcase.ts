"use client";

import { ScrollTrigger } from "./gsap";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** `root` is the tall scroll track the showcase's sticky stage rides inside. */
export type RocketSubsystemShowcaseAnimationRefs = SectionAnimationRefs;

/**
 * Reports how far the visitor has scrolled through the showcase track (0 when
 * its top meets the viewport top, 1 when its bottom meets the viewport bottom).
 * The component turns that into the explode amount and the active subsystem;
 * the 3D scene and text eases do the animating. Runs under reduced motion too:
 * which subsystem is on screen is content, not decoration (the scene and text
 * then just change without easing).
 */
export function rocketSubsystemShowcaseAnimation(
  refs: RocketSubsystemShowcaseAnimationRefs,
  onProgress: (progress: number) => void
): AnimationCleanup {
  const { root } = refs;
  if (!root.current) return () => {};

  const trigger = ScrollTrigger.create({
    trigger: root.current,
    start: "top top",
    end: "bottom bottom",
    onUpdate: (self) => onProgress(self.progress),
    onRefresh: (self) => onProgress(self.progress),
  });
  onProgress(trigger.progress);

  return () => trigger.kill();
}
