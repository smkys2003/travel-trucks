"use client";

import { useState } from "react";
import Image from "next/image";
import type { CamperImage } from "@/types/camper";
import styles from "./CamperGallery.module.css";

interface CamperGalleryProps {
  images: CamperImage[];
  camperName: string;
}

export default function CamperGallery({
  images,
  camperName,
}: CamperGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]?.original);

  if (!selectedImage) {
    return <p className={styles.message}>Images are not available.</p>;
  }

  return (
    <div className={styles.gallery}>
      <Image
        className={styles.mainImage}
        src={selectedImage}
        alt={camperName}
        width={638}
        height={505}
        priority
      />

      <div className={styles.thumbnails}>
        {images.map((image, index) => (
          <button
            className={
              selectedImage === image.original
                ? styles.activeThumbnail
                : styles.thumbnail
            }
            type="button"
            onClick={() => setSelectedImage(image.original)}
            key={image.original}
          >
            <Image
              src={image.thumb}
              alt={`${camperName} ${index + 1}`}
              width={136}
              height={144}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
