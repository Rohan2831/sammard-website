import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { GalleryGrid } from "@/components/sections/gallery";
import { galleryCategories } from "@/data/gallery";
import { readMediaList } from "@/lib/medialist";
import type { GalleryItem } from "@/types";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Gallery — Team SAMMARD",
  description: "Photos and videos from Team SAMMARD's launches, testing, and competitions.",
};

export default function GalleryPage() {
  const items: GalleryItem[] = readMediaList("gallery").map(({ src, type, alt, extra }) => {
    const category = galleryCategories.find((c) => c.toLowerCase() === extra[0]?.toLowerCase());
    return { id: src, src, type, alt, category: category ?? "Behind the Scenes" };
  });

  return (
    <section className={styles.section}>
      <SectionHeader heading="Gallery" />
      <GalleryGrid items={items} />
    </section>
  );
}
