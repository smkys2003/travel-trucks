import Image from "next/image";
import { IoCloseOutline } from "react-icons/io5";
import styles from "./EmptyCatalog.module.css";

interface EmptyCatalogProps {
  onClear: () => void;
}

export default function EmptyCatalog({ onClear }: EmptyCatalogProps) {
  return (
    <div className={styles.empty}>
      <div className={styles.imageWrapper}>
        <Image
          className={styles.image}
          src="/images/no-campers.png"
          alt="No campers found"
          width={572}
          height={572}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>No campers found</h2>

        <p className={styles.text}>
          We couldn&apos;t find any campers that match your filters.
          <br />
          Try adjusting your search or clearing some filters.
        </p>
      </div>

      <div className={styles.buttons}>
        <button className={styles.clearButton} type="button" onClick={onClear}>
          <IoCloseOutline />
          Clear filters
        </button>

        <button className={styles.viewButton} type="button" onClick={onClear}>
          View all campers
        </button>
      </div>
    </div>
  );
}
