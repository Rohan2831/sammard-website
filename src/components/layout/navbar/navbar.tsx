"use client";

import { useEffect, useRef } from "react";

import styles from "./navbar.module.css";
import { Logo } from "./logo";
import { DesktopNav } from "./desktopnav";
import { MobileNav } from "./mobilenav";
import { CopyableMailLink } from "@/components/common/CopyableMailLink";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { navbarAnimation } from "@/animations/navbar";
import { socialLinks, CONTACT_EMAIL } from "@/data/navigation";

const instagramHref = socialLinks.find((s) => s.label === "Instagram")?.href ?? "#";

export default function Navbars() {
  const navbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cleanup = navbarAnimation({
      root: navbarRef,
    });

    return cleanup;
  }, []);

  return (
    <header ref={navbarRef} className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.navigation}>
          <DesktopNav />
        </div>

        <div className={styles.rightSection}>
          <a
            href={instagramHref}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
          >
            <FaInstagram size={24} />
          </a>

          <CopyableMailLink email={CONTACT_EMAIL} className={styles.icon}>
            <Mail size={24} />
          </CopyableMailLink>
        </div>

        <div className={styles.mobile}>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}