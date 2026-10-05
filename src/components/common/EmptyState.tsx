import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  title: string;
  description?: string;
}

/** Honest "nothing here yet" state — used instead of padding pages with fabricated content. */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className={styles.empty}>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
