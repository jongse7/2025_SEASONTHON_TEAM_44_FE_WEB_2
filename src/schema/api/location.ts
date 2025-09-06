import { z } from "zod";

// 주소 변환 요청 스키마
export const geocodeAddressRequestSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export type GeocodeAddressRequest = z.infer<typeof geocodeAddressRequestSchema>;

export const geocodeAddressResponseSchema = z.object({
  response: z.object({
    address: z.string().transform((address) => {
      return address.trim().split(" ").pop() || "";
    }),
  }),
});

export type GeocodeAddressResponse = z.infer<
  typeof geocodeAddressResponseSchema
>;
