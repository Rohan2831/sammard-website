"use client";

import type { RefObject } from "react";
import { gsap } from "./gsap";
import { fadeUp } from "./primitives";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

export interface RocketSubsystemShowcaseAnimationRefs extends SectionAnimationRefs {
  /** Container whose direct children are the subsystem rows. */
  rows: RefObject<HTMLElement | null>;
}

/**
 * Each subsystem row (3D part + description) rises in as it scrolls into
 * view. The 3D views track their row's on-screen box every frame, so they
 * follow the row's transform during the reveal. fadeUp honours reduced motion.
 */
export function rocketSubsystemShowcaseAnimation(
  refs: RocketSubsystemShowcaseAnimationRefs
): AnimationCleanup {
  const { root, rows } = refs;
  if (!root.current) return () => {};

  const ctx = gsap.context(() => {
    const items = rows.current ? (Array.from(rows.current.children) as HTMLElement[]) : [];
    items.forEach((row) => fadeUp(row, { scroll: { trigger: row } }));
  }, root.current);

  return () => ctx.revert();
}
