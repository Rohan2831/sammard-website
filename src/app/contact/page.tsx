import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ContactForm } from "@/components/common/ContactForm";
import { SocialLinks } from "@/components/common/SocialLinks";
import { CopyableMailLink } from "@/components/common/CopyableMailLink";
import { CONTACT_EMAIL, contactInfo } from "@/data/navigation";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact — Team SAMMARD",
  description: "Get in touch with Team SAMMARD.",
};

export default function ContactPage() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Contact" />

      <div className={styles.details}>
        <CopyableMailLink email={CONTACT_EMAIL} className={styles.detailRow}>
          <Mail size={18} />
          {CONTACT_EMAIL}
        </CopyableMailLink>
        <a href={`tel:${contactInfo.phone}`} className={styles.detailRow}>
          <Phone size={18} />
          {contactInfo.phone}
        </a>
        <span className={styles.detailRow}>
          <MapPin size={18} />
          {contactInfo.addressLines.join(", ")}
        </span>
      </div>

      <SocialLinks size={22} />

      <ContactForm
        recipientEmail={CONTACT_EMAIL}
        subject="Website Contact"
        submitLabel="Send Message"
        fields={[
          { name: "name", label: "Name", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "subject", label: "Subject", type: "text" },
          { name: "message", label: "Message", type: "textarea" },
        ]}
      />
    </section>
  );
}
