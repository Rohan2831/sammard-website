"use client";
import styles from "./hero.module.css";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { heroAnimation } from "@/animations/hero";
import { Button } from "@/components/ui/button";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = heroAnimation({
      root: sectionRef,
      video: videoRef,
      heading: titleRef,
      ctaGroup: ctaGroupRef,
      scrollIndicator: scrollIndicatorRef,
    });
    return cleanup;
  }, []);

  return (
    <section ref={sectionRef} className={styles.hero} data-hero>
      <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline>
        <source src="/assets/shared/videos/launch.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>&ldquo;Give your dreams some space to unfold&rdquo;</h1>

        <div ref={ctaGroupRef} className={styles.ctaGroup}>
          <Button asChild size="lg" variant="outline">
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>

      <div ref={scrollIndicatorRef} className={styles.scrollIndicator} aria-hidden="true">
        <ChevronDown size={28} />
      </div>
    </section>
  );
}