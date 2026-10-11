import { SwapImage } from "./SwapImage";
import { SwapVideo } from "./SwapVideo";
import styles from "./MediaCard.module.css";

export interface MediaCardProps {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
  onClick?: () => void;
}

/** Generic image/video card. Generalizes the image-or-video branching used by actioncard.tsx for reuse across Gallery/Events/Departments. */
export function MediaCard({ type, src, alt, caption, onClick }: MediaCardProps) {
  // A fixed 4:3 frame: whatever size or shape the file is, it's cropped to fit.
  const media = (
    <span className={styles.frame}>
      {type === "video" ? (
        <SwapVideo src={src} className={styles.media} aria-label={alt} />
      ) : (
        <SwapImage src={src} alt={alt} sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className={styles.media} />
      )}
    </span>
  );

  if (onClick) {
    return (
      <button type="button" className={styles.card} onClick={onClick}>
        {media}
        {caption && <p className={styles.caption}>{caption}</p>}
      </button>
    );
  }

  return (
    <div className={styles.card}>
      {media}
      {caption && <p className={styles.caption}>{caption}</p>}
    </div>
  );
}
