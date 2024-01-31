import { atomWithSuspenseQuery } from "jotai-tanstack-query";

import { getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";
import { getLocalStorage } from "@/utils/localStorage";
import { isExpiredAccessToken } from "@/utils/token";

export const $getMyDetails = atomWithSuspenseQuery(() => {
  const isTokenExpired = isExpiredAccessToken(getLocalStorage("accessToken"));

  return {
    queryKey: ["myDetails"],
    queryFn: () => getMyDetails(),
    enabled: isTokenExpired,
  };
});

export const $getUserDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});
