"use client";

import { useEffect, useRef } from "react";
import styles from "./teaminaction.module.css";
import ActionCard from "./actioncard";
import { actionCards as ACTION_CARDS, type ActionCardData } from "@/data/teaminaction";
import { teamInActionAnimation } from "@/animations/teaminaction";

export interface TeamInActionProps {
  heading?: string;
  description?: string;
  cards?: ActionCardData[];
}

/**
 * TeamInAction
 * Marketing section showcasing the team's activities as an image grid.
 * CSS Modules only — no Tailwind, no inline styles.
 *
 * GSAP-ready: data-gsap hooks are placed on the section, heading,
 * description, grid, and each card for QA/inspection; actual animation
 * targeting is via refs, see teamInActionAnimation.
 */
export default function TeamInAction({
  heading = "TEAM IN ACTION",
  description = "From the shop floor to the launch pad, this is what drives us — a look at the people, the process, and the moments that define the team.",
  cards = ACTION_CARDS,
}: TeamInActionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = teamInActionAnimation({
      root: sectionRef,
      heading: headingRef,
      description: descriptionRef,
      grid: gridRef,
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-gsap="team-in-action-section">
      <div className={styles.header}>
        <h2 ref={headingRef} className={styles.heading} data-gsap="team-in-action-heading">
          {heading}
        </h2>
        <p
          ref={descriptionRef}
          className={styles.description}
          data-gsap="team-in-action-description"
        >
          {description}
        </p>
      </div>

      <div ref={gridRef} className={styles.grid} data-gsap="team-in-action-grid">
        {cards.map((card, index) => (
          <ActionCard key={card.title} index={index} {...card} />
        ))}
      </div>
    </section>
  );
}