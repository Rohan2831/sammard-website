"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavLink as NavLinkData } from "./navdata";
import styles from "./navlink.module.css";

interface NavLinkProps {
  link: NavLinkData;
  
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  onNavigate?: () => void;
}

/**
 * Determines "active" as an exact match on "/" and a prefix match
 * everywhere else, so nested routes like /blog/my-post still highlight
 * the "/blog" link.
 */
function isActiveRoute(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function NavLink({
  link,
  className,
  activeClassName = styles.active,
  inactiveClassName = styles.inactive,
  onNavigate,
}: NavLinkProps) {
  const pathname = usePathname();
  const active = isActiveRoute(pathname, link.href);

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        styles.link,
        active ? activeClassName : inactiveClassName,
        className
      )}
    >
      {link.label}
    </Link>
  );
}