import type { Metadata } from "next";
import Catalog from "@/components/Catalog/Catalog";

export const metadata: Metadata = {
  title: "Catalog | TravelTrucks",
  description: "Browse available campers for rent",
};

export default function CatalogPage() {
  return <Catalog />;
}
