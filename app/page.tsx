import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.hero}>
      <Image
        className={styles.heroImage}
        src="/images/hero-image.png"
        alt="Camper near the lake"
        width={1440}
        height={764}
        sizes="100vw"
        priority
      />

      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <h1 className={styles.title}>Campers of your dreams</h1>

        <p className={styles.description}>
          You can find everything you want in our catalog
        </p>

        <Link href="/catalog" prefetch={true} className={styles.button}>
          View Now
        </Link>
      </div>
    </main>
  );
}
