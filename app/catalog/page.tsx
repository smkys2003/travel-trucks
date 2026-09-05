import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api";
import Catalog from "@/components/Catalog/Catalog";
import type { CamperFilters, CampersResponse } from "@/types/camper";
export const metadata: Metadata = {
  title: "Catalog | TravelTrucks",
  description: "Browse available campers for rent.",
};

const initialFilters: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["campers", initialFilters],

    queryFn: ({ pageParam }) => {
      return fetchCampers(pageParam, initialFilters);
    },

    initialPageParam: 1,
    getNextPageParam: (lastPage: CampersResponse) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Catalog />
    </HydrationBoundary>
  );
}
