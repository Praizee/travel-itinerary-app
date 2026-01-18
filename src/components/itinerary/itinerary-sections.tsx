"use client";

import { AnimatePresence } from "framer-motion";
import type { Flight, Hotel as HotelType, Activity } from "@/types/domain";
import { FlightCard } from "./flight-card";
import { HotelCard } from "./hotel-card";
import { ActivityCard } from "./activity-card";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { ActivitiesIcon, AirplaneInFlightIcon, HotelIcon } from "../icons";
import Image from "next/image";

interface ItinerarySectionProps<T> {
  title: string;
  icon: React.ReactNode;
  items: T[];
  onAddClick: () => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  addButtonLabel: string;
  image: string;
  imageSize?: string;
  imageWidth?: number;
  imageHeight?: number;
  className?: string;
  sectionColor?: string;
  textColor?: string;
}

function ItinerarySection<T extends { id: string }>({
  title,
  icon,
  items,
  onAddClick,
  renderItem,
  addButtonLabel,
  image,
  imageSize,
  imageHeight,
  imageWidth,
  className,
  textColor = "text-white",
  sectionColor = "bg-neutral-300/50",
}: ItinerarySectionProps<T>) {
  return (
    <div
      className={cn(
        "rounded-sm overflow-hidden p-6 flex flex-col gap-6",
        sectionColor,
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className={cn("flex items-center gap-2.5", textColor)}>
            {icon}
            <span className="md:text-lg font-semibold">{title}</span>
          </div>
        </div>

        {items.length > 0 && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onAddClick}
            className="w-38.25 bg-white text-primary-600 py-3 px-6 hover:bg-gray-50 transition-colors duration-150 text-sm font-medium h-11.5 cursor-pointer"
          >
            {addButtonLabel}
          </Button>
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          items.length === 0 ? "bg-white" : "bg-transparent",
          "rounded-sm",
        )}
      >
        {items.length === 0 ? (
          <>
            <div className="flex flex-col gap-2 justify-center items-center text-center max-w-42.75 mx-auto h-71.5">
              <Image
                src={image}
                alt={title}
                className={imageSize}
                width={imageWidth}
                height={imageHeight}
              />

              <p className="text-black-primary text-sm font-medium">
                No Request yet
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAddClick}
                className="w-full bg-primary-600 text-white py-3 px-6 hover:bg-primary-700 transition-colors duration-150 text-sm font-medium h-11.5 cursor-pointer"
              >
                {addButtonLabel}
              </Button>
            </div>
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="space-y-4">
              {items.map((item, index) => renderItem(item, index))}
            </div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

interface FlightsSectionProps {
  flights: Flight[];
  onAddClick: () => void;
  onRemoveFlight: (id: string) => void;
  onEditFlight?: (flight: Flight) => void;
  removingId?: string;
}

export function FlightsSection({
  flights,
  onAddClick,
  onRemoveFlight,
  onEditFlight,
  removingId,
}: FlightsSectionProps) {
  return (
    <ItinerarySection
      title="Flights"
      icon={<AirplaneInFlightIcon className="size-6 text-neutral-900" />}
      items={flights}
      onAddClick={onAddClick}
      addButtonLabel="Add Flights"
      image="/plane.svg"
      imageWidth={100}
      imageHeight={52}
      imageSize="w-25 h-[52px]"
      sectionColor="bg-neutral-300"
      textColor="text-black-primary"
      renderItem={(flight) => (
        <FlightCard
          key={flight.id}
          flight={flight}
          onRemove={() => onRemoveFlight(flight.id)}
          onEdit={onEditFlight ? () => onEditFlight(flight) : undefined}
          isRemoving={removingId === flight.id}
        />
      )}
    />
  );
}

interface HotelsSectionProps {
  hotels: HotelType[];
  onAddClick: () => void;
  onRemoveHotel: (id: string) => void;
  onEditHotel?: (hotel: HotelType) => void;
  removingId?: string;
}

export function HotelsSection({
  hotels,
  onAddClick,
  onRemoveHotel,
  onEditHotel,
  removingId,
}: HotelsSectionProps) {
  return (
    <ItinerarySection
      title="Hotels"
      icon={<HotelIcon className="size-6 text-white" />}
      items={hotels}
      onAddClick={onAddClick}
      addButtonLabel="Add Hotels"
      image="/hotel.svg"
      imageWidth={70}
      imageHeight={70}
      imageSize="w-[70px] h-[70px]"
      sectionColor="bg-neutral-900"
      renderItem={(hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          onRemove={() => onRemoveHotel(hotel.id)}
          onEdit={onEditHotel ? () => onEditHotel(hotel) : undefined}
          isRemoving={removingId === hotel.id}
        />
      )}
    />
  );
}

interface ActivitiesSectionProps {
  activities: Activity[];
  onAddClick: () => void;
  onRemoveActivity: (id: string) => void;
  onEditActivity?: (activity: Activity) => void;
  onDayChange?: (activityId: string, day: number) => void;
  removingId?: string;
}

export function ActivitiesSection({
  activities,
  onAddClick,
  onRemoveActivity,
  onEditActivity,
  onDayChange,
  removingId,
}: ActivitiesSectionProps) {
  return (
    <ItinerarySection
      title="Activities"
      icon={<ActivitiesIcon className="size-6 text-white" />}
      items={activities}
      onAddClick={onAddClick}
      addButtonLabel="Add Activities"
      image="/activity.svg"
      imageWidth={56}
      imageHeight={72}
      imageSize="w-[56px] h-[72px]"
      sectionColor="bg-primary-700"
      renderItem={(activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onRemove={() => onRemoveActivity(activity.id)}
          onEdit={onEditActivity ? () => onEditActivity(activity) : undefined}
          onDayChange={
            onDayChange ? (day) => onDayChange(activity.id, day) : undefined
          }
          isRemoving={removingId === activity.id}
        />
      )}
    />
  );
}

