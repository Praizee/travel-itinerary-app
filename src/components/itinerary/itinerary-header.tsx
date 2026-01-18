"use client";

import { ArrowLeft, ArrowRight, Ellipsis } from "lucide-react";
import type { Itinerary } from "@/types/domain";
import { Button } from "@/components/ui";
import { formatDate, cn } from "@/lib/utils";
import { CalendarIcon, SettingsIcon, UserPlusIcon } from "../icons";
import Image from "next/image";

interface ItineraryHeaderProps {
  itinerary: Itinerary;
  onBack?: () => void;
  className?: string;
}

export function ItineraryHeader({
  itinerary,
  onBack,
  className,
}: ItineraryHeaderProps) {
  return (
    <div
      className={cn("rounded overflow-hidden flex flex-col gap-5", className)}
    >
      {/* Hero image */}
      <div className="relative h-50 bg-[url('/banner.png')] bg-cover bg-left min-[1440px]:bg-center bg-no-repeat rounded-sm">
        <button
          onClick={onBack}
          className="absolute left-6 top-6 flex size-12 items-center justify-center rounded-sm bg-white/20 text-neutral-900 transition-colors duration-150 hover:bg-white/80 cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft className="size-6" />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-start gap-8 justify-between">
          <div className="flex flex-col gap-1">
            <div className="w-fit flex items-center gap-1 text-sm font-medium text-secondary-900 py-1 px-2 bg-secondary-100">
              <CalendarIcon className="size-4" />
              <span>{formatDate(itinerary.startDate)}</span>
              <ArrowRight className="size-4" />
              <span>{formatDate(itinerary.endDate)}</span>
            </div>

            <h1 className="text-2xl font-semibold text-black">
              {itinerary.name}
            </h1>

            {/* Destination and trip type */}
            <p className="text-base text-black-secondary font-medium">
              {itinerary.destination}{" "}
              <span className="text-neutral-500">|</span>{" "}
              {itinerary.tripType.charAt(0).toUpperCase() +
                itinerary.tripType.slice(1)}{" "}
              Trip
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                className="w-40 bg-primary-100 text-primary-600 py-3 px-6 hover:bg-gray-50 transition-colors duration-150 text-sm font-medium h-11.5 cursor-pointer"
              >
                <UserPlusIcon />
              </Button>
              <button
                aria-label="More"
                type="button"
                className="size-6 bg-transparent hover:bg-gray-50 text-neutral-900! transition-colors duration-150 rounded-sm"
              >
                <Ellipsis className="size-5" />
              </button>
            </div>

            <div className="flex items-center">
              <div className="size-10 overflow-hidden rounded-full">
                <Image src="/1.svg" alt="Avatar" width={40} height={40} />
              </div>
              <span className="border-2 border-primary-100 h-0.5 w-7.5" />
              <button
                type="button"
                aria-label="Settings"
                className="size-10 bg-transparent flex items-center justify-center border-2 border-[#E7F0FF] hover:bg-gray-50 text-neutral-900! transition-colors duration-150 rounded-full cursor-pointer"
              >
                <SettingsIcon />
              </button>
            </div>
          </div>
        </div>

        {/* Quick add cards */}
        <div className="flex gap-1 flex-wrap">
          <QuickAddCard
            title="Activities"
            description="Build, personalize, and optimize your itineraries with our trip planner."
            buttonLabel="Add Activities"
            variant="activities"
          />
          <QuickAddCard
            title="Hotels"
            description="Build, personalize, and optimize your itineraries with our trip planner."
            buttonLabel="Add Hotels"
            variant="hotels"
          />
          <QuickAddCard
            title="Flights"
            description="Build, personalize, and optimize your itineraries with our trip planner."
            buttonLabel="Add Flights"
            variant="flights"
          />
        </div>
      </div>
    </div>
  );
}

interface QuickAddCardProps {
  title: string;
  description: string;
  buttonLabel: string;
  variant: "activities" | "hotels" | "flights";
  onClick?: () => void;
}

function QuickAddCard({
  title,
  description,
  buttonLabel,
  variant,
  onClick,
}: QuickAddCardProps) {
  const variantStyles = {
    activities: "bg-primary-1100 text-white",
    hotels: "bg-primary-100 text-black-primary",
    flights: "bg-primary-600 text-white",
  };

  const buttonStyles = {
    activities: "bg-primary-600 text-white hover:bg-primary-700",
    hotels: "bg-[#0D6EFD] text-white hover:bg-blue-600",
    flights: "bg-white text-[#0D6EFD] hover:bg-gray-50",
  };

  return (
    <div
      className={cn(
        "rounded-sm py-4 px-3.5 flex flex-col gap-8 w-full sm:max-w-67.5",
        variantStyles[variant],
      )}
    >
      <div className="space-y-2">
        <h3 className="text-base font-semibold">{title}</h3>
        <p className="text-sm text-inherit opacity-90 line-clamp-2">
          {description}
        </p>
      </div>

      <Button
        size="sm"
        className={cn(
          "w-full font-medium border-none transition-colors h-11.5 text-sm",
          buttonStyles[variant],
        )}
        onClick={onClick}
      >
        {buttonLabel}
      </Button>
    </div>
  );
}

