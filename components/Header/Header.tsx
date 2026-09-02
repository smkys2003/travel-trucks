"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/travel-trucks.svg"
            alt="TravelTrucks"
            width={136}
            height={16}
            priority
          />
        </Link>

        <nav className={styles.navigation}>
          <Link
            href="/"
            className={pathname === "/" ? styles.activeLink : styles.link}
          >
            Home
          </Link>

          <Link
            href="/catalog"
            className={
              pathname.startsWith("/catalog") ? styles.activeLink : styles.link
            }
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
