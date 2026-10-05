"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import styles from "./whoweare.module.css";
import { whoWeAreCopy } from "@/data/whoweare";
import { whoWeAreAnimation } from "@/animations/whoweare";

export interface WhoWeAreProps {
  /** Background photo. Defaults to the placeholder used in design review. */
  imageSrc?: string;
  imageAlt?: string;
}

/**
 * Full-bleed "Who We Are" section for the marketing site.
 * Sits directly below the Hero and continues its cinematic language:
 * full-bleed photography, dark overlay, oversized display type, generous
 * vertical rhythm.
 */
export default function WhoWeAre({
  imageSrc = whoWeAreCopy.imageSrc,
  imageAlt = whoWeAreCopy.imageAlt,
}: WhoWeAreProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const cleanup = whoWeAreAnimation({
      root: sectionRef,
      heading: headingRef,
      description: introRef,
      missionVision: ctaRef,
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
  <div className={styles.container}>

    <div className={styles.content}>

      <h2
        ref={headingRef}
        id="who-we-are-heading"
        className={styles.heading}
      >
        {whoWeAreCopy.heading}
      </h2>

      <p ref={introRef} className={styles.intro}>
        {whoWeAreCopy.intro[0]}
        <br /><br />
        {whoWeAreCopy.intro[1]}
      </p>

      <Link
        ref={ctaRef}
        href="/about"
        className={styles.cta}
      >
        Learn More About Us
      </Link>

    </div>

    <div className={styles.imageContainer}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        sizes="100vw"
        className={styles.image}
      />
    </div>

  </div>
</section>
  );
}