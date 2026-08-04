"use client";

import SplitType from "split-type";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./gsap";
import type { EntranceOptions, ScrollOptions } from "./types";

/**
 * PRIMITIVES
 * ----------
 * Small, composable building blocks. Section modules (hero.ts,
 * navbar.ts, ...) call these from inside their own `gsap.context()`
 * instead of writing raw `gsap.to`/`ScrollTrigger.create` calls
 * directly. This keeps every section's motion consistent with the
 * site's cinematic/minimal direction and means easing, timing, and
 * reduced-motion handling only need to be tuned in one place.
 *
 * Every primitive:
 *  - is a no-op (or an instant, motion-free `gsap.set`) when
 *    `prefersReducedMotion()` is true
 *  - creates tweens/ScrollTriggers that are automatically captured and
 *    killed by the enclosing `gsap.context()` on `.revert()` — no
 *    manual `.kill()` bookkeeping needed in section files
 *  - favors group/stagger animation over animating elements one by one
 */

/**
 * Fade + rise entrance for one or more elements. The default building
 * block for headings, paragraphs, cards, buttons — anything that
 * should feel like it settles into place rather than "pops" or
 * bounces in.
 */
export function fadeUp(
  targets: gsap.TweenTarget,
  options: EntranceOptions & { scroll?: ScrollOptions } = {}
) {
  const {
    y = 32,
    duration = 1.1,
    delay = 0,
    ease = "power3.out",
    stagger = 0,
    scroll,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: scroll
      ? {
          trigger: scroll.trigger ?? (targets as Element),
          start: scroll.start ?? "top 82%",
        }
      : undefined,
  });
}

/**
 * Plain opacity fade, no movement. Used for background layers,
 * overlays, or anything where a rise would feel like too much.
 */
export function fadeIn(
  targets: gsap.TweenTarget,
  options: EntranceOptions & { scroll?: ScrollOptions } = {}
) {
  const { duration = 1.4, delay = 0, ease = "power2.out", stagger = 0, scroll } =
    options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1 });
    return null;
  }

  return gsap.from(targets, {
    opacity: 0,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: scroll
      ? {
          trigger: scroll.trigger ?? (targets as Element),
          start: scroll.start ?? "top 85%",
        }
      : undefined,
  });
}

/**
 * Staggered reveal for a group of siblings (grid cards, nav links,
 * list items). This is the preferred way to animate a collection —
 * one call, one stagger — rather than looping and animating each
 * child individually.
 */
export function staggerReveal(
  targets: gsap.TweenTarget,
  options: EntranceOptions & { scroll?: ScrollOptions } = {}
) {
  const {
    y = 28,
    duration = 0.9,
    ease = "power3.out",
    stagger = 0.12,
    scroll,
  } = options;

  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    ease,
    stagger,
    scrollTrigger: scroll
      ? {
          trigger: scroll.trigger ?? (targets as Element),
          start: scroll.start ?? "top 80%",
        }
      : undefined,
  });
}

export interface SplitTextRevealOptions extends EntranceOptions {
  /** Which unit SplitType breaks the text into. Lines read as the most premium/least gimmicky. */
  type?: "lines" | "words" | "chars";
  scroll?: ScrollOptions;
}

/**
 * Splits a heading/paragraph and reveals it line-by-line (or
 * word-by-word) with a fade + rise stagger. This is the one primitive
 * with extra cleanup: SplitType isn't a GSAP plugin, so its DOM
 * mutations aren't reverted by `gsap.context()` automatically. The
 * returned `revert()` must be called from the section's own context
 * cleanup — see the pattern below.
 *
 * Usage inside a section module:
 *
 *   const ctx = gsap.context(() => {
 *     const { revert } = splitTextReveal(headingEl, { type: "lines" });
 *     return () => revert();
 *   }, root);
 */
export function splitTextReveal(
  target: Element | null,
  options: SplitTextRevealOptions = {}
) {
  const {
    type = "lines",
    y = 24,
    duration = 1,
    delay = 0,
    ease = "power3.out",
    stagger = 0.08,
    scroll,
  } = options;

  if (!target) {
    return { split: null, tween: null, revert: () => {} };
  }

  const split = new SplitType(target as HTMLElement, { types: type });
  const units = split[type] ?? [];

  if (prefersReducedMotion() || units.length === 0) {
    gsap.set(units, { opacity: 1, y: 0 });
    return { split, tween: null, revert: () => split.revert() };
  }

  const tween = gsap.from(units, {
    y,
    opacity: 0,
    duration,
    delay,
    ease,
    stagger,
    scrollTrigger: scroll
      ? {
          trigger: scroll.trigger ?? target,
          start: scroll.start ?? "top 80%",
        }
      : undefined,
  });

  return { split, tween, revert: () => split.revert() };
}

export interface ParallaxOptions extends ScrollOptions {
  /** Vertical travel as a percentage of the element's own height. Keep subtle. */
  yPercent?: number;
}

/**
 * Subtle scroll-linked parallax drift, scrubbed to scroll position.
 * Intended for background images/media layers only — never for text
 * or interactive elements.
 */
export function parallax(target: gsap.TweenTarget, options: ParallaxOptions = {}) {
  const {
    yPercent = -12,
    trigger,
    start = "top bottom",
    end = "bottom top",
    scrub = true,
  } = options;

  if (prefersReducedMotion()) return null;

  return gsap.to(target, {
    yPercent,
    ease: "none",
    scrollTrigger: {
      trigger: trigger ?? (target as Element),
      start,
      end,
      scrub,
    },
  });
}

export interface PinSectionOptions {
  start?: string;
  end?: string;
  pinSpacing?: boolean;
}

/**
 * Pins a section in the viewport for the duration of a scroll range.
 * Use sparingly — reserved for a section that genuinely needs a
 * held/cinematic moment (e.g. a hero that holds while a headline
 * resolves). Not a default for every section.
 */
export function pinSection(
  trigger: Element | string,
  options: PinSectionOptions = {}
) {
  const { start = "top top", end = "+=100%", pinSpacing = true } = options;

  if (prefersReducedMotion()) return null;

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin: true,
    pinSpacing,
  });
}