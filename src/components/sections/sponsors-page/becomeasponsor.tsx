import { SectionHeader } from "@/components/common/SectionHeader";
import { DownloadButton } from "@/components/common/DownloadButton";
import { ContactForm } from "@/components/common/ContactForm";
import { CONTACT_EMAIL } from "@/data/navigation";
import styles from "./becomeasponsor.module.css";

export function BecomeASponsor() {
  return (
    <section className={styles.section}>
      <SectionHeader
        heading="Partner With Team SAMMARD"
        description="Tell us about your company and sponsorship interest — we'll follow up with the right package details."
      />

      <div className={styles.brochure}>
        <DownloadButton label="Sponsorship Brochure" href="/assets/sponsors/team-sammard-brochure.pdf" />
      </div>

      <ContactForm
        recipientEmail={CONTACT_EMAIL}
        subject="Sponsorship Inquiry"
        submitLabel="Send Inquiry"
        fields={[
          { name: "companyName", label: "Company Name", type: "text" },
          { name: "repName", label: "Representative Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone", type: "tel", required: false },
          {
            name: "interest",
            label: "Sponsorship Interest",
            type: "select",
            options: ["Platinum", "Gold", "Silver", "Bronze", "Not sure yet"],
          },
          { name: "message", label: "Message", type: "textarea" },
        ]}
      />
    </section>
  );
}
