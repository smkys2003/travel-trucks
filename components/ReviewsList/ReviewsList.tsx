import { FaStar } from "react-icons/fa";
import type { CamperReview } from "@/types/camper";
import styles from "./ReviewsList.module.css";

interface ReviewsListProps {
  reviews: CamperReview[];
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return <p className={styles.message}>There are no reviews yet.</p>;
  }

  return (
    <div className={styles.list}>
      {reviews.map((review) => (
        <article className={styles.review} key={review.id}>
          <div className={styles.person}>
            <span className={styles.avatar}>
              {review.reviewer_name.charAt(0).toUpperCase()}
            </span>

            <div>
              <h3 className={styles.name}>{review.reviewer_name}</h3>

              <div
                className={styles.rating}
                aria-label={`${review.reviewer_rating} out of 5 stars`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    className={
                      star <= review.reviewer_rating
                        ? styles.activeStar
                        : styles.inactiveStar
                    }
                    key={star}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className={styles.comment}>{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
