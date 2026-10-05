"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./sponsors.module.css";
import { SponsorList } from "@/components/common/SponsorList";
import { sponsors as SPONSORS } from "@/data/sponsors";
import type { Sponsor } from "@/types";
import { sponsorsAnimation } from "@/animations/sponsors";

export interface SponsorsProps {
  heading?: string;
  description?: string;
  sponsors?: Sponsor[];
  ctaHeading?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Sponsors
 * Marketing section showcasing sponsor logos plus a CTA block inviting
 * new sponsors to partner with the team.
 * CSS Modules only — no Tailwind, no inline styles.
 *
 * GSAP-ready: data-gsap hooks are placed on the section, heading,
 * description, grid, each card, the CTA block, and the CTA button for
 * QA/inspection; actual animation targeting is via refs, see sponsorsAnimation.
 */
export default function Sponsors({
  heading = "OUR SPONSORS",
  description = "Team SAMMARD is proud to be backed by organizations that believe in student-led innovation and push our missions further, together.",
  sponsors = SPONSORS,
  ctaHeading = "Become a Sponsor",
  ctaDescription = "Partner with Team SAMMARD and help power the next generation of student engineers, launches, and breakthroughs.",
  ctaLabel = "Partner With Us",
  ctaHref = "/sponsors",
}: SponsorsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const ctaBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = sponsorsAnimation({
      root: sectionRef,
      heading: headingRef,
      description: descriptionRef,
      grid: gridRef,
      ctaBlock: ctaBlockRef,
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.section} data-gsap="sponsors-section">
      <div className={styles.header}>
        <h2 ref={headingRef} className={styles.heading} data-gsap="sponsors-heading">
          {heading}
        </h2>
        <p ref={descriptionRef} className={styles.description} data-gsap="sponsors-description">
          {description}
        </p>
      </div>

      <div className={styles.listWrap} data-gsap="sponsors-grid">
        <SponsorList ref={gridRef} sponsors={sponsors} />
      </div>

      <div ref={ctaBlockRef} className={styles.ctaBlock} data-gsap="sponsors-cta-block">
        <h3 className={styles.ctaHeading} data-gsap="sponsors-cta-heading">
          {ctaHeading}
        </h3>
        <p
          className={styles.ctaDescription}
          data-gsap="sponsors-cta-description"
        >
          {ctaDescription}
        </p>
        <Link href={ctaHref} className={styles.ctaButton} data-gsap="sponsors-cta-button">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}