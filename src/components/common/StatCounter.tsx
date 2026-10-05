"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import styles from "./StatCounter.module.css";

export interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
}

/** Animated number counter, GSAP-driven, respects reduced motion. */
export function StatCounter({ value, suffix = "", label }: StatCounterProps) {
  const numberRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = `${value}${suffix}`;
      return;
    }

    const counter = { current: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.current)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix]);

  return (
    <div className={styles.stat}>
      <p ref={numberRef} className={styles.number}>
        0{suffix}
      </p>
      <p className={styles.label}>{label}</p>
    </div>
  );
}
