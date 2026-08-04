"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import styles from "./mobilenav.module.css";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { navLinks, ctaLink } from "./navdata";
import { NavLink } from "./navlinks";
import { Logo } from "./logo";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.mobileNav}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className={styles.menuButton}
          >
            <Menu />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className={styles.sheet}>
          <SheetHeader className={styles.header}>
            <SheetTitle className={styles.hiddenTitle}>
              Navigation menu
            </SheetTitle>

            <Logo />
          </SheetHeader>

          <nav
            aria-label="Mobile primary"
            className={styles.menu}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className={styles.menuLink}
                onNavigate={() => setOpen(false)}
              />
            ))}
          </nav>

          <div className={styles.footer}>
            <Button
              asChild
              className={styles.joinButton}
              onClick={() => setOpen(false)}
            >
              <a href={ctaLink.href}>{ctaLink.label}</a>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}