import { NextRequest, NextResponse } from "next/server";
import { rapidApiClient } from "@/lib/api/api-client";
import { normalizeHotels } from "@/lib/api/normalizers";
import {
  searchHotelsParamsSchema,
  rapidApiHotelResponseSchema,
} from "@/lib/schemas/hotel.schema";
import type { ApiError } from "@/types/api";

const BOOKING_HOST = "booking-com15.p.rapidapi.com";
const SEARCH_URL =
  "https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query params
    const rawParams = {
      destination: searchParams.get("destination") ?? "",
      checkInDate: searchParams.get("checkInDate") ?? "",
      checkOutDate: searchParams.get("checkOutDate") ?? "",
      adults: searchParams.get("adults") ?? "1",
      children: searchParams.get("children") ?? undefined,
      rooms: searchParams.get("rooms") ?? "1",
    };

    const validation = searchHotelsParamsSchema.safeParse(rawParams);

    if (!validation.success) {
      return NextResponse.json(
        {
          code: "VALIDATION_ERROR",
          message: "Invalid search parameters",
          status: 400,
          errors: validation.error.flatten().fieldErrors,
        } satisfies ApiError & { errors: unknown },
        { status: 400 }
      );
    }

    const params = validation.data;

    // Build the API URL
    const apiUrl = new URL(SEARCH_URL);
    apiUrl.searchParams.set("dest_id", params.destination);
    apiUrl.searchParams.set("search_type", "CITY");
    apiUrl.searchParams.set("arrival_date", params.checkInDate);
    apiUrl.searchParams.set("departure_date", params.checkOutDate);
    apiUrl.searchParams.set("adults", params.adults.toString());
    apiUrl.searchParams.set("room_qty", (params.rooms ?? 1).toString());
    if (params.children) {
      apiUrl.searchParams.set("children_qty", params.children.toString());
    }
    apiUrl.searchParams.set("page_number", "1");
    apiUrl.searchParams.set("units", "metric");
    apiUrl.searchParams.set("currency_code", "NGN");

    // Make the API call
    const rawResponse = await rapidApiClient.get<unknown>(
      apiUrl.toString(),
      BOOKING_HOST
    );

    // Validate the response
    const responseValidation =
      rapidApiHotelResponseSchema.safeParse(rawResponse);

    if (!responseValidation.success) {
      console.error(
        "Hotel API response validation failed:",
        responseValidation.error
      );
    }

    const validatedResponse = responseValidation.success
      ? responseValidation.data
      : (rawResponse as ReturnType<typeof rapidApiHotelResponseSchema.parse>);

    // Normalize to domain model
    const hotels = normalizeHotels(
      validatedResponse,
      params.checkInDate,
      params.checkOutDate
    );

    return NextResponse.json({
      data: hotels,
      pagination: {
        page: 1,
        pageSize: hotels.length,
        totalPages: 1,
        totalItems: hotels.length,
      },
    });
  } catch (error) {
    console.error("Hotel search error:", error);

    if (isApiError(error)) {
      return NextResponse.json(error, { status: error.status });
    }

    return NextResponse.json(
      {
        code: "INTERNAL_ERROR",
        message: "An unexpected error occurred",
        status: 500,
      } satisfies ApiError,
      { status: 500 }
    );
  }
}

function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    "message" in error &&
    "status" in error
  );
}

