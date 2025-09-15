import ky from "ky";
import { apiErrorResponseSchema } from "@/schema/api/error";

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_API_URL,
  hooks: {
    beforeError: [
      async (error) => {
        try {
          const responseText = await error.response.text();
          if (responseText) {
            const { success, data } = apiErrorResponseSchema.safeParse(
              JSON.parse(responseText)
            );
            if (success) {
              error.message = data.message;
            }
          }
        } catch (parseError) {
          console.error(parseError);
        }
        if (error.response?.status === 403) {
          localStorage.clear();
          // window.location.href = "/login";
        }

        return error;
      },
    ],
  },
});
