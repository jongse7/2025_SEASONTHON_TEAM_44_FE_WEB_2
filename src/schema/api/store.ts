import { z } from "zod";

export const postStoreVisitResponseSchema = z.object({
  response: z.object({
    id: z.number(),
  }),
});

export const postStoreRegisterResponseSchema = z.object({
  response: z.object({
    id: z.number(),
  }),
});

export const getStoreRegularResponseSchema = z.object({
  response: z.boolean(),
});

export type PostStoreVisitResponseSchema = z.infer<
  typeof postStoreVisitResponseSchema
>;

export type PostStoreRegisterResponseSchema = z.infer<
  typeof postStoreRegisterResponseSchema
>;

export type GetStoreRegularResponseSchema = z.infer<
  typeof getStoreRegularResponseSchema
>;
