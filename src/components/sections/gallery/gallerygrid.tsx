"use client";

import { useMemo, useState } from "react";
import { MediaCard } from "@/components/common/MediaCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Lightbox } from "@/components/common/Lightbox";
import { galleryCategories } from "@/data/gallery";
import type { GalleryItem } from "@/types";
import styles from "./gallerygrid.module.css";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [category, setCategory] = useState<GalleryItem["category"] | "All">("All");
  const [active, setActive] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (category === "All" ? items : items.filter((item) => item.category === category)),
    [category, items]
  );

  return (
    <div>
      <div className={styles.filters}>
        <button
          type="button"
          className={styles.filter}
          data-active={category === "All"}
          onClick={() => setCategory("All")}
        >
          All
        </button>
        {galleryCategories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={styles.filter}
            data-active={category === cat}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <MediaCard key={item.id} type={item.type} src={item.src} alt={item.alt} onClick={() => setActive(item)} />
          ))}
        </div>
      ) : (
        <EmptyState title="No items yet in this category" description="Check back as more media is added." />
      )}

      <Lightbox item={active} onClose={() => setActive(null)} />
    </div>
  );
}
