import Link from "next/link";

import styles from "./navbar.module.css";
import { Button } from "@/components/ui/button";
import { Logo }  from "./logo";
import { DesktopNav } from "./desktopnav";
import { MobileNav } from "./mobilenav";
import { ctaLink } from "./navdata";
import {  Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";

/**
 * Site-wide navbar.
 * - Fixed to the top of the viewport, transparent background (no blur/backdrop
 *   so it stays truly see-through over hero content).
 * - Exactly 80px tall at every breakpoint.
 * - Desktop (md+): logo left, links centered, CTA right.
 * - Mobile (<md): logo left, hamburger right, links live in a slide-over Sheet.
 *
 * This is a server component itself; usePathname() and open/close state
 * are isolated inside the client children (NavLink, MobileNav).
 */
export default function Navbars() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
              <Logo />
        </div>
      
        <div className={styles.navigation}>
          <DesktopNav />
        </div>
        

        <div className={styles.rightSection}>
    <a
        href="https://www.instagram.com/team_sammard/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.icon}
    >
        <FaInstagram size={24} />
    </a>

    <a
        href="mailto:teamsammard@gmail.com"
        className={styles.icon}
    >
        <Mail size={24} />
    </a>

    <Button asChild>
        <Link href={ctaLink.href}>{ctaLink.label}</Link>
    </Button>
</div>
        <div className={styles.mobile}>
           <MobileNav />
        </div>
       
      </div>
    </header>
  );
}