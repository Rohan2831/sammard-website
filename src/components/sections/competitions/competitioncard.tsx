import styles from "./competitioncard.module.css";

export interface CompetitionCardProps {
  /** Competition title, e.g. "IREC" */
  title: string;
  /** Background image source */
  imageSrc: string;
  /** Alt text for the background image */
  imageAlt: string;
  /** Optional index, useful for staggered GSAP timelines later */
  index?: number;
}

/**
 * CompetitionCard
 * A single image-backed card used inside the Competitions grid.
 * No description text — title only, bottom-left aligned.
 *
 * GSAP-ready: every major element carries a data-gsap hook so a future
 * timeline can target them without touching this markup again.
 */
export default function CompetitionCard({
  title,
  imageSrc,
  imageAlt,
  index,
}: CompetitionCardProps) {
  return (
    <div
      className={styles.card}
      data-gsap="competition-card"
      data-gsap-index={index}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        className={styles.image}
        data-gsap="competition-card-image"
        loading="lazy"
      />

      <div className={styles.overlay} data-gsap="competition-card-overlay" />

      <h3 className={styles.title} data-gsap="competition-card-title">
        {title}
      </h3>
    </div>
  );
}