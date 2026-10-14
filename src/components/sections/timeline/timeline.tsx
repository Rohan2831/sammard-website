"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Rocket } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { timelineMilestones } from "@/data/timeline";
import { TIMELINE_FLY_VH, TIMELINE_STEP_VH, timelineAnimation } from "@/animations/timeline";
import styles from "./timeline.module.css";

export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<SVGSVGElement>(null);
  const stopRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(
    () =>
      timelineAnimation({
        root: rootRef,
        scene: sceneRef,
        rail: railRef,
        fill: fillRef,
        rocket: rocketRef,
        trail: trailRef,
        stops: stopRefs,
        panels: panelRefs,
      }),
    []
  );

  const steps = Math.max(1, timelineMilestones.length - 1);
  // The section's height is the scroll budget: one step per year, then the fly-out.
  const scroll = `${steps * TIMELINE_STEP_VH + TIMELINE_FLY_VH}vh`;

  return (
    <section ref={rootRef} className={styles.section} style={{ "--scroll": scroll } as CSSProperties}>
      <div ref={sceneRef} className={styles.scene}>
        <SectionHeader
          heading="Timeline"
          description="Team SAMMARD is approaching its 10-year milestone — here's the journey so far."
        />

        <div ref={railRef} className={styles.rail}>
          <div className={styles.railLine}>
            <div ref={fillRef} className={styles.railFill} />
          </div>
          {timelineMilestones.map((milestone, i) => (
            <button
              key={milestone.id}
              ref={(el) => {
                stopRefs.current[i] = el;
              }}
              type="button"
              className={styles.stop}
              style={{ left: `${(i / steps) * 100}%` }}
              data-active={i === 0}
              aria-label={`Jump to ${milestone.year}: ${milestone.title}`}
            >
              <span className={styles.tick} />
              <span className={styles.stopYear}>{milestone.year}</span>
            </button>
          ))}
        </div>

        <div className={styles.stage}>
          {timelineMilestones.map((milestone, i) => (
            <article
              key={milestone.id}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              className={styles.panel}
            >
              <h3 className={styles.title}>{milestone.title}</h3>
              <p className={styles.description}>{milestone.description}</p>
            </article>
          ))}
        </div>

        <svg ref={trailRef} className={styles.trail} aria-hidden preserveAspectRatio="none">
          <path />
        </svg>
        <div ref={rocketRef} className={styles.rocket} aria-hidden>
          <Rocket size={24} />
        </div>
      </div>
    </section>
  );
}
