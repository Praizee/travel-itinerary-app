import { NextRequest, NextResponse } from "next/server";
import { rapidApiClient } from "@/lib/api/api-client";
import { normalizeActivities } from "@/lib/api/normalizers";
import {
  searchActivitiesParamsSchema,
  rapidApiActivityResponseSchema,
} from "@/lib/schemas/activity.schema";
import type { ApiError } from "@/types/api";

const TRIPADVISOR_HOST = "tripadvisor16.p.rapidapi.com";
const SEARCH_URL =
  "https://tripadvisor16.p.rapidapi.com/api/v1/attraction/searchAttractions";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query params
    const rawParams = {
      destination: searchParams.get("destination") ?? "",
      date: searchParams.get("date") ?? undefined,
      category: searchParams.get("category") ?? undefined,
    };

    const validation = searchActivitiesParamsSchema.safeParse(rawParams);

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
    apiUrl.searchParams.set("geoId", params.destination);
    if (params.category) {
      apiUrl.searchParams.set("category", params.category);
    }

    // Make the API call
    const rawResponse = await rapidApiClient.get<unknown>(
      apiUrl.toString(),
      TRIPADVISOR_HOST
    );

    // Validate the response
    const responseValidation =
      rapidApiActivityResponseSchema.safeParse(rawResponse);

    if (!responseValidation.success) {
      console.error(
        "Activity API response validation failed:",
        responseValidation.error
      );
    }

    const validatedResponse = responseValidation.success
      ? responseValidation.data
      : (rawResponse as ReturnType<
          typeof rapidApiActivityResponseSchema.parse
        >);

    // Normalize to domain model
    const activities = normalizeActivities(validatedResponse);

    return NextResponse.json({
      data: activities,
      pagination: {
        page: 1,
        pageSize: activities.length,
        totalPages: 1,
        totalItems: activities.length,
      },
    });
  } catch (error) {
    console.error("Activity search error:", error);

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

