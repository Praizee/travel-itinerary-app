"use client";

import { m, AnimatePresence } from "framer-motion";
import type { Flight, Hotel, Activity } from "@/types/domain";
import { FlightCard } from "@/components/itinerary/flight-card";
import { HotelCard } from "@/components/itinerary/hotel-card";
import { ActivityCard } from "@/components/itinerary/activity-card";
import { LoadingState, EmptyState, ErrorState, Button } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { cn } from "@/lib/utils";

interface SearchResultsBaseProps {
  isLoading: boolean;
  error?: Error | null;
  onRetry?: () => void;
  className?: string;
}

interface FlightSearchResultsProps extends SearchResultsBaseProps {
  flights: Flight[];
  onSelect: (flight: Flight) => void;
  selectedIds?: string[];
}

export function FlightSearchResults({
  flights,
  isLoading,
  error,
  onRetry,
  onSelect,
  selectedIds = [],
  className,
}: FlightSearchResultsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <LoadingState message="Searching for flights..." className={className} />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error.message || "Failed to search flights"}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (flights.length === 0) {
    return (
      <EmptyState
        type="no-results"
        title="No flights found"
        description="Try adjusting your search criteria"
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm text-neutral-700">
        {flights.length} flight{flights.length !== 1 ? "s" : ""} found
      </p>
      <AnimatePresence mode="popLayout">
        {flights.map((flight, index) => (
          <m.div
            key={flight.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <div className="relative">
              <FlightCard flight={flight} />
              <div className="absolute bottom-4 right-4">
                <Button
                  variant={
                    selectedIds.includes(flight.id) ? "secondary" : "primary"
                  }
                  size="sm"
                  onClick={() => onSelect(flight)}
                  disabled={selectedIds.includes(flight.id)}
                >
                  {selectedIds.includes(flight.id)
                    ? "Added"
                    : "Add to Itinerary"}
                </Button>
              </div>
            </div>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface HotelSearchResultsProps extends SearchResultsBaseProps {
  hotels: Hotel[];
  onSelect: (hotel: Hotel) => void;
  selectedIds?: string[];
}

export function HotelSearchResults({
  hotels,
  isLoading,
  error,
  onRetry,
  onSelect,
  selectedIds = [],
  className,
}: HotelSearchResultsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <LoadingState message="Searching for hotels..." className={className} />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error.message || "Failed to search hotels"}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (hotels.length === 0) {
    return (
      <EmptyState
        type="no-results"
        title="No hotels found"
        description="Try adjusting your search criteria"
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm text-neutral-700">
        {hotels.length} hotel{hotels.length !== 1 ? "s" : ""} found
      </p>
      <AnimatePresence mode="popLayout">
        {hotels.map((hotel, index) => (
          <m.div
            key={hotel.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <div className="relative">
              <HotelCard hotel={hotel} />
              <div className="absolute bottom-4 right-4">
                <Button
                  variant={
                    selectedIds.includes(hotel.id) ? "secondary" : "primary"
                  }
                  size="sm"
                  onClick={() => onSelect(hotel)}
                  disabled={selectedIds.includes(hotel.id)}
                >
                  {selectedIds.includes(hotel.id)
                    ? "Added"
                    : "Add to Itinerary"}
                </Button>
              </div>
            </div>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

interface ActivitySearchResultsProps extends SearchResultsBaseProps {
  activities: Activity[];
  onSelect: (activity: Activity) => void;
  selectedIds?: string[];
}

export function ActivitySearchResults({
  activities,
  isLoading,
  error,
  onRetry,
  onSelect,
  selectedIds = [],
  className,
}: ActivitySearchResultsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (isLoading) {
    return (
      <LoadingState
        message="Searching for activities..."
        className={className}
      />
    );
  }

  if (error) {
    return (
      <ErrorState
        message={error.message || "Failed to search activities"}
        onRetry={onRetry}
        className={className}
      />
    );
  }

  if (activities.length === 0) {
    return (
      <EmptyState
        type="no-results"
        title="No activities found"
        description="Try adjusting your search criteria"
        className={className}
      />
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <p className="text-sm text-neutral-700">
        {activities.length} activit{activities.length !== 1 ? "ies" : "y"} found
      </p>
      <AnimatePresence mode="popLayout">
        {activities.map((activity, index) => (
          <m.div
            key={activity.id}
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? {} : { opacity: 0, y: -20 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
          >
            <div className="relative">
              <ActivityCard activity={activity} />
              <div className="absolute bottom-4 right-4">
                <Button
                  variant={
                    selectedIds.includes(activity.id) ? "secondary" : "primary"
                  }
                  size="sm"
                  onClick={() => onSelect(activity)}
                  disabled={selectedIds.includes(activity.id)}
                >
                  {selectedIds.includes(activity.id)
                    ? "Added"
                    : "Add to Itinerary"}
                </Button>
              </div>
            </div>
          </m.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

