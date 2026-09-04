import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Camper not found</h1>

      <p className={styles.text}>Sorry, we couldn`t find this camper.</p>

      <Link className={styles.link} href="/catalog">
        View catalog
      </Link>
    </main>
  );
}
