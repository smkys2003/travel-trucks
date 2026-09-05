import Image from "next/image";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Image
          className={styles.spinner}
          src="/loader.svg"
          alt=""
          width={72}
          height={72}
        />

        <div className={styles.content}>
          <h2 className={styles.title}>Loading tracks...</h2>

          <p className={styles.text}>
            Please wait while we fetch the best
            <br />
            travel trucks for you
          </p>
        </div>
      </div>
    </div>
  );
}
