import { jwtDecode } from "jwt-decode";

export const isExpiredAccessToken = (accessToken: string | null) => {
  if (!accessToken) return false;

  const decodedAccessToken = jwtDecode(accessToken);

  if (!decodedAccessToken.exp) return false;

  const currentTime = Date.now() / 1000;

  if (decodedAccessToken.exp < currentTime) {
    return true;
  }

  return false;
};
