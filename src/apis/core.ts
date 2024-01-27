import ky, { Input, KyResponse } from "ky";

import { getLocalStorage } from "@/utils/localStorage";

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
      (_request, _options, response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response;
      },
    ],
  },
});

const handleResponse = <Response>(response: KyResponse) => response.json<Response>();

export default {
  get: <Response>(url: Input) => kyInstance.get(url).then(handleResponse<Response>),
  post: <Response>(url: Input, json: unknown) =>
    kyInstance.post(url, { json }).then(handleResponse<Response>),
  patch: <Response>(url: Input, json: unknown) =>
    kyInstance.patch(url, { json }).then(handleResponse<Response>),
  put: <Response>(url: Input, json: unknown) =>
    kyInstance.patch(url, { json }).then(handleResponse<Response>),
  delete: <Response>(url: Input, json: unknown) =>
    kyInstance.patch(url, { json }).then(handleResponse<Response>),
};
