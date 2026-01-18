"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  HotelSearchForm,
  HotelSearchResults,
  type HotelSearchFormData,
} from "@/components/search";
import { LoadingState } from "@/components/ui";
import { useSearchHotels, useAddHotel, useDebouncedValue } from "@/hooks";
import { useItineraryStore } from "@/store";
import type { Hotel } from "@/types/domain";

function HotelsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentItinerary = useItineraryStore((state) => state.currentItinerary);

  // Get initial values from URL
  const initialValues: Partial<HotelSearchFormData> = {
    destination: searchParams.get("destination") ?? "",
    checkInDate: searchParams.get("checkInDate") ?? "",
    checkOutDate: searchParams.get("checkOutDate") ?? "",
    adults: parseInt(searchParams.get("adults") ?? "2", 10),
    children: parseInt(searchParams.get("children") ?? "0", 10),
    rooms: parseInt(searchParams.get("rooms") ?? "1", 10),
  };

  const [searchParams2, setSearchParams2] =
    useState<HotelSearchFormData | null>(
      initialValues.destination &&
        initialValues.checkInDate &&
        initialValues.checkOutDate
        ? (initialValues as HotelSearchFormData)
        : null
    );

  const debouncedParams = useDebouncedValue(searchParams2, 300);

  const { data, isLoading, error, refetch } = useSearchHotels(debouncedParams);
  const { mutate: addHotel } = useAddHotel();

  const handleSearch = useCallback(
    (data: HotelSearchFormData) => {
      // Update URL
      const params = new URLSearchParams();
      params.set("destination", data.destination);
      params.set("checkInDate", data.checkInDate);
      params.set("checkOutDate", data.checkOutDate);
      params.set("adults", data.adults.toString());
      if (data.children) params.set("children", data.children.toString());
      if (data.rooms) params.set("rooms", data.rooms.toString());

      router.push(`/hotels?${params.toString()}`, { scroll: false });
      setSearchParams2(data);
    },
    [router]
  );

  const handleSelectHotel = useCallback(
    (hotel: Hotel) => {
      if (!currentItinerary) {
        return;
      }
      addHotel(hotel);
    },
    [currentItinerary, addHotel]
  );

  const selectedHotelIds = currentItinerary?.hotels.map((h) => h.id) ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black-primary">Search Hotels</h1>
        <p className="text-sm text-neutral-700">
          Find the perfect accommodation for your stay
        </p>
      </div>

      {/* Search Form */}
      <HotelSearchForm
        onSubmit={handleSearch}
        isLoading={isLoading}
        defaultValues={initialValues}
      />

      {/* Results */}
      {(searchParams2 || data) && (
        <div className="mt-6">
          <HotelSearchResults
            hotels={data?.data ?? []}
            isLoading={isLoading}
            error={error}
            onRetry={() => refetch()}
            onSelect={handleSelectHotel}
            selectedIds={selectedHotelIds}
          />
        </div>
      )}
    </div>
  );
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading..." />}>
      <HotelsPageContent />
    </Suspense>
  );
}

