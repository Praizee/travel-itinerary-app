"use client";

import { m, type Variants } from "framer-motion";
import { X, Info } from "lucide-react";
import type { Flight, FlightFacility } from "@/types/domain";
import { Badge } from "@/components/ui";
import { formatCurrency, formatTime, cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks";
import {
  AirplaneLandingIcon,
  AirplaneTakeoffIcon,
  BaggageIcon,
  FilmIcon,
  MealIcon,
  USBIcon,
} from "../icons";
import Image from "next/image";

interface FlightCardProps {
  flight: Flight;
  onRemove?: () => void;
  onEdit?: () => void;
  isRemoving?: boolean;
  className?: string;
}

const facilityIcons: Record<FlightFacility, React.ReactNode> = {
  "in-flight-entertainment": <FilmIcon className="size-5" />,
  "in-flight-meal": <MealIcon className="size-5" />,
  "usb-port": <USBIcon className="size-5" />,
  wifi: <Info className="size-5" />,
  "power-outlet": <Info className="size-5" />,
};

const facilityLabels: Record<FlightFacility, string> = {
  "in-flight-entertainment": "In flight entertainment",
  "in-flight-meal": "In flight meal",
  "usb-port": "USB Port",
  wifi: "WiFi",
  "power-outlet": "Power Outlet",
};

export function FlightCard({
  flight,
  onRemove,
  onEdit,
  isRemoving,
  className,
}: FlightCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  } as const satisfies Variants;

  const classLabel =
    flight.flightClass === "economy"
      ? "Economy"
      : flight.flightClass === "business"
        ? "Business"
        : "First Class";

  return (
    <m.div
      className={cn(
        "relative flex overflow-hidden rounded-sm bg-white transition-shadow hover:shadow-md",
        className,
      )}
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="flex-1 flex flex-col text-black-secondary text-lg!">
        <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4 min-w-50">
            <Image
              src="/airline.svg"
              alt="Airline logo"
              width={24}
              height={24}
            />

            <div>
              <h3 className="text-xl font-bold text-black-primary leading-tight">
                {flight.airline}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <span>{flight.flightNumber}</span>
                <span className="h-1 w-1 rounded-full bg-neutral-300" />
                <Badge
                  className="rounded-sm px-2 py-0.5 text-xs font-medium bg-primary text-white capitalize"
                  variant="primary"
                >
                  {classLabel}
                </Badge>
              </div>
            </div>
          </div>

          <div className="flex flex-1 items-center justify-between gap-6 px-4 md:px-12">
            <div className="text-center">
              <p className="text-2xl font-semibold text-black-primary leading-none">
                {formatTime(flight.departureTime)}
              </p>
              <p className="mt-1 text-sm font-medium">
                {new Date(flight.departureTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>

            <div className="flex flex-1 flex-col items-center w-full max-w-60 text-base">
              <div className="flex w-full items-center justify-between  mb-1">
                <AirplaneTakeoffIcon className="size-5" />
                <span className="font-medium">Duration: {flight.duration}</span>
                <AirplaneLandingIcon className="size-5" />
              </div>

              <div className="relative h-2 w-full rounded-full bg-primary-100">
                <div className="absolute left-0 top-0 h-full w-1/2 rounded-full bg-primary-600" />
              </div>

              <div className="flex w-full items-center justify-between mt-1">
                <span className="font-bold text-black-primary">
                  {flight.departureAirport}
                </span>
                <span>
                  {flight.stops === 0
                    ? "Direct"
                    : `${flight.stops} stop${flight.stops > 1 ? "s" : ""}`}
                </span>
                <span className="font-bold text-black-primary">
                  {flight.arrivalAirport}
                </span>
              </div>
            </div>

            <div className="text-center">
              <p className="text-2xl font-bold text-black-primary leading-none">
                {formatTime(flight.arrivalTime)}
              </p>
              <p className="mt-1 text-sm font-medium ">
                {new Date(flight.arrivalTime).toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                })}
              </p>
            </div>
          </div>

          <div className="text-right min-w-30">
            <p className="text-2xl xl:text-[28px] font-semibold text-black-primary">
              {formatCurrency(flight.price, flight.currency)}
            </p>
          </div>
        </div>

        <div className="border-y border-neutral-100 bg-white px-6 py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg">
            <span className="flex items-center gap-2 font-medium">
              <span>Facilities:</span>
            </span>

            <span className="flex items-center gap-2">
              <BaggageIcon className="size-5 " />
              <span>
                Baggage: {flight.baggageAllowance.checkedBaggage}, Cabin:{" "}
                {flight.baggageAllowance.cabinBaggage}
              </span>
            </span>

            {flight.facilities.map((facility) => (
              <span key={facility} className="flex items-center gap-2">
                <span>{facilityIcons[facility]}</span>
                <span>{facilityLabels[facility]}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-white text-lg">
          <div className="flex gap-6">
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Flight details
            </button>
            <button
              type="button"
              className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Price details
            </button>
          </div>

          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
            >
              Edit details
            </button>
          )}
        </div>
      </div>

      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          disabled={isRemoving}
          className="group flex w-12 flex-col items-center justify-center border-l border-red-100 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
          aria-label="Remove flight"
        >
          <X className="h-6 w-6 text-red-600 transition-transform group-hover:scale-110" />
        </button>
      )}
    </m.div>
  );
}

