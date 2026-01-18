"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ItineraryHeader,
  FlightsSection,
  HotelsSection,
  ActivitiesSection,
} from "@/components/itinerary";
import { useItineraryStore } from "@/store";
import {
  useRemoveFlight,
  useRemoveHotel,
  useRemoveActivity,
  useUpdateActivityDay,
} from "@/hooks";
import type { Itinerary } from "@/types/domain";

const sampleItinerary: Itinerary = {
  id: "sample-1",
  name: "Bahamas Family Trip",
  destination: "New York, United States of America",
  startDate: "2024-03-21",
  endDate: "2024-04-21",
  tripType: "solo",
  flights: [
    {
      id: "flight-1",
      airline: "American Airlines",
      airlineCode: "AA",
      flightNumber: "AA-829",
      flightClass: "first",
      departureTime: "2024-03-21T08:35:00",
      arrivalTime: "2024-03-21T09:55:00",
      departureAirport: "LOS",
      arrivalAirport: "SIN",
      departureCity: "Lagos",
      arrivalCity: "Singapore",
      duration: "1h 45m",
      stops: 0,
      price: 123450,
      currency: "NGN",
      facilities: ["in-flight-entertainment", "in-flight-meal", "usb-port"],
      baggageAllowance: {
        checkedBaggage: "20kg",
        cabinBaggage: "8kg",
      },
    },
    {
      id: "flight-2",
      airline: "American Airlines",
      airlineCode: "AA",
      flightNumber: "AA-829",
      flightClass: "first",
      departureTime: "2024-03-28T08:35:00",
      arrivalTime: "2024-03-28T09:55:00",
      departureAirport: "LOS",
      arrivalAirport: "SIN",
      departureCity: "Lagos",
      arrivalCity: "Singapore",
      duration: "1h 45m",
      stops: 0,
      price: 123450,
      currency: "NGN",
      facilities: ["in-flight-entertainment", "in-flight-meal", "usb-port"],
      baggageAllowance: {
        checkedBaggage: "20kg",
        cabinBaggage: "8kg",
      },
    },
  ],
  hotels: [
    {
      id: "hotel-1",
      name: "Riviera Resort, Lekki",
      address:
        "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
      city: "Lagos",
      rating: 4.5,
      reviewCount: 436,
      roomType: "King size room",
      pricePerNight: 12345,
      totalPrice: 123450,
      currency: "NGN",
      checkInDate: "2024-04-20",
      checkOutDate: "2024-04-25",
      nights: 10,
      taxesIncluded: true,
      facilities: ["pool", "bar", "restaurant"],
      images: [],
      coordinates: { latitude: 6.4541, longitude: 3.4218 },
    },
    {
      id: "hotel-2",
      name: "Riviera Resort, Lekki",
      address:
        "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
      city: "Lagos",
      rating: 4.5,
      reviewCount: 436,
      roomType: "King size room",
      pricePerNight: 12345,
      totalPrice: 123450,
      currency: "NGN",
      checkInDate: "2024-04-20",
      checkOutDate: "2024-04-25",
      nights: 10,
      taxesIncluded: true,
      facilities: ["pool", "bar", "restaurant"],
      images: [],
      coordinates: { latitude: 6.4541, longitude: 3.4218 },
    },
  ],
  activities: [
    {
      id: "activity-1",
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant.",
      location: "Empire State Building",
      rating: 4.5,
      reviewCount: 436,
      duration: "1 hour",
      price: 123450,
      currency: "NGN",
      dateTime: "2024-03-19T10:30:00",
      day: 1,
      whatIsIncluded: ["Admission to the Empire State Building"],
      images: [],
      category: "museum",
    },
    {
      id: "activity-2",
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant.",
      location: "Empire State Building",
      rating: 4.5,
      reviewCount: 436,
      duration: "1 hour",
      price: 123450,
      currency: "NGN",
      dateTime: "2024-03-19T10:30:00",
      day: 1,
      whatIsIncluded: ["Admission to the Empire State Building"],
      images: [],
      category: "museum",
    },
    {
      id: "activity-3",
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant.",
      location: "Empire State Building",
      rating: 4.5,
      reviewCount: 436,
      duration: "1 hour",
      price: 123450,
      currency: "NGN",
      dateTime: "2024-03-19T10:30:00",
      day: 2,
      whatIsIncluded: ["Admission to the Empire State Building"],
      images: [],
      category: "museum",
    },
  ],
  createdAt: "2024-01-15T10:00:00Z",
  updatedAt: "2024-01-15T10:00:00Z",
};

export default function HomePage() {
  const router = useRouter();
  const currentItinerary = useItineraryStore((state) => state.currentItinerary);
  const createItinerary = useItineraryStore((state) => state.createItinerary);
  const setCurrentItinerary = useItineraryStore(
    (state) => state.setCurrentItinerary,
  );
  const itineraries = useItineraryStore((state) => state.itineraries);

  const {
    mutate: removeFlight,
    isPending: isRemovingFlight,
    variables: removingFlightId,
  } = useRemoveFlight();
  const {
    mutate: removeHotel,
    isPending: isRemovingHotel,
    variables: removingHotelId,
  } = useRemoveHotel();
  const {
    mutate: removeActivity,
    isPending: isRemovingActivity,
    variables: removingActivityId,
  } = useRemoveActivity();
  const { mutate: updateActivityDay } = useUpdateActivityDay();

  useEffect(() => {
    if (itineraries.length === 0) {
      createItinerary({
        name: sampleItinerary.name,
        destination: sampleItinerary.destination,
        startDate: sampleItinerary.startDate,
        endDate: sampleItinerary.endDate,
        tripType: sampleItinerary.tripType,
      });
    }
  }, [itineraries.length, createItinerary]);

  // Set the first itinerary as current if none is selected
  useEffect(() => {
    if (!currentItinerary && itineraries.length > 0) {
      setCurrentItinerary(itineraries[0].id);
    }
  }, [currentItinerary, itineraries, setCurrentItinerary]);

  const displayItinerary =
    currentItinerary &&
    (currentItinerary.flights?.length ||
      currentItinerary.hotels?.length ||
      currentItinerary.activities?.length)
      ? currentItinerary
      : sampleItinerary;

  const handleAddFlights = () => {
    router.push("/flights");
  };

  const handleAddHotels = () => {
    router.push("/hotels");
  };

  const handleAddActivities = () => {
    router.push("/activities");
  };

  return (
    <div className="bg-white p-4 md:p-8">
      <ItineraryHeader itinerary={displayItinerary} />

      <div className="mt-8">
        <div className="mb-7">
          <h2 className="text-lg font-semibold text-black-primary">
            Trip Itineraries
          </h2>
          <p className="text-sm text-neutral-700">
            Your trip itineraries are placed here
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <FlightsSection
            flights={displayItinerary.flights}
            onAddClick={handleAddFlights}
            onRemoveFlight={(id) => removeFlight(id)}
            removingId={isRemovingFlight ? removingFlightId : undefined}
          />

          <HotelsSection
            hotels={displayItinerary.hotels}
            onAddClick={handleAddHotels}
            onRemoveHotel={(id) => removeHotel(id)}
            removingId={isRemovingHotel ? removingHotelId : undefined}
          />

          <ActivitiesSection
            activities={displayItinerary.activities}
            onAddClick={handleAddActivities}
            onRemoveActivity={(id) => removeActivity(id)}
            onDayChange={(activityId, day) =>
              updateActivityDay({ activityId, day })
            }
            removingId={isRemovingActivity ? removingActivityId : undefined}
          />
        </div>
      </div>
    </div>
  );
}

