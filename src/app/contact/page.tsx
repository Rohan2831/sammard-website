import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { SocialLinks } from "@/components/common/SocialLinks";
import { ContactDetails } from "@/components/common/ContactDetails";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact — Team SAMMARD",
  description: "Get in touch with Team SAMMARD.",
};

export default function ContactPage() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Contact" description="Email the team, or call our team captain." />
      <ContactDetails showAddress />
      <SocialLinks size={22} />
    </section>
  );
}
