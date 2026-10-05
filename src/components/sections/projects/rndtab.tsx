import { rndProjects } from "@/data/rnd";
import { RndCard } from "./rndcard";
import styles from "./rndtab.module.css";

export function RndTab() {
  return (
    <div className={styles.grid}>
      {rndProjects.map((project) => (
        <RndCard key={project.id} project={project} />
      ))}
    </div>
  );
}
