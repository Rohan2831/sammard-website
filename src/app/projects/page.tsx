import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProjectsTabs } from "@/components/sections/projects";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects — Team SAMMARD",
  description: "Rockets, CanSats, and research & development from Team SAMMARD.",
};

export default function ProjectsPage() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Projects"
        description="Every rocket, CanSat, and research effort the team has built."
      />
      <ProjectsTabs />
    </section>
  );
}
