import { SwapImage } from "@/components/common/SwapImage";
import { SectionHeader } from "@/components/common/SectionHeader";
import styles from "./ourlegacy.module.css";

export function OurLegacy() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Our Legacy"
        description="Since its inception, Team Sammard has been shaped by visionary leaders whose dedication and achievements continue to inspire. Each board has built on the last, driving innovation, collaboration, and excellence — laying the foundation for our journey ahead."
      />
      <div className={styles.gallery}>
        <div className={styles.imageWrap}>
          <SwapImage src="/assets/about/legacy-1.jpg" alt="Team SAMMARD" sizes="(min-width: 768px) 50vw, 100vw" className={styles.image} />
        </div>
        <div className={styles.imageWrap}>
          <SwapImage src="/assets/about/legacy-2.jpg" alt="Team SAMMARD at work" sizes="(min-width: 768px) 50vw, 100vw" className={styles.image} />
        </div>
      </div>
    </section>
  );
}
