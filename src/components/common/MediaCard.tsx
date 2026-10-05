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
  const media =
    type === "video" ? (
      <video className={styles.media} muted loop playsInline autoPlay>
        <source src={src} type="video/mp4" />
      </video>
    ) : (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className={styles.media} loading="lazy" />
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
