import type { RefObject } from "react";

/**
 * Every animation function returns this. Components call it as the
 * `useEffect` cleanup function, and it's also what a section's own
 * `gsap.context().revert` gets wrapped into.
 */
export type AnimationCleanup = () => void;

/**
 * Base shape every section's animation-refs interface should extend.
 * `root` is the element passed to `gsap.context()` as the animation
 * scope — required so selector-based tweens inside the context stay
 * scoped to this section and cleanup is guaranteed to catch everything
 * created within it.
 *
 * Example:
 *   export interface HeroAnimationRefs extends SectionAnimationRefs {
 *     heading: RefObject<HTMLElement | null>;
 *     subtext: RefObject<HTMLElement | null>;
 *   }
 */
export interface SectionAnimationRefs {
  root: RefObject<HTMLElement | null>;
}

/** Common tuning knobs shared by most entrance-style primitives. */
export interface EntranceOptions {
  /** Vertical travel distance in px. */
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  /** Stagger between targets, in seconds. Only used for multi-target calls. */
  stagger?: number;
}

/** Common tuning knobs for scroll-triggered primitives. */
export interface ScrollOptions {
  /** Element that triggers the ScrollTrigger. Defaults to the animated target. */
  trigger?: Element | string | null;
  start?: string;
  end?: string;
  scrub?: boolean | number;
}