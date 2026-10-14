import { Mail, MapPin, Phone } from "lucide-react";
import { CopyableMailLink } from "./CopyableMailLink";
import { CONTACT_EMAIL, contactInfo } from "@/data/navigation";
import styles from "./ContactDetails.module.css";

/**
 * How to reach the team — the email (click copies it too) and the team
 * captain's phone. Used instead of forms on the Contact, Join and Sponsors pages.
 */
export function ContactDetails({ showAddress = false }: { showAddress?: boolean }) {
  return (
    <div className={styles.details}>
      <CopyableMailLink email={CONTACT_EMAIL} className={styles.row}>
        <Mail size={18} aria-hidden="true" />
        {CONTACT_EMAIL}
      </CopyableMailLink>
      <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className={styles.row}>
        <Phone size={18} aria-hidden="true" />
        {contactInfo.phoneLabel && <span className={styles.label}>{contactInfo.phoneLabel}</span>}
        {contactInfo.phone}
      </a>
      {showAddress && (
        <span className={styles.row}>
          <MapPin size={18} aria-hidden="true" />
          {contactInfo.addressLines.join(", ")}
        </span>
      )}
    </div>
  );
}
