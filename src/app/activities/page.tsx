"use client";

import { useState, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ActivitySearchForm,
  ActivitySearchResults,
  type ActivitySearchFormData,
} from "@/components/search";
import { LoadingState } from "@/components/ui";
import {
  useSearchActivities,
  useAddActivity,
  useDebouncedValue,
} from "@/hooks";
import { useItineraryStore } from "@/store";
import type { Activity } from "@/types/domain";

function ActivitiesPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentItinerary = useItineraryStore((state) => state.currentItinerary);

  // Get initial values from URL
  const initialValues: Partial<ActivitySearchFormData> = {
    destination: searchParams.get("destination") ?? "",
    date: searchParams.get("date") ?? "",
    category: searchParams.get("category") ?? "",
  };

  const [searchParams2, setSearchParams2] =
    useState<ActivitySearchFormData | null>(
      initialValues.destination
        ? (initialValues as ActivitySearchFormData)
        : null,
    );

  const debouncedParams = useDebouncedValue(searchParams2, 300);

  const { data, isLoading, error, refetch } =
    useSearchActivities(debouncedParams);
  const { mutate: addActivity } = useAddActivity();

  const handleSearch = useCallback(
    (data: ActivitySearchFormData) => {
      // Update URL
      const params = new URLSearchParams();
      params.set("destination", data.destination);
      if (data.date) params.set("date", data.date);
      if (data.category) params.set("category", data.category);

      router.push(`/activities?${params.toString()}`, { scroll: false });
      setSearchParams2(data);
    },
    [router],
  );

  const handleSelectActivity = useCallback(
    (activity: Activity) => {
      if (!currentItinerary) {
        return;
      }
      addActivity(activity);
    },
    [currentItinerary, addActivity],
  );

  const selectedActivityIds =
    currentItinerary?.activities.map((a) => a.id) ?? [];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-black-primary">
          Search Activities
        </h1>
        <p className="text-sm text-neutral-700">
          Discover exciting things to do at your destination
        </p>
      </div>

      {/* Search Form */}
      <ActivitySearchForm
        onSubmit={handleSearch}
        isLoading={isLoading}
        defaultValues={initialValues}
      />

      {/* Results */}
      {(searchParams2 || data) && (
        <div className="mt-6">
          <ActivitySearchResults
            activities={data?.data ?? []}
            isLoading={isLoading}
            error={error}
            onRetry={() => refetch()}
            onSelect={handleSelectActivity}
            selectedIds={selectedActivityIds}
          />
        </div>
      )}
    </div>
  );
}

export default function ActivitiesPage() {
  return (
    <Suspense fallback={<LoadingState message="Loading..." />}>
      <ActivitiesPageContent />
    </Suspense>
  );
}

