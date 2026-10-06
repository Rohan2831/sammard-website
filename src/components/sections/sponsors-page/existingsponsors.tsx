import { SectionHeader } from "@/components/common/SectionHeader";
import { SponsorList } from "@/components/common/SponsorList";
import { sponsors } from "@/data/sponsors";
import styles from "./existingsponsors.module.css";

// Grouped by real tier, not the forward-looking Gold/Silver/Bronze package
// names — the live site only distinguishes "Platinum" (Convergent) from a
// generic "Partners" tier for its current sponsors (see sponsors.ts).
const platinumSponsors = sponsors.filter((s) => s.tier === "platinum");
const partnerSponsors = sponsors.filter((s) => s.tier !== "platinum");

export function ExistingSponsors() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Existing Sponsors" />

      {platinumSponsors.length > 0 && (
        <div className={styles.tierGroup}>
          <p className={styles.tierLabel}>Platinum Sponsor</p>
          <SponsorList sponsors={platinumSponsors} />
        </div>
      )}

      {partnerSponsors.length > 0 && (
        <div className={styles.tierGroup}>
          <p className={styles.tierLabel}>Partners</p>
          <SponsorList sponsors={partnerSponsors} />
        </div>
      )}
    </section>
  );
}
