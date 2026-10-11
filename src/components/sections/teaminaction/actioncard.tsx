import { SwapImage } from "@/components/common/SwapImage";
import { SwapVideo } from "@/components/common/SwapVideo";
import styles from "./actioncard.module.css";

export interface ActionCardProps {
  /** Card title, e.g. "Launches" */
  title: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  /** Alt text for the media content */
  imageAlt: string;
  /** Optional index, useful for staggered GSAP timelines later */
  index?: number;
}

/**
 * ActionCard
 * A single image-backed card used inside the TeamInAction grid.
 * No description text — title only, bottom-left aligned.
 *
 * GSAP-ready: every major element carries a data-gsap hook so a future
 * timeline can target them without touching this markup again.
 */
export default function ActionCard({
  title,
  mediaType,
  mediaSrc,
  imageAlt,
  index,
}: ActionCardProps) {
  return (
    <div
      className={styles.card}
      data-gsap="action-card"
      data-gsap-index={index}
    >
      {mediaType === "video" ? (
        <SwapVideo src={mediaSrc} className={styles.image} data-gsap="action-card-video" />
      ) : (
        <SwapImage
          src={mediaSrc}
          alt={imageAlt}
          sizes="(min-width: 900px) 50vw, 100vw"
          className={styles.image}
          data-gsap="action-card-image"
        />
      )}

      <div className={styles.overlay} data-gsap="action-card-overlay" />

      <h3 className={styles.title} data-gsap="action-card-title">
        {title}
      </h3>
    </div>
  );
}