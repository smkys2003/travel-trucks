import { FaStar } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import type { Camper, CamperReview } from "@/types/camper";
import CamperGallery from "@/components/CamperGallery/CamperGallery";
import ReviewsList from "@/components/ReviewsList/ReviewsList";
import BookingForm from "@/components/BookingForm/BookingForm";
import styles from "./CamperDetails.module.css";

interface CamperDetailsProps {
  camper: Camper;
  reviews: CamperReview[];
}

export default function CamperDetails({ camper, reviews }: CamperDetailsProps) {
  const [country, city] = camper.location.split(", ");

  const formName =
    camper.form === "panel_van" ? "Panel truck" : camper.form.replace("_", " ");

  return (
    <main className={styles.page}>
      <section className={styles.top}>
        <CamperGallery images={camper.gallery || []} camperName={camper.name} />

        <div className={styles.information}>
          <div className={styles.card}>
            <div>
              <h1 className={styles.name}>{camper.name}</h1>

              <div className={styles.meta}>
                <span className={styles.rating}>
                  <FaStar />
                  {camper.rating} ({camper.totalReviews} Reviews)
                </span>

                <span className={styles.location}>
                  <CiLocationOn />
                  {city}, {country}
                </span>
              </div>

              <p className={styles.price}>€{camper.price}</p>
            </div>

            <p className={styles.description}>{camper.description}</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.sectionTitle}>Vehicle details</h2>

            <div className={styles.badges}>
              <span className={styles.badge}>{camper.transmission}</span>

              {camper.amenities.map((amenity) => (
                <span className={styles.badge} key={amenity}>
                  {amenity === "ac" ? "AC" : amenity}
                </span>
              ))}

              <span className={styles.badge}>{camper.engine}</span>

              <span className={styles.badge}>{formName}</span>
            </div>

            <dl className={styles.specifications}>
              <div className={styles.specification}>
                <dt>Form</dt>
                <dd>{formName}</dd>
              </div>

              <div className={styles.specification}>
                <dt>Length</dt>
                <dd>{camper.length}</dd>
              </div>

              <div className={styles.specification}>
                <dt>Width</dt>
                <dd>{camper.width}</dd>
              </div>

              <div className={styles.specification}>
                <dt>Height</dt>
                <dd>{camper.height}</dd>
              </div>

              <div className={styles.specification}>
                <dt>Tank</dt>
                <dd>{camper.tank}</dd>
              </div>

              <div className={styles.specification}>
                <dt>Consumption</dt>
                <dd>{camper.consumption}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className={styles.reviewsSection}>
        <h2 className={styles.reviewsTitle}>Reviews</h2>

        <div className={styles.bottom}>
          <ReviewsList reviews={reviews} />

          <BookingForm camperId={camper.id} />
        </div>
      </section>
    </main>
  );
}
