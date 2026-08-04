import Link from "next/link";
import styles from "./competitions.module.css";
import CompetitionCard, { CompetitionCardProps } from "./competitioncard";

type CompetitionCardData = Omit<CompetitionCardProps, "index">;

const COMPETITION_CARDS: CompetitionCardData[] = [
  {
    title: "IREC",
    imageSrc: "/images/competitions/irec.jpg",
    imageAlt: "Team at the Intercollegiate Rocket Engineering Competition",
  },
  {
    title: "CanSat",
    imageSrc: "/images/competitions/cansat.jpg",
    imageAlt: "Team working on a CanSat competition entry",
  },
  {
    title: "IN-SPACe",
    imageSrc: "/images/competitions/in-space.jpg",
    imageAlt: "Team presenting at an IN-SPACe event",
  },
  {
    title: "BSX",
    imageSrc: "/images/competitions/bsx.jpg",
    imageAlt: "Team competing at BSX",
  },
  {
    title: "Srishti",
    imageSrc: "/images/competitions/srishti.jpg",
    imageAlt: "Team competing at Srishti",
  },
];

export interface CompetitionsProps {
  heading?: string;
  description?: string;
  cards?: CompetitionCardData[];
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Competitions
 * Marketing section showcasing the competitions the team takes part in.
 * CSS Modules only — no Tailwind, no inline styles, no GSAP logic yet.
 *
 * GSAP-ready: data-gsap hooks are placed on the section, heading,
 * description, grid, each card, and the CTA button so a future timeline
 * can be wired in without any markup changes.
 */
export default function Competitions({
  heading = "COMPETITIONS",
  description = "From launch challenges to satellite design, we compete on national and international stages — here's where we've put our work to the test.",
  cards = COMPETITION_CARDS,
  ctaLabel = "Explore All Events →",
  ctaHref = "/events",
}: CompetitionsProps) {
  return (
    <section className={styles.section} data-gsap="competitions-section">
      <div className={styles.header}>
        <h2 className={styles.heading} data-gsap="competitions-heading">
          {heading}
        </h2>
        <p
          className={styles.description}
          data-gsap="competitions-description"
        >
          {description}
        </p>
      </div>

      <div className={styles.grid} data-gsap="competitions-grid">
        {cards.map((card, index) => (
          <CompetitionCard key={card.title} index={index} {...card} />
        ))}
      </div>

      <div className={styles.ctaWrapper}>
        <Link
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