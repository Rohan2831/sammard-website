"use client";

import type { RefObject } from "react";
import { ScrollTrigger, prefersReducedMotion } from "./gsap";
import { getLenis } from "./lenis";
import { smoothProgress } from "./smoothprogress";
import type { AnimationCleanup, SectionAnimationRefs } from "./types";

/** Scroll length per year, and for the closing fly-out, in vh. */
export const TIMELINE_STEP_VH = 55;
export const TIMELINE_FLY_VH = 90;
/** Fixed navbar height — the sticky scene sits just below it. */
const NAV_OFFSET = 80;

export interface TimelineAnimationRefs extends SectionAnimationRefs {
  /** The sticky, viewport-sized scene everything is positioned in. */
  scene: RefObject<HTMLDivElement | null>;
  rail: RefObject<HTMLDivElement | null>;
  fill: RefObject<HTMLDivElement | null>;
  rocket: RefObject<HTMLDivElement | null>;
  trail: RefObject<SVGSVGElement | null>;
  stops: RefObject<(HTMLButtonElement | null)[]>;
  panels: RefObject<(HTMLElement | null)[]>;
}

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Point = [number, number];

function bezier(p: Point[], t: number): { point: Point; angle: number } {
  const u = 1 - t;
  const [a, b, c, d] = p;
  const point: Point = [
    u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * d[0],
    u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * d[1],
  ];
  const dx = 3 * u * u * (b[0] - a[0]) + 6 * u * t * (c[0] - b[0]) + 3 * t * t * (d[0] - c[0]);
  const dy = 3 * u * u * (b[1] - a[1]) + 6 * u * t * (c[1] - b[1]) + 3 * t * t * (d[1] - c[1]);
  return { point, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

/**
 * The timeline is one sticky scene (no GSAP `pin` — see ARCHITECTURE.md
 * "Timeline's pinned scroll") driven straight from scroll progress:
 *
 * 1. Travel: the rocket rides the rail from year to year while the milestone
 *    for the nearest year fades/slides in and the previous one fades out.
 * 2. Fly-out: once the present year is reached, the rocket leaves the rail and
 *    sweeps across the whole screen (a cubic Bézier, nose along the tangent),
 *    drawing a trail, and exits off the top — then the page simply continues.
 *
 * The scene starts at the very top of the page (start: "top 80px"), so the
 * first scroll already moves the rocket. Clicking a year glides to its point.
 */
export function timelineAnimation(refs: TimelineAnimationRefs): AnimationCleanup {
  const { root, scene, rail, fill, rocket, trail, stops, panels } = refs;
  const sectionEl = root.current;
  if (!sectionEl || !scene.current || !rail.current || !rocket.current) return () => {};

  const count = panels.current.length;
  const steps = Math.max(1, count - 1);
  const travelFrac = (steps * TIMELINE_STEP_VH) / (steps * TIMELINE_STEP_VH + TIMELINE_FLY_VH);
  const reduced = prefersReducedMotion();

  // Geometry (relative to the scene), refreshed on resize via onRefresh.
  let railStart = 0;
  let railEnd = 0;
  let railY = 0;
  let flight: Point[] = [];
  let trailLength = 0;
  const trailPath = trail.current?.querySelector("path") ?? null;

  const measure = () => {
    const sceneBox = scene.current!.getBoundingClientRect();
    const railBox = rail.current!.getBoundingClientRect();
    railStart = railBox.left - sceneBox.left;
    railEnd = railBox.right - sceneBox.left;
    railY = railBox.top - sceneBox.top + railBox.height / 2;
    const w = sceneBox.width;
    const h = sceneBox.height;
    // Off the rail to the right, down across the bottom, back left, then up and out the top.
    flight = [
      [railEnd, railY],
      [w * 1.05, h * 0.95],
      [-w * 0.15, h * 0.85],
      [w * 0.6, -h * 0.3],
    ];
    if (trail.current && trailPath) {
      trail.current.setAttribute("viewBox", `0 0 ${w} ${h}`);
      const [a, b, c, d] = flight;
      trailPath.setAttribute("d", `M${a[0]} ${a[1]} C${b[0]} ${b[1]} ${c[0]} ${c[1]} ${d[0]} ${d[1]}`);
      trailLength = trailPath.getTotalLength();
      trailPath.style.strokeDasharray = `${trailLength}`;
    }
  };

  let lastActive = -1;
  const render = (progress: number) => {
    const travel = clamp01(progress / travelFrac);
    const fly = reduced ? 0 : clamp01((progress - travelFrac) / (1 - travelFrac));
    const pos = travel * steps;

    // Milestones: hold near their year, fade out on the way to the next, fade the next in.
    panels.current.forEach((panel, i) => {
      if (!panel) return;
      const d = Math.abs(pos - i);
      const opacity = d <= 0.25 ? 1 : d >= 0.5 ? 0 : (0.5 - d) / 0.25;
      panel.style.opacity = String(opacity);
      panel.style.visibility = opacity > 0 ? "visible" : "hidden";
      panel.style.transform = reduced ? "" : `translateY(${(i - pos) * 32}px)`;
    });

    const active = Math.round(pos);
    if (active !== lastActive) {
      stops.current.forEach((stop, i) => {
        if (!stop) return;
        stop.dataset.active = String(i === active);
        if (i === active) stop.setAttribute("aria-current", "step");
        else stop.removeAttribute("aria-current");
      });
      lastActive = active;
    }

    if (fill.current) fill.current.style.transform = `scaleX(${travel})`;

    // Rocket: on the rail it points right (the icon's nose is at 45°, hence +45).
    let x = railStart + travel * (railEnd - railStart);
    let y = railY;
    let angle = 0;
    let scale = 1;
    if (fly > 0) {
      const at = bezier(flight, fly);
      [x, y] = at.point;
      angle = at.angle;
      scale = 1 + 1.8 * fly;
    }
    rocket.current!.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle + 45}deg) scale(${scale})`;

    if (trailPath) {
      trailPath.style.strokeDashoffset = `${trailLength * (1 - fly)}`;
      trailPath.style.opacity = String(fly > 0 ? 1 - clamp01((fly - 0.75) / 0.25) : 0);
    }
  };

  const progress = smoothProgress(render);
  const trigger = ScrollTrigger.create({
    trigger: sectionEl,
    start: `top ${NAV_OFFSET}px`,
    end: "bottom bottom",
    invalidateOnRefresh: true,
    onRefresh: (self) => {
      measure();
      progress.set(self.progress, true);
    },
    onUpdate: (self) => progress.set(self.progress),
  });
  measure();
  progress.set(trigger.progress, true);

  // Clicking a year glides to the scroll position where that year is centred on the rail.
  const handlers = stops.current.map((stop, i) => {
    const onClick = () => {
      const target = trigger.start + (i / steps) * travelFrac * (trigger.end - trigger.start);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { duration: 1.2 });
      else window.scrollTo({ top: target, behavior: reduced ? "auto" : "smooth" });
    };
    stop?.addEventListener("click", onClick);
    return () => stop?.removeEventListener("click", onClick);
  });

  return () => {
    handlers.forEach((off) => off());
    progress.dispose();
    trigger.kill();
  };
}
