import Image from "next/image";
import Link from "next/link";
import { FaGasPump, FaStar } from "react-icons/fa";
import { BsGear } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineDirectionsCar } from "react-icons/md";
import type { Camper } from "@/types/camper";
import styles from "./CamperCard.module.css";

interface CamperCardProps {
  camper: Camper;
}

export default function CamperCard({ camper }: CamperCardProps) {
  const formattedLocation = camper.location.split(", ").reverse().join(", ");
  return (
    <article className={styles.card}>
      {camper.coverImage && (
        <Image
          className={styles.image}
          src={camper.coverImage}
          alt={camper.name}
          width={219}
          height={240}
          sizes="219px"
        />
      )}

      <div className={styles.info}>
        <div>
          <div className={styles.heading}>
            <h2 className={styles.name}>{camper.name}</h2>

            <p className={styles.price}>€{camper.price}</p>
          </div>

          <div className={styles.details}>
            <span className={styles.rating}>
              <FaStar />
              {camper.rating} ({camper.totalReviews} Reviews)
            </span>

            <span className={styles.location}>
              <CiLocationOn />
              {formattedLocation}
            </span>
          </div>
        </div>

        <p className={styles.description}>{camper.description}</p>

        <div className={styles.badges}>
          <span className={styles.badge}>
            <FaGasPump />
            {camper.engine}
          </span>

          <span className={styles.badge}>
            <BsGear />
            {camper.transmission}
          </span>

          <span className={styles.badge}>
            <MdOutlineDirectionsCar />
            {camper.form.replace("_", " ")}
          </span>
        </div>

        <Link
          className={styles.showMore}
          href={`/catalog/${camper.id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
