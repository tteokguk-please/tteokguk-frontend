import ky, { Input, KyResponse } from "ky";

import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
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
  const accessToken = getLocalStorage("accessToken");
  const refreshToken = getLocalStorage("refreshToken");

  const token = await getToken(accessToken, refreshToken);

  if (token) {
    request.headers.set("Authorization", `Bearer ${token}`);
  }
};

const getToken = async (accessToken: string, refreshToken: string) => {
  if (!isExpiredAccessToken(accessToken)) {
    return accessToken;
  }

  if (refreshToken && !isExpiredAccessToken(refreshToken)) {
    return await refreshAccessToken(refreshToken);
  }

  removeLocalStorage("accessToken");
  removeLocalStorage("refreshToken");
  return null;
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

const handleResponse = <Response>(response: KyResponse) => {
  if (response.status === 204 || response.headers.get("content-length") === "0") {
    return Promise.resolve({} as Response);
  }

  return response.json<Response>();
};

export default {
  get: <Response>(url: Input) => kyInstance.get(url).then(handleResponse<Response>),
  post: <Response>(url: Input, json: unknown) =>
    kyInstance.post(url, { json }).then(handleResponse<Response>),
  patch: <Response>(url: Input, json: unknown) =>
    kyInstance.patch(url, { json }).then(handleResponse<Response>),
  put: <Response>(url: Input, json: unknown) =>
    kyInstance.patch(url, { json }).then(handleResponse<Response>),
  delete: <Response>(url: Input, json?: unknown) => {
    const options = json ? { json } : {};
    return kyInstance.delete(url, options).then(handleResponse<Response>);
  },
};
