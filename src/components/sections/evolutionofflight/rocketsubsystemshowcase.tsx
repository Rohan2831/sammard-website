"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { rocketSubsystemShowcaseAnimation } from "@/animations/rocketsubsystemshowcase";
import type { Rocket } from "@/types";
import styles from "./rocketsubsystemshowcase.module.css";

// three.js / R3F only load once the section nears the viewport.
const RocketViewsCanvas = dynamic(
  () => import("@/components/common/RocketModelCanvas").then((m) => m.RocketViewsCanvas),
  { ssr: false }
);
const RocketPartView = dynamic(
  () => import("@/components/common/RocketModelCanvas").then((m) => m.RocketPartView),
  { ssr: false }
);

export interface RocketSubsystemShowcaseProps {
  rocket: Rocket;
}

/**
 * Homepage "closer look" at the flagship rocket (whichever leads `rockets.ts`):
 * an exploded view broken out subsystem by subsystem, each row pairing the
 * rocket's description of that subsystem with a live 3D view of the exploded
 * model framed on its parts (lit, neighbours ghosted for context). All rows
 * draw into one shared WebGL canvas. Subsystems with no separately modelled
 * parts, or a rocket with no model, render as text-only rows.
 */
export function RocketSubsystemShowcase({ rocket }: RocketSubsystemShowcaseProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { ref: inViewRef, inView } = useInView({
    rootMargin: "400px 0px",
    onChange: (visible) => {
      if (visible) setMounted(true);
    },
  });

  useEffect(() => {
    const cleanup = rocketSubsystemShowcaseAnimation({ root: rootRef, rows: rowsRef });
    return cleanup;
  }, []);

  if (rocket.components.every((c) => c.description === "Description — TBD")) {
    return null;
  }

  const { model } = rocket;

  return (
    <div ref={rootRef} className={styles.showcase}>
      <p className={styles.eyebrow}>{rocket.name} — Exploded View</p>
      <div
        ref={(el) => {
          rowsRef.current = el;
          inViewRef(el);
        }}
        className={styles.rows}
        data-has-model={Boolean(model)}
      >
        {rocket.components.map((component) => {
          const modelled = Boolean(model?.partGroups[component.id]);
          return (
            <div key={component.id} className={styles.row}>
              {model && (
                <div className={styles.visual} data-empty={!modelled}>
                  {modelled ? (
                    mounted && <RocketPartView model={model} subsystemId={component.id} className={styles.view} />
                  ) : (
                    <span className={styles.notModelled}>Not shown in the 3D model</span>
                  )}
                </div>
              )}
              <div className={styles.text}>
                <h3 className={styles.title}>{component.name}</h3>
                <p className={styles.description}>{component.description}</p>
              </div>
            </div>
          );
        })}
      </div>
      {model && mounted && <RocketViewsCanvas active={inView} />}
    </div>
  );
}
