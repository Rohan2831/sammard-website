"use client";

import { useState } from "react";
import type { RndProject } from "@/types";
import { SwapImage } from "@/components/common/SwapImage";
import { ExpandButton } from "./expandbutton";
import styles from "./rndcard.module.css";

/**
 * One R&D project: image + title only until the + is pressed, then it spans
 * the full grid row with the details beside (desktop) or below (mobile) the image.
 */
export function RndCard({ project }: { project: RndProject }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className={styles.card} data-expanded={expanded}>
      <div className={styles.imageWrap} data-empty={!project.image}>
        {project.image && (
          <SwapImage
            src={project.image}
            alt={project.imageAlt ?? project.title}
            sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
            className={styles.image}
          />
        )}
        <div className={styles.overlay} />
        <h3 className={styles.title}>{project.title}</h3>
        <ExpandButton expanded={expanded} label={project.title} onToggle={() => setExpanded((v) => !v)} />
      </div>

      {expanded && (
        <div className={styles.details}>
          <p className={styles.category}>{project.category}</p>
          <p className={styles.description}>{project.description}</p>
        </div>
      )}
    </article>
  );
}
