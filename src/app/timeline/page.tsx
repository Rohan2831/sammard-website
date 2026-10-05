import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { Timeline } from "@/components/sections/timeline";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Timeline — Team SAMMARD",
  description: "Team SAMMARD's journey, milestone by milestone.",
};

export default function TimelinePage() {
  return (
    <>
      <div className={styles.header}>
        <SectionHeader
          heading="Timeline"
          description="Team SAMMARD is approaching its 10-year milestone — here's the journey so far."
        />
      </div>
      <Timeline />
    </>
  );
}
