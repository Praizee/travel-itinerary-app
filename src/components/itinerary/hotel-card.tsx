"use client";

import Image from "next/image";
import { m, type Variants } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { Hotel, HotelFacility } from "@/types/domain";
import { formatCurrency, formatDate, cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks";
import {
  BarIcon,
  BedIcon,
  CalendarIcon,
  MapPinIcon,
  PoolIcon,
  StarIcon,
} from "../icons";

interface HotelCardProps {
  hotel: Hotel;
  onRemove?: () => void;
  onEdit?: () => void;
  isRemoving?: boolean;
  className?: string;
}

const facilityIcons: Partial<Record<HotelFacility, React.ReactNode>> = {
  pool: <PoolIcon className="size-5" />,
  bar: <BarIcon className="size-5" />,
  gym: <span className=" font-bold">GYM</span>,
  spa: <span className=" font-bold">SPA</span>,
  wifi: <span className=" font-bold">WIFI</span>,
  parking: <span className=" font-bold">P</span>,
  restaurant: <span className=" font-bold">REST</span>,
};

export function HotelCard({
  hotel,
  onRemove,
  onEdit,
  isRemoving,
  className,
}: HotelCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  } as const satisfies Variants;

  return (
    <m.div
      className={cn(
        "relative flex overflow-hidden rounded-md bg-white shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
      variants={prefersReducedMotion ? undefined : cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
      layout
    >
      <div className="p-6 pr-0 shrink-0">
        <div className="relative w-58 h-56 bg-neutral-200 rounded-sm overflow-hidden">
          {hotel.images[0] ? (
            <Image
              src={hotel.images[0]}
              alt={hotel.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-black text-sm">No image</span>
            </div>
          )}

          <button
            type="button"
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-transform hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-neutral-800 shadow-sm transition-transform hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full shadow-sm",
                  i === 0 ? "bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col text-black-secondary text-lg!">
        <div className="flex justify-between p-5 pb-3">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-black">{hotel.name}</h3>
            <p className="mt-1 text-base text-black-primary line-clamp-2 leading-relaxed max-w-111.25 w-full">
              {hotel.address}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <button className="flex items-center gap-1.5 font-medium text-primary-600 hover:underline">
                <MapPinIcon className="size-5" />
                Show in map
              </button>

              <div className="flex items-center gap-1.5">
                <StarIcon className="size-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-black-primary">
                  {hotel.rating.toFixed(1)}
                </span>
                <span>({hotel.reviewCount})</span>
              </div>

              <div className="flex items-center gap-1.5">
                <BedIcon className="size-5" />
                <span>{hotel.roomType}</span>
              </div>
            </div>
          </div>

          <div className="text-right min-w-35 text-black-primary">
            <p className="text-2xl xl:text-[28px] font-semibold">
              {formatCurrency(
                hotel.totalPrice / hotel.nights,
                hotel.currency,
              )}{" "}
            </p>
            <p className="mt-1 ">
              Total Price: {formatCurrency(hotel.totalPrice, hotel.currency)}
            </p>
            <p className="mt-0.5">
              {hotel.guests || 1} room x {hotel.nights} nights incl. taxes
            </p>
          </div>
        </div>

        <div className="mt-auto border-y border-neutral-400 bg-white px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-medium">Facilities:</span>
              {hotel.facilities.slice(0, 4).map((facility) => (
                <span
                  key={facility}
                  className="flex items-center gap-2 text-lg"
                >
                  <span className="text-neutral-800">
                    {facilityIcons[facility] || (
                      <div className="h-1 w-1 rounded-full bg-neutral-400" />
                    )}
                  </span>
                  {facility.charAt(0).toUpperCase() + facility.slice(1)}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 text-lg">
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-5" />
                <span>Check In:</span>
                <span className="font-medium text-neutral-700">
                  {formatDate(hotel.checkInDate)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="size-5" />
                <span>Check Out:</span>
                <span className="font-medium text-neutral-700">
                  {formatDate(hotel.checkOutDate)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-white text-lg">
          <div className="flex gap-6">
            <button className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
              Hotel details
            </button>
            <button className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
              Price details
            </button>
          </div>
          {onEdit && (
            <button
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
          onClick={onRemove}
          disabled={isRemoving}
          className="group flex w-12 shrink-0 flex-col items-center justify-center border-l border-red-100 bg-red-50 hover:bg-red-100 transition-colors disabled:opacity-50"
          aria-label="Remove hotel"
        >
          <X className="h-6 w-6 text-red-600 transition-transform group-hover:scale-110" />
        </button>
      )}
    </m.div>
  );
}

