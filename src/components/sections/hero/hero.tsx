"use client";
import styles from "./hero.module.css";
import { useEffect, useRef } from "react";
import { heroAnimation } from "@/animations/hero";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
  heroAnimation(sectionRef, videoRef, titleRef);
}, []);
  return (
    <section ref={sectionRef} className={styles.hero}>
      <video ref={videoRef} className={styles.video} autoPlay muted loop playsInline>
        <source src="/videos/inflight.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 ref={titleRef} className={styles.title}>"Give your dreams some space to unfold"</h1>
       
      </div>
    </section>
  );
}