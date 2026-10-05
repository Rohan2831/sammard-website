import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/common/ContactForm";
import { departments } from "@/data/departments";
import { CONTACT_EMAIL } from "@/data/navigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Join Us — Team SAMMARD",
  description: "Join Team SAMMARD, a student-led aerospace engineering team at VIT Vellore.",
};

export default function JoinPage() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Join Team SAMMARD"
        description="We're a student-led aerospace team building real hardware — rockets, payloads, CanSats — and we're always looking for people who want to learn by building. Pick a department below and tell us about yourself."
      />

      <div className={styles.departments}>
        {departments.map((department) => (
          <Link key={department.id} href="/departments" className={styles.deptLink}>
            {department.name}
          </Link>
        ))}
      </div>

      <ContactForm
        recipientEmail={CONTACT_EMAIL}
        subject="Recruitment Application"
        submitLabel="Send Application"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "yearBranch", label: "Year / Branch", type: "text" },
          { name: "department", label: "Department Interest", type: "text" },
          { name: "message", label: "Why do you want to join?", type: "textarea" },
        ]}
      />
    </section>
  );
}
