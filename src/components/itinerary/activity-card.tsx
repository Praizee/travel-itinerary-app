"use client";

import Image from "next/image";
import { m, type Variants } from "framer-motion";
import { X, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import type { Activity } from "@/types/domain";
import { formatCurrency, cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks";
import {
  ChevronCircleDownIcon,
  ChevronCircleUpIcon,
  MapPinIcon,
} from "../icons";

interface ActivityCardProps {
  activity: Activity;
  onRemove?: () => void;
  onEdit?: () => void;
  onDayChange?: (day: number) => void;
  isRemoving?: boolean;
  className?: string;
}

export function ActivityCard({
  activity,
  onRemove,
  onEdit,
  onDayChange,
  isRemoving,
  className,
}: ActivityCardProps) {
  const prefersReducedMotion = useReducedMotion();

  const cardVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -100 },
  } as const satisfies Variants;

  return (
    <m.div
      className={cn(
        // CHANGED: Removed 'pl-6' so the wrapper controls the padding
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
          {activity.images[0] ? (
            <Image
              src={activity.images[0]}
              alt={activity.name}
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

      <div className="flex flex-1 flex-col">
        <div className="flex justify-between p-5 pb-3">
          <div className="flex-1 pr-4">
            <h3 className="text-xl font-bold text-black">{activity.name}</h3>
            <p className="mt-1 text-base text-black-primary line-clamp-2 leading-relaxed max-w-111.25 w-full">
              {activity.description}
            </p>

            <div className="mt-3 flex items-center gap-4">
              <button className="flex items-center gap-1.5 font-medium text-primary-600 hover:underline">
                <MapPinIcon className="size-5" />
                Directions
              </button>

              <div className="flex items-center gap-1.5">
                <Star className="size-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-black-primary">
                  {activity.rating.toFixed(1)}
                </span>
                <span className="">({activity.reviewCount})</span>
              </div>

              <div className="flex items-center gap-1.5">
                <Clock className="size-5 " />
                <span>{activity.duration}</span>
              </div>
            </div>
          </div>

          <div className="text-right min-w-35 text-black-primary">
            <p className="text-2xl xl:text-[28px] font-semibold">
              {formatCurrency(activity.price, activity.currency)}
            </p>
            <p className="mt-1">
              {activity.dateTime
                ? new Date(activity.dateTime).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })
                : "10:30 AM"}{" "}
              on{" "}
              {activity.dateTime
                ? new Date(activity.dateTime).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Mar 19"}
            </p>
          </div>
        </div>

        <div className="mt-auto border-y border-neutral-400 bg-white px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center gap-2 overflow-hidden">
              <span className="shrink-0 font-medium ">
                What&apos;s Included:
              </span>
              <span className="truncate">
                {activity.whatIsIncluded.length > 0
                  ? activity.whatIsIncluded.join(", ")
                  : "Admission ticket"}
              </span>
              <button className="shrink-0 font-medium text-primary-600 hover:underline">
                See more
              </button>
            </div>

            {onDayChange && (
              <div className="ml-4 flex items-center gap-2">
                <span className="rounded-sm px-2 py-0.5 text-xs font-medium bg-primary text-white capitalize">
                  Day {activity.day}
                </span>
                <div className="flex flex-col gap-0.5">
                  <button
                    onClick={() => onDayChange(activity.day + 1)}
                    className="flex size-5 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover"
                    aria-label="Increase day"
                  >
                    <ChevronCircleUpIcon className="size-5" />
                  </button>
                  <button
                    onClick={() => onDayChange(Math.max(1, activity.day - 1))}
                    className="flex size-5 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover"
                    aria-label="Decrease day"
                  >
                    <ChevronCircleDownIcon className="size-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-white text-lg">
          <div className="flex gap-6">
            <button className="font-medium text-primary-600 hover:text-primary-700 hover:underline">
              Activity details
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
          aria-label="Remove activity"
        >
          <X className="h-6 w-6 text-red-600 transition-transform group-hover:scale-110" />
        </button>
      )}
    </m.div>
  );
}

