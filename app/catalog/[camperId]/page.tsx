import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCamperById, fetchCamperReviews } from "@/lib/api";
import CamperDetails from "@/components/CamperDetails/CamperDetails";

export const metadata: Metadata = {
  title: "Camper details | TravelTrucks",
  description: "Camper details and booking",
};

interface CamperPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

async function getCamperData(camperId: string) {
  try {
    const camper = await fetchCamperById(camperId);
    const reviews = await fetchCamperReviews(camperId);

    return {
      camper,
      reviews,
    };
  } catch {
    notFound();
  }
}

export default async function CamperPage({ params }: CamperPageProps) {
  const { camperId } = await params;
  const { camper, reviews } = await getCamperData(camperId);

  return <CamperDetails camper={camper} reviews={reviews} />;
}
