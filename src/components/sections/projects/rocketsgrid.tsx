"use client";

import { useSearchParams } from "next/navigation";
import { rockets } from "@/data/rockets";
import { RocketCard } from "./rocketcard";
import styles from "./rocketstab.module.css";

export function RocketsGrid({ openRocketId = null }: { openRocketId?: string | null }) {
  return (
    <div className={styles.grid}>
      {rockets.map((rocket) => (
        <RocketCard key={rocket.id} rocket={rocket} initiallyExpanded={rocket.id === openRocketId} />
      ))}
    </div>
  );
}

/** Opens the card named by `?rocket=<id>` (linked from the homepage fleet lineup). */
export function RocketsGridFromUrl() {
  const openRocketId = useSearchParams().get("rocket");
  return <RocketsGrid openRocketId={openRocketId} />;
}
