import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Hotel } from "@/types/domain";
import type { PaginatedResponse } from "@/types/api";
import type { SearchHotelsParamsInput } from "@/lib/schemas/hotel.schema";

async function searchHotels(
  params: SearchHotelsParamsInput,
  signal?: AbortSignal
): Promise<PaginatedResponse<Hotel>> {
  const searchParams = new URLSearchParams();

  searchParams.set("destination", params.destination);
  searchParams.set("checkInDate", params.checkInDate);
  searchParams.set("checkOutDate", params.checkOutDate);
  searchParams.set("adults", params.adults.toString());

  if (params.children) {
    searchParams.set("children", params.children.toString());
  }
  if (params.rooms) {
    searchParams.set("rooms", params.rooms.toString());
  }

  const response = await axios.get<PaginatedResponse<Hotel>>(
    `/api/hotels/search?${searchParams.toString()}`,
    { signal }
  );

  return response.data;
}

export function useSearchHotels(
  params: SearchHotelsParamsInput | null,
  options?: { enabled?: boolean }
) {
  return useQuery({
    queryKey: ["hotels", "search", params],
    queryFn: ({ signal }) => {
      if (!params) {
        throw new Error("Search parameters are required");
      }
      return searchHotels(params, signal);
    },
    enabled:
      options?.enabled ??
      (params !== null &&
        Boolean(
          params.destination && params.checkInDate && params.checkOutDate
        )),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

