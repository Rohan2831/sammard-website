"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
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
  shift,
}: RocketViewer3DProps) {
  // Mount the canvas the first time the viewer nears the viewport, then keep it mounted
  // (`inView` alone only pauses rendering, so scrolling back doesn't reload the model).
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    rootMargin: "300px 0px",
    onChange: (visible) => {
      if (visible) setMounted(true);
    },
  });
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
            shift={shift}
            active={inView}
            onReady={handleReady}
          />
        </div>
      )}
    </div>
  );
}
