import { Plus } from "lucide-react";
import styles from "./expandbutton.module.css";

/** The round "+" on a project card's image; turns into "×" while the card is open. */
export function ExpandButton({
  expanded,
  label,
  onToggle,
}: {
  expanded: boolean;
  /** What the card is about, for the accessible "Expand/Collapse … details" label. */
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={`${expanded ? "Collapse" : "Expand"} ${label} details`}
    >
      <Plus className={styles.icon} data-expanded={expanded} size={20} />
    </button>
  );
}
