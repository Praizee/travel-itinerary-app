import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Flight, Hotel, Activity, Itinerary } from "@/types/domain";
import { generateId } from "@/lib/utils";

interface ItineraryState {
  currentItinerary: Itinerary | null;
  itineraries: Itinerary[];
}

interface ItineraryActions {
  // Itinerary CRUD
  createItinerary: (
    data: Omit<
      Itinerary,
      "id" | "flights" | "hotels" | "activities" | "createdAt" | "updatedAt"
    >
  ) => void;
  updateItinerary: (id: string, data: Partial<Itinerary>) => void;
  deleteItinerary: (id: string) => void;
  setCurrentItinerary: (id: string | null) => void;

  // Flight operations
  addFlight: (flight: Flight) => void;
  removeFlight: (flightId: string) => void;

  // Hotel operations
  addHotel: (hotel: Hotel) => void;
  removeHotel: (hotelId: string) => void;

  // Activity operations
  addActivity: (activity: Activity) => void;
  removeActivity: (activityId: string) => void;
  updateActivityDay: (activityId: string, day: number) => void;
}

type ItineraryStore = ItineraryState & ItineraryActions;

export const useItineraryStore = create<ItineraryStore>()(
  persist(
    (set, get) => ({
      currentItinerary: null,
      itineraries: [],

      createItinerary: (data) => {
        const newItinerary: Itinerary = {
          ...data,
          id: generateId(),
          flights: [],
          hotels: [],
          activities: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          itineraries: [...state.itineraries, newItinerary],
          currentItinerary: newItinerary,
        }));
      },

      updateItinerary: (id, data) => {
        set((state) => {
          const itineraries = state.itineraries.map((itinerary) =>
            itinerary.id === id
              ? { ...itinerary, ...data, updatedAt: new Date().toISOString() }
              : itinerary
          );
          const currentItinerary =
            state.currentItinerary?.id === id
              ? {
                  ...state.currentItinerary,
                  ...data,
                  updatedAt: new Date().toISOString(),
                }
              : state.currentItinerary;

          return { itineraries, currentItinerary };
        });
      },

      deleteItinerary: (id) => {
        set((state) => ({
          itineraries: state.itineraries.filter(
            (itinerary) => itinerary.id !== id
          ),
          currentItinerary:
            state.currentItinerary?.id === id ? null : state.currentItinerary,
        }));
      },

      setCurrentItinerary: (id) => {
        if (!id) {
          set({ currentItinerary: null });
          return;
        }

        const itinerary = get().itineraries.find((it) => it.id === id);
        set({ currentItinerary: itinerary ?? null });
      },

      addFlight: (flight) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            flights: [...state.currentItinerary.flights, flight],
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },

      removeFlight: (flightId) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            flights: state.currentItinerary.flights.filter(
              (f) => f.id !== flightId
            ),
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },

      addHotel: (hotel) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            hotels: [...state.currentItinerary.hotels, hotel],
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },

      removeHotel: (hotelId) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            hotels: state.currentItinerary.hotels.filter(
              (h) => h.id !== hotelId
            ),
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },

      addActivity: (activity) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            activities: [...state.currentItinerary.activities, activity],
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },

      removeActivity: (activityId) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            activities: state.currentItinerary.activities.filter(
              (a) => a.id !== activityId
            ),
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },

      updateActivityDay: (activityId, day) => {
        set((state) => {
          if (!state.currentItinerary) return state;

          const updatedItinerary = {
            ...state.currentItinerary,
            activities: state.currentItinerary.activities.map((a) =>
              a.id === activityId ? { ...a, day } : a
            ),
            updatedAt: new Date().toISOString(),
          };

          return {
            currentItinerary: updatedItinerary,
            itineraries: state.itineraries.map((it) =>
              it.id === updatedItinerary.id ? updatedItinerary : it
            ),
          };
        });
      },
    }),
    {
      name: "travel-itinerary-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        itineraries: state.itineraries,
        currentItinerary: state.currentItinerary,
      }),
    }
  )
);

