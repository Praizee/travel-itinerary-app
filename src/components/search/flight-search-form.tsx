"use client";

import { useForm, type FieldValues } from "react-hook-form";
import { Search, MapPin, Calendar, Users, ArrowRightLeft } from "lucide-react";
import { Button, Input, Select } from "@/components/ui";
import { cn } from "@/lib/utils";

type FlightSearchFormData = {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  adults: number;
  children?: number;
  cabinClass?: "economy" | "business" | "first";
};

interface FlightSearchFormProps {
  onSubmit: (data: FlightSearchFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<FlightSearchFormData>;
  className?: string;
}

export function FlightSearchForm({
  onSubmit,
  isLoading,
  defaultValues,
  className,
}: FlightSearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<FlightSearchFormData>({
    defaultValues: {
      origin: "",
      destination: "",
      departureDate: "",
      returnDate: "",
      adults: 1,
      children: 0,
      cabinClass: "economy",
      ...defaultValues,
    },
  });

  const handleSwapLocations = () => {
    const origin = getValues("origin");
    const destination = getValues("destination");
    setValue("origin", destination);
    setValue("destination", origin);
  };

  const submitHandler = (data: FieldValues) => {
    onSubmit(data as FlightSearchFormData);
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
        {/* Origin */}
        <div className="">
          <Input
            label="From"
            placeholder="City or airport"
            leftIcon={<MapPin className="h-4 w-4" />}
            error={errors.origin?.message}
            {...register("origin")}
          />
        </div>

        {/* Swap button */}
        <div className="flex items-end justify-center md:col-span-1">
          <button
            type="button"
            onClick={handleSwapLocations}
            className="mb-1 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-600 transition-colors hover:border-primary-600 hover:text-primary-600"
            aria-label="Swap origin and destination"
          >
            <ArrowRightLeft className="h-4 w-4" />
          </button>
        </div>

        {/* Destination */}
        <div className="">
          <Input
            label="To"
            placeholder="City or airport"
            leftIcon={<MapPin className="h-4 w-4" />}
            error={errors.destination?.message}
            {...register("destination")}
          />
        </div>

        {/* Departure date */}
        <div className="">
          <Input
            label="Departure"
            type="date"
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.departureDate?.message}
            {...register("departureDate")}
          />
        </div>

        {/* Return date */}
        <div className="md:col-span-2">
          <Input
            label="Return"
            type="date"
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.returnDate?.message}
            {...register("returnDate")}
          />
        </div>

        {/* Search button */}
        <div className="flex items-end md:col-span-1">
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

      {/* Additional options */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-neutral-300 pt-4">
        <div className="w-32">
          <Input
            label="Adults"
            type="number"
            min={1}
            max={9}
            leftIcon={<Users className="h-4 w-4" />}
            error={errors.adults?.message}
            {...register("adults")}
          />
        </div>

        <div className="w-32">
          <Input
            label="Children"
            type="number"
            min={0}
            max={9}
            leftIcon={<Users className="h-4 w-4" />}
            error={errors.children?.message}
            {...register("children")}
          />
        </div>

        <div className="w-40">
          <Select
            label="Cabin Class"
            options={[
              { value: "economy", label: "Economy" },
              { value: "business", label: "Business" },
              { value: "first", label: "First Class" },
            ]}
            error={errors.cabinClass?.message}
            {...register("cabinClass")}
          />
        </div>
      </div>
    </form>
  );
}

export type { FlightSearchFormData };

