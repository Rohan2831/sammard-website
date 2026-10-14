import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactDetails } from "@/components/common/ContactDetails";
import { departments } from "@/data/departments";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Join Us — Team SAMMARD",
  description: "Join Team SAMMARD, a student-led aerospace engineering team at VIT Vellore.",
};

export default function JoinPage() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading={"Join Team SAMMARD"}
        description="We're a student-led aerospace team building real hardware — rockets, payloads, CanSats — and we're always looking for people who want to learn by building. Pick a department below, then email us or call our team captain to apply."
      />

      <div className={styles.departments}>
        {departments.map((department) => (
          <Link key={department.id} href="/departments" className={styles.deptLink}>
            {department.name}
          </Link>
        ))}
      </div>

      <ContactDetails />
    </section>
  );
}
