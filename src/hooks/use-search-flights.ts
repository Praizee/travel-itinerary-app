import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Flight } from "@/types/domain";
import type { PaginatedResponse } from "@/types/api";
import type { SearchFlightsParamsInput } from "@/lib/schemas/flight.schema";

async function searchFlights(
  params: SearchFlightsParamsInput,
  signal?: AbortSignal
): Promise<PaginatedResponse<Flight>> {
  const searchParams = new URLSearchParams();

  searchParams.set("origin", params.origin);
  searchParams.set("destination", params.destination);
  searchParams.set("departureDate", params.departureDate);
  searchParams.set("adults", params.adults.toString());

  if (params.returnDate) {
    searchParams.set("returnDate", params.returnDate);
  }
  if (params.children) {
    searchParams.set("children", params.children.toString());
  }
  if (params.infants) {
    searchParams.set("infants", params.infants.toString());
  }
  if (params.cabinClass) {
    searchParams.set("cabinClass", params.cabinClass);
  }

  const response = await axios.get<PaginatedResponse<Flight>>(
    `/api/flights/search?${searchParams.toString()}`,
    { signal }
  );

  return response.data;
}

export function useSearchFlights(
  params: SearchFlightsParamsInput | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["flights", "search", params],
    queryFn: ({ signal }) => {
      if (!params) {
        throw new Error("Search parameters are required");
      }
      return searchFlights(params, signal);
    },
    enabled:
      options?.enabled ??
      (params !== null &&
        Boolean(params.origin && params.destination && params.departureDate)),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

