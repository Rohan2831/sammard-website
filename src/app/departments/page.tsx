import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DepartmentCard } from "@/components/sections/departments";
import { departments } from "@/data/departments";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Departments — Team SAMMARD",
  description: "Team SAMMARD's technical departments.",
};

export default function DepartmentsPage() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Departments"
        description="Five technical divisions that build, test, and fly everything Team SAMMARD makes."
      />
      <div className={styles.list}>
        {departments.map((department, index) => (
          <DepartmentCard key={department.id} department={department} index={index} />
        ))}
      </div>
    </section>
  );
}
