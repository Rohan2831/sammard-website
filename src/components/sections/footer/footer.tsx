"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import styles from "./footer.module.css";
import { CopyableMailLink } from "@/components/common/CopyableMailLink";
import type { NavLink as QuickLink, SocialLink } from "@/types";
import {
  quickLinks as QUICK_LINKS,
  socialLinks as SOCIAL_LINKS,
  CONTACT_EMAIL,
  contactInfo,
} from "@/data/navigation";
import { footerAnimation } from "@/animations/footer";

export interface FooterProps {
  logoText?: string;
  motto?: string;
  quickLinks?: QuickLink[];
  socialLinks?: SocialLink[];
  contactEmail?: string;
  year?: number;
}

/**
 * Footer
 * Site-wide footer with logo/motto, quick links, contact + socials, and
 * a bottom copyright bar. CSS Modules only — no Tailwind, no inline
 * styles, no GSAP logic yet.
 *
 * GSAP-ready: data-gsap hooks are placed on the footer, logo, quick
 * links block, contact block, socials block, and the bottom copyright
 * bar so a future timeline can be wired in without any markup changes.
 */
export default function Footer({
  logoText = "TEAM SAMMARD",
  motto = "Give Your Dreams Some Space To Unfold",
  quickLinks = QUICK_LINKS,
  socialLinks = SOCIAL_LINKS,
  contactEmail = CONTACT_EMAIL,
  year = new Date().getFullYear(),
}: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = footerAnimation({
      root: footerRef,
      logo: logoRef,
      quickLinks: quickLinksRef,
      socials: socialsRef,
    });
    return cleanup;
  }, []);

  return (
    <footer ref={footerRef} className={styles.footer} data-gsap="footer">
      <div ref={logoRef} className={styles.top} data-gsap="footer-logo">
  <Link href="/" className={styles.logo}>
    <Image
      src="/assets/logos/Logo.png"
      alt="Team SAMMARD Logo"
      width={70}
      height={70}
      className={styles.logoImage}
    />

    <div className={styles.logoText}>
      <h2>{logoText}</h2>
      <p className={styles.motto}>{motto}</p>
    </div>
  </Link>
</div>

      <div className={styles.middle}>
        <nav
          ref={quickLinksRef}
          className={styles.quickLinks}
          data-gsap="footer-quick-links"
          aria-label="Quick links"
        >
          <h3 className={styles.columnHeading}>Quick Links</h3>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.contact} data-gsap="footer-contact">
          <h3 className={styles.columnHeading}>Contact</h3>
          <CopyableMailLink email={contactEmail} className={styles.link}>
            <Mail size={16} className={styles.icon} aria-hidden="true" />
            {contactEmail}
          </CopyableMailLink>
          <a href={`tel:${contactInfo.phone}`} className={styles.link}>
            <Phone size={16} className={styles.icon} aria-hidden="true" />
            {contactInfo.phone}
          </a>
          <span className={styles.link}>
            <MapPin size={16} className={styles.icon} aria-hidden="true" />
            {contactInfo.addressLines.join(", ")}
          </span>
        </div>

        <div ref={socialsRef} className={styles.socials} data-gsap="footer-socials">
          <h3 className={styles.columnHeading}>Follow Us</h3>
          <ul className={styles.socialList}>
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={label}
                >
                  <Icon size={20} className={styles.icon} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.bottom} data-gsap="footer-bottom">
        <p className={styles.bottomText}>
          © {year} Team SAMMARD. All Rights Reserved.
        </p>
        <p className={styles.bottomText}>
          Designed &amp; Developed by Team SAMMARD.
        </p>
      </div>
    </footer>
  );
}