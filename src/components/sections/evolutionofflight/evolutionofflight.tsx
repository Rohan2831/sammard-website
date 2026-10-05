"use client";

import { useEffect, useRef } from "react";
import { FleetLineup } from "./fleetlineup";
import { RocketSubsystemShowcase } from "./rocketsubsystemshowcase";
import { rockets } from "@/data/rockets";
import { evolutionOfFlightAnimation } from "@/animations/evolutionofflight";
import styles from "./evolutionofflight.module.css";

export function EvolutionOfFlight() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const fleetRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const cleanup = evolutionOfFlightAnimation({
      root: sectionRef,
      heading: headingRef,
      description: descriptionRef,
      fleet: fleetRef,
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 ref={headingRef} className={styles.heading}>
          Evolution of Flight
        </h2>
        <p ref={descriptionRef} className={styles.description}>
          Every rocket is a chapter in Team SAMMARD&apos;s history.
        </p>
      </div>

      <RocketSubsystemShowcase rocket={rockets[0]} />

      <FleetLineup ref={fleetRef} rockets={rockets} />
    </section>
  );
}
