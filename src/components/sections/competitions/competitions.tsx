"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./competitions.module.css";
import CompetitionCard from "./competitioncard";
import { competitions as COMPETITION_CARDS } from "@/data/competitions";
import type { Competition } from "@/types";
import { competitionsAnimation } from "@/animations/competitions";

export interface CompetitionsProps {
  heading?: string;
  description?: string;
  cards?: Competition[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Competitions
 * Marketing section showcasing the competitions the team takes part in.
 * CSS Modules only — no Tailwind, no inline styles.
 *
 * GSAP-ready: data-gsap hooks are placed on the section, heading,
 * description, grid, each card, and the CTA button for QA/inspection;
 * actual animation targeting is via refs, see competitionsAnimation.
 */
export default function Competitions({
  heading = "COMPETITIONS",
  description = "From launch challenges to satellite design, we compete on national and international stages — here's where we've put our work to the test.",
  cards = COMPETITION_CARDS,
  ctaLabel = "Explore All Events →",
  ctaHref = "/events",
}: CompetitionsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cleanup = competitionsAnimation({
      root: sectionRef,
      heading: headingRef,
      description: descriptionRef,
      grid: gridRef,
      cta: ctaRef,
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-gsap="competitions-section">
      <div className={styles.header}>
        <h2 ref={headingRef} className={styles.heading} data-gsap="competitions-heading">
          {heading}
        </h2>
        <p
          ref={descriptionRef}
          className={styles.description}
          data-gsap="competitions-description"
        >
          {description}
        </p>
      </div>

      <div ref={gridRef} className={styles.grid} data-gsap="competitions-grid">
        {cards.map((card, index) => (
          <CompetitionCard key={card.title} index={index} {...card} />
        ))}
      </div>

      <div className={styles.ctaWrapper}>
        <Link
          ref={ctaRef}
          href={ctaHref}
          className={styles.cta}
          data-gsap="competitions-cta"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}