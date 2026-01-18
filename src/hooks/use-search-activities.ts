import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Activity } from "@/types/domain";
import type { PaginatedResponse } from "@/types/api";
import type { SearchActivitiesParamsInput } from "@/lib/schemas/activity.schema";

async function searchActivities(
  params: SearchActivitiesParamsInput,
  signal?: AbortSignal
): Promise<PaginatedResponse<Activity>> {
  const searchParams = new URLSearchParams();

  searchParams.set("destination", params.destination);

  if (params.date) {
    searchParams.set("date", params.date);
  }
  if (params.category) {
    searchParams.set("category", params.category);
  }

  const response = await axios.get<PaginatedResponse<Activity>>(
    `/api/activities/search?${searchParams.toString()}`,
    { signal }
  );

  return response.data;
}

export function useSearchActivities(
  params: SearchActivitiesParamsInput | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["activities", "search", params],
    queryFn: ({ signal }) => {
      if (!params) {
        throw new Error("Search parameters are required");
      }
      return searchActivities(params, signal);
    },
    enabled:
      options?.enabled ?? (params !== null && Boolean(params.destination)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

