import { api } from '@/api/instance';
import { HTTPError } from 'ky';

export const authenticatedApi = api.extend({
  retry: {
    limit: 0,
    methods: ['get', 'post', 'put', 'delete', 'options', 'trace'],
    statusCodes: [],
    afterStatusCodes: [],
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    beforeRetry: [
      async ({ error }) => {
        if (error instanceof HTTPError) {
          const status = error.response.status;
          console.log(status);
          if (status === 403 || status === 404) {
            localStorage.removeItem('accessToken');
            window.location.href = '/login';
          }
        }
      },
    ],
  },
});
