import { cansats } from "@/data/cansats";
import styles from "./tabs.module.css";

export function CanSatsTab() {
  return (
    <div className={styles.list}>
      {cansats.map((cansat) => (
        <div className={styles.card} key={cansat.id}>
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
      ))}
    </div>
  );
}
