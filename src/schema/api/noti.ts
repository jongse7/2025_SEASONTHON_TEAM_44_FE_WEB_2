import { z } from "zod";

export const postNotiReadResponseSchema = z.object({
  response: z.object({
    id: z.number(),
  }),
});

export type PostNotiReadResponseSchema = z.infer<
  typeof postNotiReadResponseSchema
>;
