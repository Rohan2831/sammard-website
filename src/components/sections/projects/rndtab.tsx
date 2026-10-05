import { rndProjects } from "@/data/rnd";
import styles from "./tabs.module.css";

export function RndTab() {
  return (
    <div className={styles.list}>
      {rndProjects.map((project) => (
        <div className={styles.card} key={project.id}>
          <p className={styles.eyebrow}>{project.category}</p>
          <h3 className={styles.title}>{project.title}</h3>
          <p className={styles.description}>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
