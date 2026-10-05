import { SectionHeader } from "@/components/common/SectionHeader";
import { StatCounter } from "@/components/common/StatCounter";
import styles from "./whysponsor.module.css";

export function WhySponsor() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Why Sponsor Team SAMMARD"
        description="Since 2017, Team Sammard has continued to grow and explore new frontiers, building meaningful connections with industry leaders who share our interest in advancing aerospace technology. Working with us offers companies an opportunity to engage directly with new student R&D ideas, see them applied in real flight environments, and connect with a team developing practical expertise. For us, these partnerships are opportunities to learn, build, and grow alongside the aerospace industry."
      />
      <div className={styles.stats}>
        <StatCounter value={5} label="Competitions" />
        <StatCounter value={6} label="Sponsors backing the team" />
      </div>
    </section>
  );
}
