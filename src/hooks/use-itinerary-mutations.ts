import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useItineraryStore } from "@/store";
import type { Flight, Hotel, Activity } from "@/types/domain";
import { toast } from "sonner";

export function useAddFlight() {
  const addFlight = useItineraryStore((state) => state.addFlight);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flight: Flight) => {
      addFlight(flight);
      return flight;
    },
    onSuccess: (flight) => {
      toast.success(`Flight ${flight.flightNumber} added to itinerary`);
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to add flight to itinerary");
    },
  });
}

export function useRemoveFlight() {
  const removeFlight = useItineraryStore((state) => state.removeFlight);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (flightId: string) => {
      removeFlight(flightId);
      return flightId;
    },
    onSuccess: () => {
      toast.success("Flight removed from itinerary");
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to remove flight from itinerary");
    },
  });
}

export function useAddHotel() {
  const addHotel = useItineraryStore((state) => state.addHotel);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hotel: Hotel) => {
      addHotel(hotel);
      return hotel;
    },
    onSuccess: (hotel) => {
      toast.success(`${hotel.name} added to itinerary`);
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to add hotel to itinerary");
    },
  });
}

export function useRemoveHotel() {
  const removeHotel = useItineraryStore((state) => state.removeHotel);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (hotelId: string) => {
      removeHotel(hotelId);
      return hotelId;
    },
    onSuccess: () => {
      toast.success("Hotel removed from itinerary");
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to remove hotel from itinerary");
    },
  });
}

export function useAddActivity() {
  const addActivity = useItineraryStore((state) => state.addActivity);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activity: Activity) => {
      addActivity(activity);
      return activity;
    },
    onSuccess: (activity) => {
      toast.success(`${activity.name} added to itinerary`);
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to add activity to itinerary");
    },
  });
}

export function useRemoveActivity() {
  const removeActivity = useItineraryStore((state) => state.removeActivity);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (activityId: string) => {
      removeActivity(activityId);
      return activityId;
    },
    onSuccess: () => {
      toast.success("Activity removed from itinerary");
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to remove activity from itinerary");
    },
  });
}

export function useUpdateActivityDay() {
  const updateActivityDay = useItineraryStore(
    (state) => state.updateActivityDay
  );
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      activityId,
      day,
    }: {
      activityId: string;
      day: number;
    }) => {
      updateActivityDay(activityId, day);
      return { activityId, day };
    },
    onSuccess: () => {
      toast.success("Activity day updated");
      queryClient.invalidateQueries({ queryKey: ["itinerary"] });
    },
    onError: () => {
      toast.error("Failed to update activity day");
    },
  });
}

