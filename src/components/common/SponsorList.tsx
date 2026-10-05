import { forwardRef } from "react";
import type { Sponsor } from "@/types";
import styles from "./SponsorList.module.css";

/**
 * Sponsor grid — logo chip with the name stacked below, in responsive
 * columns. Shared between the homepage Sponsors teaser and the /sponsors
 * page's tiered breakdown so both stay visually identical.
 * Forwards its ref to the root <ul> so callers can GSAP-stagger the cells.
 */
export const SponsorList = forwardRef<HTMLUListElement, { sponsors: Sponsor[] }>(
  function SponsorList({ sponsors }, ref) {
    return (
      <ul ref={ref} className={styles.grid}>
        {sponsors.map((sponsor) => {
          const content = (
            <>
              <span className={styles.logoWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={sponsor.logoSrc} alt={sponsor.logoAlt} className={styles.logo} loading="lazy" />
              </span>
              <span className={styles.name}>{sponsor.name}</span>
            </>
          );

          return (
            <li className={styles.cell} key={sponsor.id}>
              {sponsor.website ? (
                <a href={sponsor.website} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {content}
                </a>
              ) : (
                <span className={styles.link}>{content}</span>
              )}
            </li>
          );
        })}
      </ul>
    );
  }
);
