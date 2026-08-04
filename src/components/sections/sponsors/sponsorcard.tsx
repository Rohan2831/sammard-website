import styles from "./sponsorcard.module.css";

export interface SponsorCardProps {
  /** Sponsor name, e.g. "Acme Aerospace" */
  name: string;
  /** Sponsor logo source */
  logoSrc: string;
  /** Alt text for the logo */
  logoAlt: string;
  /** Whether to display the sponsor name below the logo */
  showName?: boolean;
  /** Optional index, useful for staggered GSAP timelines later */
  index?: number;
}

/**
 * SponsorCard
 * A single white card displaying a sponsor's logo (and optionally name)
 * used inside the Sponsors grid.
 *
 * GSAP-ready: every major element carries a data-gsap hook so a future
 * timeline can target them without touching this markup again.
 */
export default function SponsorCard({
  name,
  logoSrc,
  logoAlt,
  showName = true,
  index,
}: SponsorCardProps) {
  return (
    <div
      className={styles.card}
      data-gsap="sponsor-card"
      data-gsap-index={index}
    >
      <div className={styles.logoWrapper} data-gsap="sponsor-card-logo-wrap">
        <img
          src={logoSrc}
          alt={logoAlt}
          className={styles.logo}
          data-gsap="sponsor-card-logo"
          loading="lazy"
        />
      </div>

      {showName && (
        <p className={styles.name} data-gsap="sponsor-card-name">
          {name}
        </p>
      )}
    </div>
  );
}