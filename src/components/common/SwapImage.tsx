"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export type SwapImageProps = Omit<ImageProps, "fill" | "onError"> & {
  /** "cover" crops to fill the frame (photos); "contain" fits inside it (logos, renders). */
  fit?: "cover" | "contain";
};

/**
 * Every swappable photo goes through this, so a replaced file can be any size
 * or shape: it fills its (positioned, fixed-aspect) parent and is cropped or
 * letterboxed to fit, Next/Vercel resize and recompress it for the screen, and
 * a missing or misnamed file simply disappears (leaving the frame's background)
 * instead of showing a broken-image icon.
 */
export function SwapImage({ fit = "cover", style, alt, ...props }: SwapImageProps) {
  const [missing, setMissing] = useState(false);
  if (missing) return null;
  return <Image {...props} alt={alt} fill style={{ objectFit: fit, ...style }} onError={() => setMissing(true)} />;
}
