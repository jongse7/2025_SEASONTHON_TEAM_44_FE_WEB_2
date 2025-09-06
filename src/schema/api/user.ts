import { z } from "zod";

export const GetUserLocationSchema = z.object({
  response: z.boolean(),
});

export type GetUserLocation = z.infer<typeof GetUserLocationSchema>;

export const PostUserLocationSchema = z.object({
  response: z.string(),
});

export const GetUserMeSimpleSchema = z.object({
  response: z.object({
    name: z.string(),
    profileImageUrl: z.string(),
    region: z.string(),
  }),
});

export type GetUserMeSimple = z.infer<typeof GetUserMeSimpleSchema>;
