import type {
  Flight,
  Hotel,
  Activity,
  FlightFacility,
  HotelFacility,
  ActivityCategory,
} from "@/types/domain";
import type { RapidApiFlightResponse } from "@/lib/schemas/flight.schema";
import type { RapidApiHotelResponse } from "@/lib/schemas/hotel.schema";
import type { RapidApiActivityResponse } from "@/lib/schemas/activity.schema";

// Normalize RapidAPI flight data to internal Flight model
export function normalizeFlights(response: RapidApiFlightResponse): Flight[] {
  const itineraries = response.data?.itineraries ?? [];

  return itineraries.map((itinerary, index) => {
    const leg = itinerary.legs?.[0];
    const carrier = leg?.carriers?.marketing?.[0];

    const durationMinutes = leg?.durationInMinutes ?? 0;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;

    return {
      id: itinerary.id ?? `flight-${index}`,
      airline: carrier?.name ?? "Unknown Airline",
      airlineCode: carrier?.id?.toString() ?? "XX",
      flightNumber: `${carrier?.id ?? "XX"}-${
        Math.floor(Math.random() * 900) + 100
      }`,
      flightClass: "economy" as const,
      departureTime: leg?.departure ?? "",
      arrivalTime: leg?.arrival ?? "",
      departureAirport: leg?.origin?.id ?? "",
      arrivalAirport: leg?.destination?.id ?? "",
      departureCity: leg?.origin?.city ?? leg?.origin?.name ?? "",
      arrivalCity: leg?.destination?.city ?? leg?.destination?.name ?? "",
      duration: `${hours}h ${minutes}m`,
      stops: leg?.stopCount ?? 0,
      price: itinerary.price?.raw ?? 0,
      currency: "NGN",
      facilities: getDefaultFlightFacilities(),
      baggageAllowance: {
        checkedBaggage: "20kg",
        cabinBaggage: "8kg",
      },
    };
  });
}

function getDefaultFlightFacilities(): FlightFacility[] {
  return ["in-flight-entertainment", "in-flight-meal", "usb-port"];
}

// Normalize RapidAPI hotel data to internal Hotel model
export function normalizeHotels(
  response: RapidApiHotelResponse,
  checkInDate: string,
  checkOutDate: string
): Hotel[] {
  const hotels = response.result ?? [];

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
  );

  return hotels.map((hotel, index) => {
    const totalPrice =
      hotel.min_total_price ??
      (typeof hotel.price_breakdown?.gross_price === "number"
        ? hotel.price_breakdown.gross_price
        : parseFloat(hotel.price_breakdown?.gross_price ?? "0"));

    return {
      id: hotel.hotel_id?.toString() ?? `hotel-${index}`,
      name: hotel.hotel_name ?? "Unknown Hotel",
      address: hotel.address ?? "",
      city: hotel.city ?? "",
      rating: hotel.review_score ? hotel.review_score / 2 : 0, // Convert 10-scale to 5-scale
      reviewCount: hotel.review_nr ?? 0,
      roomType: hotel.accommodation_type_name ?? "Standard Room",
      pricePerNight: nights > 0 ? totalPrice / nights : totalPrice,
      totalPrice,
      currency: hotel.price_breakdown?.currency ?? "NGN",
      checkInDate,
      checkOutDate,
      nights,
      taxesIncluded: true,
      facilities: getDefaultHotelFacilities(),
      images: hotel.main_photo_url ? [hotel.main_photo_url] : [],
      coordinates: {
        latitude: hotel.latitude ?? 0,
        longitude: hotel.longitude ?? 0,
      },
    };
  });
}

function getDefaultHotelFacilities(): HotelFacility[] {
  return ["pool", "bar", "wifi"];
}

// Normalize RapidAPI activity data to internal Activity model
export function normalizeActivities(
  response: RapidApiActivityResponse
): Activity[] {
  const activities = response.data ?? [];

  return activities.map((activity, index) => {
    return {
      id: activity.id?.toString() ?? `activity-${index}`,
      name: activity.name ?? "Unknown Activity",
      description: activity.description ?? activity.shortDescription ?? "",
      location: activity.location?.address ?? activity.location?.city ?? "",
      rating: activity.rating?.average ?? 0,
      reviewCount: activity.rating?.count ?? 0,
      duration: activity.duration ?? "1 hour",
      price: activity.price?.amount ?? 0,
      currency: activity.price?.currencyCode ?? "NGN",
      dateTime: "",
      day: 1,
      whatIsIncluded: [],
      images: activity.pictures ?? [],
      category: "sightseeing" as ActivityCategory,
    };
  });
}

