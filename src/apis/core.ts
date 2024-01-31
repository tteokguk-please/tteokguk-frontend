import ky, { Input, KyResponse } from "ky";

import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { isExpiredAccessToken } from "@/utils/token";

import { LoginResponse } from "@/types/auth";

const kyInstance = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        await setAuthHeader(request);
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

const setAuthHeader = async (request: Request) => {
  const storedToken = getLocalStorage("accessToken");
  const currentToken = isExpiredAccessToken(storedToken)
    ? await refreshAccessToken(getLocalStorage("refreshToken"))
    : storedToken;

  if (currentToken) {
    request.headers.set("Authorization", `Bearer ${currentToken}`);
  }
};

const refreshAccessToken = async (token: string) => {
  try {
    const { accessToken, refreshToken } = await ky
      .post("api/v1/auth/token", {
        prefixUrl: import.meta.env.VITE_BASE_URL,
        json: { refreshToken: token },
      })
      .json<LoginResponse>();

    setLocalStorage("accessToken", accessToken);
    setLocalStorage("refreshToken", refreshToken);

    return accessToken;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to refresh token");
  }
};

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
