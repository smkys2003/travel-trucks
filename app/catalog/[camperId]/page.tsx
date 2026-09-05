import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchCamperById, fetchCamperReviews } from "@/lib/api";
import CamperDetails from "@/components/CamperDetails/CamperDetails";

export async function generateMetadata({
  params,
}: CamperPageProps): Promise<Metadata> {
  const { camperId } = await params;

  try {
    const camper = await fetchCamperById(camperId);

    return {
      title: `${camper.name} | TravelTrucks`,
      description: camper.description,
    };
  } catch {
    return {
      title: "Camper not found | TravelTrucks",
      description: "The requested camper could not be found.",
    };
  }
}

interface CamperPageProps {
  params: Promise<{
    camperId: string;
  }>;
}

async function getCamperData(camperId: string) {
  try {
    const [camper, reviews] = await Promise.all([
      fetchCamperById(camperId),
      fetchCamperReviews(camperId),
    ]);

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
