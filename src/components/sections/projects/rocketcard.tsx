"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import type { Rocket } from "@/types";
import { RocketViewer3D } from "@/components/common/RocketViewer3D";
import { getLenis } from "@/animations/lenis";
import styles from "./rocketcard.module.css";

export function RocketCard({ rocket, initiallyExpanded = false }: { rocket: Rocket; initiallyExpanded?: boolean }) {
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const [exploded, setExploded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const showModel = expanded && Boolean(rocket.model);

  // Opened from a link (e.g. the homepage fleet): bring the card into view once it has laid out.
  useEffect(() => {
    const card = cardRef.current;
    if (!initiallyExpanded || !card) return;
    const frame = requestAnimationFrame(() => {
      // Clear the fixed navbar (80px) plus the sticky tabs bar beneath it.
      const top = card.getBoundingClientRect().top + window.scrollY - 170;
      const lenis = getLenis();
      if (lenis) {
        // Lenis caches page dimensions; refresh them after the route change before scrolling.
        lenis.resize();
        lenis.scrollTo(top, { immediate: true, force: true });
      } else {
        window.scrollTo(0, top);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [initiallyExpanded]);

  const toggleExpanded = () => {
    setExpanded((v) => !v);
    setExploded(false);
  };

  return (
    <div ref={cardRef} className={styles.card} data-expanded={expanded}>
      <div className={styles.imageWrap} data-kind={rocket.render ? "render" : "photo"}>
        {showModel ? (
          <RocketViewer3D rocket={rocket} orientation="horizontal" interactive explode={exploded ? 1 : 0} />
        ) : rocket.render ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={rocket.render.horizontal} alt={`${rocket.name} rocket`} className={styles.render} loading="lazy" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={rocket.heroImage} alt={rocket.name} className={styles.image} loading="lazy" />
        )}
        <div className={styles.overlay} />
        <h3 className={styles.title}>
          {rocket.name}
          {rocket.year && <span className={styles.year}>{rocket.year}</span>}
        </h3>

        {showModel && (
          <>
            <button
              type="button"
              className={styles.explodeToggle}
              onClick={() => setExploded((v) => !v)}
              aria-pressed={exploded}
            >
              {exploded ? "Assembled view" : "Exploded view"}
            </button>
            <span className={styles.hint}>Drag to rotate</span>
          </>
        )}

        <button
          type="button"
          className={styles.expandButton}
          onClick={toggleExpanded}
          aria-expanded={expanded}
          aria-label={expanded ? `Collapse ${rocket.name} details` : `Expand ${rocket.name} details`}
        >
          <Plus className={styles.plusIcon} data-expanded={expanded} size={20} />
        </button>
      </div>

      {expanded && (
        <div className={styles.details}>
          {rocket.tagline && <p className={styles.tagline}>{rocket.tagline}</p>}

          <dl className={styles.specs}>
            {Object.entries(rocket.specs).map(([key, value]) => (
              <div className={styles.specRow} key={key}>
                <dt>{key.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase())}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <ul className={styles.subsystems}>
            {rocket.components.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> — {c.description}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
