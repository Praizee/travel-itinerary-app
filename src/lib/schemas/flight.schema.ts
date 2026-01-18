import { z } from "zod";

// Schema for validating search params
export const searchFlightsParamsSchema = z.object({
  origin: z.string().min(2).max(5),
  destination: z.string().min(2).max(5),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  adults: z.coerce.number().int().min(1).max(9),
  children: z.coerce.number().int().min(0).max(9).optional(),
  infants: z.coerce.number().int().min(0).max(9).optional(),
  cabinClass: z.enum(["economy", "business", "first"]).optional(),
});

export type SearchFlightsParamsInput = z.infer<
  typeof searchFlightsParamsSchema
>;

// Schema for validating RapidAPI flight response
export const rapidApiFlightSchema = z
  .object({
    id: z.string().optional(),
    legs: z
      .array(
        z.object({
          departure: z.string().optional(),
          arrival: z.string().optional(),
          origin: z
            .object({
              id: z.string().optional(),
              name: z.string().optional(),
              city: z.string().optional(),
            })
            .optional(),
          destination: z
            .object({
              id: z.string().optional(),
              name: z.string().optional(),
              city: z.string().optional(),
            })
            .optional(),
          durationInMinutes: z.number().optional(),
          stopCount: z.number().optional(),
          carriers: z
            .object({
              marketing: z
                .array(
                  z.object({
                    id: z.number().optional(),
                    name: z.string().optional(),
                    logoUrl: z.string().optional(),
                  })
                )
                .optional(),
            })
            .optional(),
        })
      )
      .optional(),
    price: z
      .object({
        raw: z.number().optional(),
        formatted: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

export const rapidApiFlightResponseSchema = z
  .object({
    status: z.boolean().optional(),
    data: z
      .object({
        itineraries: z.array(rapidApiFlightSchema).optional(),
      })
      .optional(),
  })
  .passthrough();

export type RapidApiFlightResponse = z.infer<
  typeof rapidApiFlightResponseSchema
>;

