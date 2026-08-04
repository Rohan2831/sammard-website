import Link from "next/link";
import styles from "./sponsors.module.css";
import SponsorCard, { SponsorCardProps } from "./sponsorcard";

type SponsorData = Omit<SponsorCardProps, "index">;

const SPONSORS: SponsorData[] = [
  {
    name: "Converge",
    logoSrc: "/images/sponsors/converge.png",
    logoAlt: "Sponsor One logo",
  },
  {
    name: "SolidWorks",
    logoSrc: "/images/sponsors/solidworks.png",
    logoAlt: "Sponsor Two logo",
  },
  {
    name: "Altium Designer",
    logoSrc: "/images/sponsors/altium.png",
    logoAlt: "Sponsor Three logo",
  },
  {
    name: "Altair",
    logoSrc: "/images/sponsors/altair.png",
    logoAlt: "Sponsor Four logo",
  },
  {
    name: "VIT University",
    logoSrc: "/images/sponsors/vit.png",
    logoAlt: "Sponsor Five logo",
  },
  {
    name: "Aerospace Association of India",
    logoSrc: "/images/sponsors/sponsor-six.png",
    logoAlt: "Sponsor Six logo",
  },
];

export interface SponsorsProps {
  heading?: string;
  description?: string;
  sponsors?: SponsorData[];
  showSponsorNames?: boolean;
  ctaHeading?: string;
  ctaDescription?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

/**
 * Sponsors
 * Marketing section showcasing sponsor logos plus a CTA block inviting
 * new sponsors to partner with the team.
 * CSS Modules only — no Tailwind, no inline styles, no GSAP logic yet.
 *
 * GSAP-ready: data-gsap hooks are placed on the section, heading,
 * description, grid, each card, the CTA block, and the CTA button so a
 * future timeline can be wired in without any markup changes.
 */
export default function Sponsors({
  heading = "OUR SPONSORS",
  description = "Team SAMMARD is proud to be backed by organizations that believe in student-led innovation and push our missions further, together.",
  sponsors = SPONSORS,
  showSponsorNames = true,
  ctaHeading = "Become a Sponsor",
  ctaDescription = "Partner with Team SAMMARD and help power the next generation of student engineers, launches, and breakthroughs.",
  ctaLabel = "Partner With Us",
  ctaHref = "/sponsors",
}: SponsorsProps) {
  return (
    <section className={styles.section} data-gsap="sponsors-section">
      <div className={styles.header}>
        <h2 className={styles.heading} data-gsap="sponsors-heading">
          {heading}
        </h2>
        <p className={styles.description} data-gsap="sponsors-description">
          {description}
        </p>
      </div>

      <div className={styles.grid} data-gsap="sponsors-grid">
        {sponsors.map((sponsor, index) => (
          <SponsorCard
            key={sponsor.name}
            index={index}
            showName={showSponsorNames}
            {...sponsor}
          />
        ))}
      </div>

      <div className={styles.ctaBlock} data-gsap="sponsors-cta-block">
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