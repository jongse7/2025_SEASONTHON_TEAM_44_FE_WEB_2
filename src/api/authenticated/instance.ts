import { api } from "@/api/instance";
import { HTTPError } from "ky";

export const authenticatedApi = api.extend({
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "delete", "options", "trace"],
    statusCodes: [401],
    afterStatusCodes: [401],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
          request.headers.set("Authorization", `Bearer ${accessToken}`);
        }
      },
    ],
    beforeRetry: [
      async ({ request, error }) => {
        if (error instanceof HTTPError && error.response.status === 401) {
          try {
            const accessToken = import.meta.env.VITE_ACCESSTOKEN;
            if (accessToken) {
              request.headers.set("Authorization", `Bearer ${accessToken}`);
            }
          } catch (error) {
            console.error(error);
            window.location.href = "/login";
          }
        }
      },
    ],
  },
});
