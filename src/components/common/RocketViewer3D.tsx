"use client";

import dynamic from "next/dynamic";
import { useCallback, useState, type RefObject } from "react";
import { useInView } from "react-intersection-observer";
import type { Rocket } from "@/types";
import type { ExplodeSource, Shift } from "./RocketModelCanvas";
import styles from "./RocketViewer3D.module.css";

const RocketModelCanvas = dynamic(() => import("./RocketModelCanvas").then((m) => m.RocketModelCanvas), {
  ssr: false,
});

export interface RocketViewer3DProps {
  rocket: Rocket;
  orientation?: "vertical" | "horizontal";
  /** RocketComponent id to emphasise; other parts dim. */
  activeSubsystemId?: string | null;
  /** 0 = assembled, 1 = fully exploded. A ref is read every frame (for scroll-driven values). */
  explode?: ExplodeSource;
  interactive?: boolean;
  /** Rotate, pan and zoom without taking over page scroll (see RocketModelCanvas). */
  navigable?: boolean;
  /** Zoom the camera in on the active subsystem. */
  focus?: boolean;
  /** 0–1 how far in on the active subsystem, read every frame (scroll-driven zoom). */
  focusAmount?: RefObject<number>;
  shift?: Shift;
}

/**
 * Shows the rocket's .glb (three.js via React Three Fiber) when it has one,
 * otherwise its livery render or photo. The 3D bundle and model are only
 * fetched once the viewer nears the viewport; the image stays visible
 * underneath until the model is ready, then cross-fades out.
 */
export function RocketViewer3D({
  rocket,
  orientation = "vertical",
  activeSubsystemId = null,
  explode = 0,
  interactive = false,
  navigable = false,
  focus = false,
  focusAmount,
  shift,
}: RocketViewer3DProps) {
  // Mount the canvas well before the viewer reaches the viewport (1500px ahead — on the
  // homepage that's during page load), so downloading, decoding and building the
  // model is done before the visitor scrolls to it, and keep it mounted. Rendering
  // runs only while it's actually on screen (`inView`), so it costs nothing otherwise.
  const [mounted, setMounted] = useState(false);
  const { ref: mountRef } = useInView({
    rootMargin: "1500px 0px",
    onChange: (near) => {
      if (near) setMounted(true);
    },
  });
  const { ref: viewRef, inView } = useInView({ rootMargin: "50px 0px" });
  const ref = useCallback(
    (el: HTMLDivElement | null) => {
      mountRef(el);
      viewRef(el);
    },
    [mountRef, viewRef]
  );
  const [ready, setReady] = useState(false);
  const handleReady = useCallback(() => setReady(true), []);

  const imageSrc = rocket.render?.[orientation] ?? rocket.heroImage;

  return (
    <div ref={ref} className={styles.viewer} data-ready={ready}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={rocket.name}
        className={styles.image}
        data-kind={rocket.render ? "render" : "photo"}
      />
      {rocket.model && mounted && (
        <div className={styles.canvas}>
          <RocketModelCanvas
            model={rocket.model}
            orientation={orientation}
            activeSubsystemId={activeSubsystemId}
            explode={explode}
            interactive={interactive}
            navigable={navigable}
            focus={focus}
            focusAmount={focusAmount}
            shift={shift}
            active={inView}
            onReady={handleReady}
          />
        </div>
      )}
    </div>
  );
}
