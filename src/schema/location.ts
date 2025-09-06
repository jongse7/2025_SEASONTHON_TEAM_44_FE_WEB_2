import { z } from "zod";

export const LocationDataSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  accuracy: z.number(),
});

export type LocationData = z.infer<typeof LocationDataSchema>;
