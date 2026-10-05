import styles from "./SectionHeader.module.css";

export interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  heading,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div className={styles.header} data-align={align}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h2 className={styles.heading}>{heading}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
