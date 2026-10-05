"use client";

import { useState } from "react";
import styles from "./CopyableMailLink.module.css";

/**
 * A `mailto:` link that also copies the address to the clipboard on click.
 * Plain `mailto:` links do nothing visible when the visitor has no default
 * mail app configured (common on shared/lab computers, Chromebooks) — this
 * guarantees a visible result either way, with a brief "Copied" confirmation.
 */
export function CopyableMailLink({
  email,
  className,
  children,
}: {
  email: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard?.writeText(email).catch(() => {});
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span className={styles.wrap}>
      <a href={`mailto:${email}`} onClick={handleClick} className={className}>
        {children}
      </a>
      <span className={styles.tooltip} role="status" data-visible={copied}>
        Email copied
      </span>
    </span>
  );
}
