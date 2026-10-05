import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GalleryGrid } from "@/components/sections/gallery";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery — Team SAMMARD",
  description: "Photos and videos from Team SAMMARD's launches, testing, and competitions.",
};

export default function GalleryPage() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Gallery" />
      <GalleryGrid />
    </section>
  );
}
