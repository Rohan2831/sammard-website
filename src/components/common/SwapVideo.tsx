"use client";

import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";
import { useInView } from "react-intersection-observer";

type SwapVideoProps = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> & {
  src: string;
};

/**
 * A muted, looping background video that stays cheap however big the file
 * dropped into its slot is: nothing downloads until it nears the viewport, it
 * plays only while visible, and a missing file disappears instead of leaving a
 * broken player. Style it to fill a fixed-aspect frame with object-fit: cover,
 * so any resolution or aspect ratio fits.
 */
export function SwapVideo({ src, ...props }: SwapVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [requested, setRequested] = useState(false);
  const [missing, setMissing] = useState(false);
  const { ref, inView } = useInView({
    rootMargin: "300px 0px",
    onChange: (visible) => {
      if (visible) setRequested(true);
    },
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !requested) return;
    if (inView) video.play().catch(() => {});
    else video.pause();
  }, [inView, requested]);

  if (missing) return null;
  return (
    <video
      {...props}
      ref={(el) => {
        videoRef.current = el;
        ref(el);
      }}
      src={requested ? src : undefined}
      muted
      loop
      playsInline
      preload="none"
      onError={() => setMissing(true)}
    />
  );
}
