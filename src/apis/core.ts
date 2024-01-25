import ky, { Input, Options } from "ky";

import { getLocalStorage } from "@/utils/localStorage";

const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
} as const;

type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      (request) => {
        const token = getLocalStorage("token");

        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (request, options, response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response;
      },
    ],
  },
});
const createApiMethod =
  (method: HttpMethod) =>
  async <T>(url: Input, options: Options = {}): Promise<T> => {
    const response = await kyInstance(url, { ...options, method });
    return response.json<T>();
  };

export default {
  get: createApiMethod(HTTP_METHODS.GET),
  post: createApiMethod(HTTP_METHODS.POST),
  patch: createApiMethod(HTTP_METHODS.PATCH),
  put: createApiMethod(HTTP_METHODS.PUT),
  delete: createApiMethod(HTTP_METHODS.DELETE),
};
