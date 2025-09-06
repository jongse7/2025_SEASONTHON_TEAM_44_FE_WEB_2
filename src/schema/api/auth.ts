import { z } from "zod";

export const getCallbackResponseSchema = z.object({
  response: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
});

export type GetCallbackResponse = z.infer<typeof getCallbackResponseSchema>;
