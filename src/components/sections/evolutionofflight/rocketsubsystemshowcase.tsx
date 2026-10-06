"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import { RocketViewer3D } from "@/components/common/RocketViewer3D";
import type { Shift } from "@/components/common/RocketModelCanvas";
import { rocketSubsystemShowcaseAnimation } from "@/animations/rocketsubsystemshowcase";
import type { Rocket, RocketModel } from "@/types";
import styles from "./rocketsubsystemshowcase.module.css";

export interface RocketSubsystemShowcaseProps {
  rocket: Rocket;
}

// Scroll choreography, in "units" of the track (each unit is 80svh of scrolling):
// 0–0.5 the assembled rocket, 0.5–1.5 it explodes, then one unit per subsystem.
const EXPLODE_START = 0.5;
const FIRST_SUBSYSTEM = 1.5;
// The rocket stands nose-up, centred on desktop (per the team); on mobile it's
// lifted above the text, which sits at the bottom of the screen there.
const SHIFT_DESKTOP: Shift = [0, 0];
const SHIFT_MOBILE: Shift = [0, 0.4];

const DESKTOP_QUERY = "(min-width: 900px)";
const subscribeDesktop = (onChange: () => void) => {
  const query = window.matchMedia(DESKTOP_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};

const pad = (n: number) => String(n).padStart(2, "0");

const isModelled = (model: RocketModel, subsystemId: string) =>
  Boolean(model.partGroups[subsystemId]) || Boolean(model.attachments?.some((a) => a.group === subsystemId));

/**
 * Homepage "closer look" at the flagship rocket (whichever leads `rockets.ts`),
 * modelled on cornellrocketryteam.com: a pinned full-screen stage where the
 * assembled, liveried rocket (standing nose-up) explodes as you scroll, then the
 * camera glides to each subsystem in turn, nose to tail (the order of
 * `rocket.components`), while its description fades up beside it.
 * Subsystems with no modelled parts keep the whole exploded rocket in view and
 * say so. A rocket with no model gets a plain list.
 */
export function RocketSubsystemShowcase({ rocket }: RocketSubsystemShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const explodeRef = useRef(0);
  const [active, setActive] = useState(-1);
  const isDesktop = useSyncExternalStore(
    subscribeDesktop,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true
  );
  const { model, components } = rocket;
  const units = components.length + 2;

  const handleProgress = useCallback(
    (progress: number) => {
      const t = progress * units;
      const e = Math.min(Math.max(t - EXPLODE_START, 0), 1);
      explodeRef.current = e * e * (3 - 2 * e);
      setActive(t < FIRST_SUBSYSTEM ? -1 : Math.min(components.length - 1, Math.floor(t - FIRST_SUBSYSTEM)));
    },
    [units, components.length]
  );

  useEffect(() => {
    if (!model) return;
    return rocketSubsystemShowcaseAnimation({ root: trackRef }, handleProgress);
  }, [model, handleProgress]);

  if (components.every((c) => c.description === "Description — TBD")) {
    return null;
  }

  if (!model) {
    return (
      <div className={styles.fallback}>
        <p className={styles.eyebrow}>{rocket.name} — Subsystems</p>
        <ol className={styles.list}>
          {components.map((c) => (
            <li key={c.id}>
              <h3 className={styles.title}>{c.name}</h3>
              <p className={styles.description}>{c.description}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  const shift = isDesktop ? SHIFT_DESKTOP : SHIFT_MOBILE;

  return (
    <div ref={trackRef} className={styles.track} style={{ "--units": units } as CSSProperties}>
      <div className={styles.stage}>
        <div className={styles.model}>
          <RocketViewer3D
            rocket={rocket}
            orientation="vertical"
            explode={explodeRef}
            activeSubsystemId={active < 0 ? null : components[active].id}
            focus
            shift={shift}
            navigable
          />
        </div>

        <p className={styles.controlsHint} aria-hidden="true">
          <span className={styles.hintDesktop}>Drag to rotate · Right-drag to pan · Ctrl/⌘ + scroll to zoom · Double-click to reset</span>
          <span className={styles.hintTouch}>Pinch to zoom · Two fingers to pan · Double-tap to reset</span>
        </p>

        <div className={styles.intro} data-active={active < 0}>
          <p className={styles.eyebrow}>{rocket.name} — Exploded View</p>
          <p className={styles.hint}>Scroll to take it apart</p>
        </div>

        <ol className={styles.steps}>
          {components.map((c, i) => (
            <li key={c.id} className={styles.step} data-active={i === active} aria-current={i === active || undefined}>
              <p className={styles.count}>
                {pad(i + 1)} / {pad(components.length)}
              </p>
              <h3 className={styles.title}>{c.name}</h3>
              <p className={styles.description}>{c.description}</p>
              {!isModelled(model, c.id) && <p className={styles.note}>Not shown in the 3D model</p>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
