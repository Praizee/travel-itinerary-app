import { z } from "zod";

// Schema for validating search params
export const searchHotelsParamsSchema = z.object({
  destination: z.string().min(1),
  checkInDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  checkOutDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  adults: z.coerce.number().int().min(1).max(30),
  children: z.coerce.number().int().min(0).max(10).optional(),
  rooms: z.coerce.number().int().min(1).max(8).optional(),
});

export type SearchHotelsParamsInput = z.infer<typeof searchHotelsParamsSchema>;

// Schema for validating RapidAPI hotel response
export const rapidApiHotelSchema = z
  .object({
    hotel_id: z.union([z.string(), z.number()]).optional(),
    hotel_name: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    review_score: z.number().optional(),
    review_nr: z.number().optional(),
    main_photo_url: z.string().optional(),
    min_total_price: z.number().optional(),
    price_breakdown: z
      .object({
        gross_price: z.union([z.string(), z.number()]).optional(),
        currency: z.string().optional(),
        all_inclusive_price: z.number().optional(),
      })
      .optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    accommodation_type_name: z.string().optional(),
  })
  .passthrough();

export const rapidApiHotelResponseSchema = z
  .object({
    result: z.array(rapidApiHotelSchema).optional(),
  })
  .passthrough();

export type RapidApiHotelResponse = z.infer<typeof rapidApiHotelResponseSchema>;

