import { jwtDecode } from "jwt-decode";

export const isExpiredToken = (token: string | null) => {
  if (!token) return false;

  const decodedToken = jwtDecode(token);

  if (!decodedToken.exp) return false;

  const currentTime = Date.now() / 1000;

  if (decodedToken.exp < currentTime) {
    return true;
  }

  return false;
};
