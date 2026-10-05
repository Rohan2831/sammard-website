import { socialLinks } from "@/data/navigation";
import styles from "./SocialLinks.module.css";

export interface SocialLinksProps {
  size?: number;
}

export function SocialLinks({ size = 20 }: SocialLinksProps) {
  return (
    <ul className={styles.list}>
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
            aria-label={label}
          >
            <Icon size={size} />
          </a>
        </li>
      ))}
    </ul>
  );
}
