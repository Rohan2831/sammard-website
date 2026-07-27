import styles from "./hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <video className={styles.video} autoPlay muted loop playsInline>
        <source src="/videos/inflight.mp4" type="video/mp4" />
      </video>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.title}>"Give your dreams some space to unfold"</h1>
       
      </div>
    </section>
  );
}