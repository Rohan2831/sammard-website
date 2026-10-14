import { SectionHeader } from "@/components/common/SectionHeader";
import { DownloadButton } from "@/components/common/DownloadButton";
import { ContactDetails } from "@/components/common/ContactDetails";
import styles from "./becomeasponsor.module.css";

export function BecomeASponsor() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading={"Partner with Team SAMMARD"}
        description="Email us or call our team captain about your company and sponsorship interest — we'll follow up with the right package details."
      />

      <div className={styles.brochure}>
        <DownloadButton label="Sponsorship Brochure" href="/assets/sponsors/team-sammard-brochure.pdf" />
      </div>

      <ContactDetails />
    </section>
  );
}
