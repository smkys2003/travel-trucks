"use client";

import { useState } from "react";
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { fetchCampers } from "@/lib/api";
import type { CamperFilters } from "@/types/camper";
import FilterForm from "@/components/FilterForm/FilterForm";
import CamperCard from "@/components/CamperCard/CamperCard";
import EmptyCatalog from "@/components/EmptyCatalog/EmptyCatalog";
import Loader from "@/components/Loader/Loader";
import styles from "./Catalog.module.css";

const initialFilters: CamperFilters = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

export default function Catalog() {
  const [filters, setFilters] = useState<CamperFilters>(initialFilters);

  const [formKey, setFormKey] = useState(0);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ["campers", filters],

    queryFn: ({ pageParam }) => {
      return fetchCampers(pageParam, filters);
    },

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }

      return undefined;
    },

    placeholderData: keepPreviousData,
  });

  const campers = data ? data.pages.flatMap((page) => page.campers) : [];

  function handleSearch(newFilters: CamperFilters) {
    setFilters(newFilters);
  }

  function handleClearFilters() {
    setFilters(initialFilters);
    setFormKey(formKey + 1);
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Camper catalog</h1>

      <FilterForm key={formKey} onSearch={handleSearch} />

      <section className={styles.catalog}>
        {isFetching && <Loader />}

        {isError && (
          <p className={styles.message}>
            Something went wrong. Please try again.
          </p>
        )}

        {!isFetching && !isError && campers.length === 0 && (
          <EmptyCatalog onClear={handleClearFilters} />
        )}

        {!isError && campers.length > 0 && (
          <>
            <div className={styles.list}>
              {campers.map((camper) => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
            </div>

            {hasNextPage && (
              <button
                className={styles.loadMore}
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                Load more
              </button>
            )}
          </>
        )}
      </section>
    </main>
  );
}
