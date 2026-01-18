"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { Search, MapPin, Calendar, Users, Bed } from "lucide-react";
import { Button, Input } from "@/components/ui";
import { cn } from "@/lib/utils";

type HotelSearchFormData = {
  destination: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children?: number;
  rooms?: number;
};

interface HotelSearchFormProps {
  onSubmit: (data: HotelSearchFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<HotelSearchFormData>;
  className?: string;
}

export function HotelSearchForm({
  onSubmit,
  isLoading,
  defaultValues,
  className,
}: HotelSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HotelSearchFormData>({
    defaultValues: {
      destination: "",
      checkInDate: "",
      checkOutDate: "",
      adults: 2,
      children: 0,
      rooms: 1,
      ...defaultValues,
    },
  });

  const submitHandler = (data: FieldValues) => {
    onSubmit(data as HotelSearchFormData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={cn(
        "rounded-sm border border-neutral-300 bg-white p-4",
        className,
      )}
    >
      <div className="flex gap-4 flex-wrap">
        {/* Destination */}
        <div className="md:col-span-4">
          <Input
            label="Destination"
            placeholder="City, region, or hotel name"
            leftIcon={<MapPin className="h-4 w-4" />}
            error={errors.destination?.message}
            {...register("destination")}
          />
        </div>

        {/* Check-in date */}
        <div className="">
          <Input
            label="Check-in"
            type="date"
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.checkInDate?.message}
            {...register("checkInDate")}
          />
        </div>

        {/* Check-out date */}
        <div className="">
          <Input
            label="Check-out"
            type="date"
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.checkOutDate?.message}
            {...register("checkOutDate")}
          />
        </div>

        {/* Guests */}
        <div className="">
          <Input
            label="Adults"
            type="number"
            min={1}
            max={30}
            leftIcon={<Users className="h-4 w-4" />}
            error={errors.adults?.message}
            {...register("adults")}
          />
        </div>

        {/* Rooms */}
        <div className="md:col-span-1">
          <Input
            label="Rooms"
            type="number"
            min={1}
            max={8}
            leftIcon={<Bed className="h-4 w-4" />}
            error={errors.rooms?.message}
            {...register("rooms")}
          />
        </div>

        {/* Search button */}
        <div className="flex items-end">
          <Button
            type="submit"
            variant="primary"
            className="h-10 w-full"
            isLoading={isLoading}
            leftIcon={<Search className="h-4 w-4" />}
          >
            <span className="hidden lg:inline">Search</span>
          </Button>
        </div>
      </div>
    </form>
  );
}

export type { HotelSearchFormData };

