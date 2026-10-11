import { cansats } from "@/data/cansats";
import { SwapImage } from "@/components/common/SwapImage";
import styles from "./tabs.module.css";

export function CanSatsTab() {
  return (
    <div className={styles.list}>
      {cansats.map((cansat) => (
        <div className={styles.card} key={cansat.id} data-has-image={Boolean(cansat.image)}>
          {cansat.image && (
            <div className={styles.imageWrap}>
              <SwapImage src={cansat.image} alt={cansat.imageAlt ?? cansat.name} sizes="(min-width: 768px) 280px, 100vw" />
            </div>
          )}
          <div>
          <h3 className={styles.title}>{cansat.name}</h3>
          <dl className={styles.grid}>
            <div>
              <dt>Mission</dt>
              <dd>{cansat.mission}</dd>
            </div>
            <div>
              <dt>Payload</dt>
              <dd>{cansat.payload}</dd>
            </div>
            <div>
              <dt>Electronics</dt>
              <dd>{cansat.electronics}</dd>
            </div>
            <div>
              <dt>Results</dt>
              <dd>{cansat.results}</dd>
            </div>
          </dl>
          </div>
        </div>
      ))}
    </div>
  );
}
