"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button, Input, Select } from "@/components/ui";
import { cn } from "@/lib/utils";

const activitySearchSchema = z.object({
  destination: z.string().min(1, "Destination is required"),
  date: z.string().optional(),
  category: z.string().optional(),
});

type ActivitySearchFormData = z.infer<typeof activitySearchSchema>;

interface ActivitySearchFormProps {
  onSubmit: (data: ActivitySearchFormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ActivitySearchFormData>;
  className?: string;
}

const categoryOptions = [
  { value: "", label: "All categories" },
  { value: "museum", label: "Museums" },
  { value: "tour", label: "Tours" },
  { value: "adventure", label: "Adventure" },
  { value: "food", label: "Food & Dining" },
  { value: "entertainment", label: "Entertainment" },
  { value: "sightseeing", label: "Sightseeing" },
  { value: "shopping", label: "Shopping" },
  { value: "wellness", label: "Wellness & Spa" },
];

export function ActivitySearchForm({
  onSubmit,
  isLoading,
  defaultValues,
  className,
}: ActivitySearchFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivitySearchFormData>({
    resolver: zodResolver(activitySearchSchema),
    defaultValues: {
      destination: "",
      date: "",
      category: "",
      ...defaultValues,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn(
        "rounded-sm border border-neutral-300 bg-white p-4",
        className,
      )}
    >
      <div className="flex gap-4 flex-wrap">
        {/* Destination */}
        <div className="">
          <Input
            label="Destination"
            placeholder="City or region"
            leftIcon={<MapPin className="h-4 w-4" />}
            error={errors.destination?.message}
            {...register("destination")}
          />
        </div>

        {/* Date */}
        <div className="">
          <Input
            label="Date"
            type="date"
            leftIcon={<Calendar className="h-4 w-4" />}
            error={errors.date?.message}
            {...register("date")}
          />
        </div>

        {/* Category */}
        <div className="">
          <Select
            label="Category"
            options={categoryOptions}
            error={errors.category?.message}
            {...register("category")}
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

export type { ActivitySearchFormData };

