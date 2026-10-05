"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { GalleryItem } from "@/types";
import styles from "./Lightbox.module.css";

export interface LightboxProps {
  item: GalleryItem | null;
  onClose: () => void;
}

/** Full-size image/video viewer for Gallery, built on the shared Radix Dialog primitive. */
export function Lightbox({ item, onClose }: LightboxProps) {
  return (
    <Dialog open={Boolean(item)} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={styles.content}>
        <DialogTitle className={styles.srOnly}>{item?.alt ?? "Media viewer"}</DialogTitle>
        {item?.type === "video" ? (
          <video className={styles.media} src={item.src} controls autoPlay />
        ) : item ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className={styles.media} src={item.src} alt={item.alt} />
        ) : null}
        {item?.caption && <p className={styles.caption}>{item.caption}</p>}
      </DialogContent>
    </Dialog>
  );
}
