import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EmptyState } from "@/components/common/EmptyState";
import { DownloadButton } from "@/components/common/DownloadButton";
import { documents } from "@/data/documents";
import type { DocumentResource } from "@/types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Documentation — Team SAMMARD",
  description: "Technical reports, research papers, and publications from Team SAMMARD.",
};

const CATEGORIES: DocumentResource["category"][] = [
  "Technical Report",
  "Design Report",
  "Flight Report",
  "Post-Flight Report",
  "Research Paper",
  "Publication",
  "Patent",
];

export default function DocumentationPage() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Documentation" />
      <div className={styles.list}>
        {CATEGORIES.map((category) => {
          const items = documents.filter((doc) => doc.category === category);
          return (
            <div className={styles.block} key={category}>
              <h3 className={styles.heading}>{category}s</h3>
              {items.length > 0 ? (
                <div className={styles.downloads}>
                  {items.map((doc) => (
                    <DownloadButton key={doc.id} label={doc.title} href={doc.fileUrl} />
                  ))}
                </div>
              ) : (
                <EmptyState title="Coming soon" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
