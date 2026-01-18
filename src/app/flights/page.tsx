"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FlightSearchForm,
  FlightSearchResults,
  type FlightSearchFormData,
} from "@/components/search";
import { LoadingState } from "@/components/ui";
import { useSearchFlights, useAddFlight, useDebouncedValue } from "@/hooks";
import { useItineraryStore } from "@/store";
import type { Flight } from "@/types/domain";

function FlightsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentItinerary = useItineraryStore((state) => state.currentItinerary);

  // Get initial values from URL
  const initialValues: Partial<FlightSearchFormData> = {
    origin: searchParams.get("origin") ?? "",
    destination: searchParams.get("destination") ?? "",
    departureDate: searchParams.get("departureDate") ?? "",
    returnDate: searchParams.get("returnDate") ?? "",
    adults: parseInt(searchParams.get("adults") ?? "1", 10),
    children: parseInt(searchParams.get("children") ?? "0", 10),
    cabinClass:
      (searchParams.get("cabinClass") as FlightSearchFormData["cabinClass"]) ??
      "economy",
  };

  const [searchParams2, setSearchParams2] =
    useState<FlightSearchFormData | null>(
      initialValues.origin &&
        initialValues.destination &&
        initialValues.departureDate
        ? (initialValues as FlightSearchFormData)
        : null
    );

  const debouncedParams = useDebouncedValue(searchParams2, 300);

  const { data, isLoading, error, refetch } = useSearchFlights(debouncedParams);
  const { mutate: addFlight } = useAddFlight();

  const handleSearch = useCallback(
    (data: FlightSearchFormData) => {
      // Update URL
      const params = new URLSearchParams();
      params.set("origin", data.origin);
      params.set("destination", data.destination);
      params.set("departureDate", data.departureDate);
      if (data.returnDate) params.set("returnDate", data.returnDate);
      params.set("adults", data.adults.toString());
      if (data.children) params.set("children", data.children.toString());
      if (data.cabinClass) params.set("cabinClass", data.cabinClass);

      router.push(`/flights?${params.toString()}`, { scroll: false });
      setSearchParams2(data);
    },
    [router]
  );

  const handleSelectFlight = useCallback(
    (flight: Flight) => {
      if (!currentItinerary) {
        // Could show a toast here asking user to create an itinerary first
        return;
      }
      addFlight(flight);
    },
    [currentItinerary, addFlight]
  );

  const selectedFlightIds = currentItinerary?.flights.map((f) => f.id) ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black-primary">
          Search Flights
        </h1>
        <p className="text-sm text-neutral-700">
          Find the best flights for your trip
        </p>
      </div>

      {/* Search Form */}
      <FlightSearchForm
        onSubmit={handleSearch}
        isLoading={isLoading}
        defaultValues={initialValues}
      />

      {/* Results */}
      {(searchParams2 || data) && (
        <div className="mt-6">
          <FlightSearchResults
            flights={data?.data ?? []}
            isLoading={isLoading}
            error={error}
            onRetry={() => refetch()}
            onSelect={handleSelectFlight}
            selectedIds={selectedFlightIds}
          />
        </div>
      )}
    </div>
  );
}

export default function FlightsPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading..." />}>
      <FlightsPageContent />
    </Suspense>
  );
}

