import { forwardRef } from "react";
import Link from "next/link";
import type { Rocket } from "@/types";
import styles from "./fleetlineup.module.css";

/**
 * The fleet's livery renders standing side by side, oldest to newest. Only
 * rockets with a render appear (Pinaka has none yet — see ASSETS_NEEDED.md).
 * Renders are drawn at equal height: real lengths aren't known for every
 * rocket, so scaling them would imply proportions we can't back up.
 * Each links to its card on /projects, opened (`?rocket=<id>`). `scroll={false}`
 * because the card scrolls itself into view once expanded.
 * Forwards its ref to the <ol> so the section animation can stagger rockets.
 */
export const FleetLineup = forwardRef<HTMLOListElement, { rockets: Rocket[] }>(function FleetLineup(
  { rockets },
  ref
) {
  const fleet = rockets.filter((r) => r.render).sort((a, b) => (a.year ?? 0) - (b.year ?? 0));

  return (
    <div className={styles.wrap}>
      <p className={styles.label}>The Fleet</p>
      <ol ref={ref} className={styles.lineup}>
        {fleet.map((rocket) => (
          <li key={rocket.id} className={styles.rocket}>
            <Link
              href={`/projects?rocket=${rocket.id}`}
              scroll={false}
              className={styles.link}
              aria-label={`${rocket.name}${rocket.year ? ` (${rocket.year})` : ""} — view details`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={rocket.render!.vertical} alt="" className={styles.render} loading="lazy" />
              <span className={styles.name}>{rocket.name}</span>
              {rocket.year && <span className={styles.year}>{rocket.year}</span>}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
});
