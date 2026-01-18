import { NextRequest, NextResponse } from "next/server";
import { rapidApiClient } from "@/lib/api/api-client";
import { normalizeFlights } from "@/lib/api/normalizers";
import {
  searchFlightsParamsSchema,
  rapidApiFlightResponseSchema,
} from "@/lib/schemas/flight.schema";
import type { ApiError } from "@/types/api";

const SKYSCANNER_HOST = "sky-scanner3.p.rapidapi.com";
const SEARCH_URL =
  "https://sky-scanner3.p.rapidapi.com/flights/search-roundtrip";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query params
    const rawParams = {
      origin: searchParams.get("origin") ?? "",
      destination: searchParams.get("destination") ?? "",
      departureDate: searchParams.get("departureDate") ?? "",
      returnDate: searchParams.get("returnDate") ?? undefined,
      adults: searchParams.get("adults") ?? "1",
      children: searchParams.get("children") ?? undefined,
      infants: searchParams.get("infants") ?? undefined,
      cabinClass: searchParams.get("cabinClass") ?? undefined,
    };

    const validation = searchFlightsParamsSchema.safeParse(rawParams);

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
    apiUrl.searchParams.set("fromEntityId", params.origin);
    apiUrl.searchParams.set("toEntityId", params.destination);
    apiUrl.searchParams.set("departDate", params.departureDate);
    if (params.returnDate) {
      apiUrl.searchParams.set("returnDate", params.returnDate);
    }
    apiUrl.searchParams.set("adults", params.adults.toString());
    if (params.children) {
      apiUrl.searchParams.set("children", params.children.toString());
    }
    if (params.infants) {
      apiUrl.searchParams.set("infants", params.infants.toString());
    }
    if (params.cabinClass) {
      apiUrl.searchParams.set("cabinClass", params.cabinClass);
    }

    // Make the API call
    const rawResponse = await rapidApiClient.get<unknown>(
      apiUrl.toString(),
      SKYSCANNER_HOST
    );

    // Validate the response
    const responseValidation =
      rapidApiFlightResponseSchema.safeParse(rawResponse);

    if (!responseValidation.success) {
      console.error(
        "Flight API response validation failed:",
        responseValidation.error
      );
      // Continue with raw response but log the issue
    }

    const validatedResponse = responseValidation.success
      ? responseValidation.data
      : (rawResponse as ReturnType<typeof rapidApiFlightResponseSchema.parse>);

    // Normalize to domain model
    const flights = normalizeFlights(validatedResponse);

    return NextResponse.json({
      data: flights,
      pagination: {
        page: 1,
        pageSize: flights.length,
        totalPages: 1,
        totalItems: flights.length,
      },
    });
  } catch (error) {
    console.error("Flight search error:", error);

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

