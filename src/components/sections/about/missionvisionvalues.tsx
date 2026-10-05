import { SectionHeader } from "@/components/common/SectionHeader";
import { aboutMissionCopy } from "@/data/about";
import styles from "./missionvisionvalues.module.css";

const CARDS = [
  { title: "Mission", body: aboutMissionCopy.mission },
  { title: "Vision", body: aboutMissionCopy.vision },
  { title: "Core Values", body: aboutMissionCopy.values },
];

export function MissionVisionValues() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Mission, Vision & Values" />
      <div className={styles.grid}>
        {CARDS.map((card) => (
          <div className={styles.card} key={card.title}>
            <h3 className={styles.title}>{card.title}</h3>
            <p className={styles.body}>{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
