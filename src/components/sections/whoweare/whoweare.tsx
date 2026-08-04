import Image from "next/image";
import Link from "next/link";

import styles from "./whoweare.module.css";

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
 *
 * Pure CSS Modules, no inline styles, no animation library. Interactive
 * elements carry a `data-gsap` hook so a future GSAP timeline can target
 * them without any markup changes.
 */
export default function WhoWeAre({
  imageSrc = "/images/teampic2.jpg",
  imageAlt = "Team SAMMARD at work",
}: WhoWeAreProps) {
  return (
    <section className={styles.section}>
  <div className={styles.container}>

    <div className={styles.content}>

      <h2
        id="who-we-are-heading"
        className={styles.heading}
      >
        Who We Are
      </h2>

      <p className={styles.intro}>
        Team Sammard is a student-led aerospace team committed to advancing
        space technology in India through innovation, research, and development.
        Our work focuses on the design and development of high-power sounding
        rockets, advanced payloads, and canister satellites, pushing the
        boundaries of student-driven aerospace engineering.

        <br /><br />

        Based at VIT Vellore's Creations and Innovation Lab, we thrive in a
        collaborative ecosystem where ideas transform into real-world
        solutions. By bridging classroom learning with hands-on projects,
        we empower the next generation of aerospace engineers.
      </p>

      <Link
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