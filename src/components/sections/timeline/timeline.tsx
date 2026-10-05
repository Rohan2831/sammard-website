"use client";

import { useEffect, useRef } from "react";
import { Rocket } from "lucide-react";
import { timelineMilestones } from "@/data/timeline";
import { timelineAnimation } from "@/animations/timeline";
import styles from "./timeline.module.css";

export function Timeline() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = timelineAnimation({ root: rootRef, track: trackRef, marker: markerRef });
    return cleanup;
  }, []);

  return (
    <section ref={rootRef} className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.markerLine}>
          <div ref={markerRef} className={styles.marker}>
            <Rocket size={20} />
          </div>
        </div>

        <div className={styles.wrapper}>
          <div ref={trackRef} className={styles.track}>
            {timelineMilestones.map((milestone) => (
              <div className={styles.card} key={milestone.id}>
                <p className={styles.year}>{milestone.year}</p>
                <h3 className={styles.title}>{milestone.title}</h3>
                <p className={styles.description}>{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
