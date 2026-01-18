export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  flightNumber: string;
  flightClass: "economy" | "business" | "first";
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  departureCity: string;
  arrivalCity: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
  facilities: FlightFacility[];
  baggageAllowance: {
    checkedBaggage: string;
    cabinBaggage: string;
  };
}

export type FlightFacility =
  | "in-flight-entertainment"
  | "in-flight-meal"
  | "usb-port"
  | "wifi"
  | "power-outlet";

export interface Hotel {
  id: string;
  name: string;
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  roomType: string;
  pricePerNight: number;
  totalPrice: number;
  currency: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests?: number;
  taxesIncluded: boolean;
  facilities: HotelFacility[];
  images: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export type HotelFacility =
  | "pool"
  | "bar"
  | "restaurant"
  | "gym"
  | "spa"
  | "wifi"
  | "parking"
  | "room-service"
  | "air-conditioning";

export interface Activity {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  currency: string;
  dateTime: string;
  day: number;
  whatIsIncluded: string[];
  images: string[];
  category: ActivityCategory;
}

export type ActivityCategory =
  | "museum"
  | "tour"
  | "adventure"
  | "food"
  | "entertainment"
  | "sightseeing"
  | "shopping"
  | "wellness";

// Itinerary types
export interface Itinerary {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  tripType: "solo" | "couple" | "family" | "group";
  flights: Flight[];
  hotels: Hotel[];
  activities: Activity[];
  createdAt: string;
  updatedAt: string;
}

export type ItineraryItemType = "flight" | "hotel" | "activity";

export interface ItineraryItem {
  type: ItineraryItemType;
  data: Flight | Hotel | Activity;
}

