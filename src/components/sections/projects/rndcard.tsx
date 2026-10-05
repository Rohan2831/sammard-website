"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import type { RndProject } from "@/types";
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
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image} alt={project.imageAlt ?? project.title} className={styles.image} loading="lazy" />
        )}
        <div className={styles.overlay} />
        <h3 className={styles.title}>{project.title}</h3>
        <button
          type="button"
          className={styles.expandButton}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${project.title} details` : `Expand ${project.title} details`}
        >
          <Plus className={styles.plusIcon} data-expanded={expanded} size={20} />
        </button>
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
