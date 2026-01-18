import { z } from "zod";

// Schema for validating search params
export const searchActivitiesParamsSchema = z.object({
  destination: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  category: z.string().optional(),
});

export type SearchActivitiesParamsInput = z.infer<
  typeof searchActivitiesParamsSchema
>;

// Schema for validating RapidAPI activity response
export const rapidApiActivitySchema = z
  .object({
    id: z.union([z.string(), z.number()]).optional(),
    name: z.string().optional(),
    shortDescription: z.string().optional(),
    description: z.string().optional(),
    rating: z
      .object({
        average: z.number().optional(),
        count: z.number().optional(),
      })
      .optional(),
    pictures: z.array(z.string()).optional(),
    price: z
      .object({
        amount: z.number().optional(),
        currencyCode: z.string().optional(),
      })
      .optional(),
    duration: z.string().optional(),
    location: z
      .object({
        address: z.string().optional(),
        city: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

export const rapidApiActivityResponseSchema = z
  .object({
    data: z.array(rapidApiActivitySchema).optional(),
  })
  .passthrough();

export type RapidApiActivityResponse = z.infer<
  typeof rapidApiActivityResponseSchema
>;

