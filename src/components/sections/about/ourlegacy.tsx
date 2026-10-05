import Image from "next/image";
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
          <Image src="/assets/images/teampic1.JPG" alt="Team SAMMARD" fill sizes="50vw" className={styles.image} />
        </div>
        <div className={styles.imageWrap}>
          <Image src="/assets/images/teampic2.JPG" alt="Team SAMMARD at work" fill sizes="50vw" className={styles.image} />
        </div>
      </div>
    </section>
  );
}
