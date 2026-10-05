import { SectionHeader } from "@/components/common/SectionHeader";
import { sponsorshipPackages } from "@/data/sponsors";
import styles from "./packages.module.css";

export function SponsorshipPackages() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Sponsorship Tiers"
        description="Tier names below are set — exact benefits are still being finalized with our sponsorship lead."
        align="left"
      />
      <div className={styles.list}>
        {sponsorshipPackages.map((pkg, index) => (
          <div className={styles.column} key={pkg.tier} data-tier={pkg.tier}>
            <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
            <h3 className={styles.title}>{pkg.title}</h3>
            <ul className={styles.benefits}>
              {pkg.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
