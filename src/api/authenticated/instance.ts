import { api } from "@/api/instance";
import { HTTPError } from "ky";

export const authenticatedApi = api.extend({
  retry: {
    limit: 2,
    methods: ["get", "post", "put", "delete", "options", "trace"],
    statusCodes: [401, 404],
    afterStatusCodes: [401, 404],
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
        if (error instanceof HTTPError) {
          const status = error.response.status;
          if (status === 401) {
            try {
              const accessToken = import.meta.env.VITE_ACCESSTOKEN;
              if (accessToken) {
                request.headers.set("Authorization", `Bearer ${accessToken}`);
              }
            } catch (err) {
              console.error(err);
              localStorage.removeItem("accessToken");
              window.location.href = "/login";
            }
          }
          if (status === 404) {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
          }
        }
      },
    ],
  },
});
