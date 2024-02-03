import { atomWithQuery, atomWithSuspenseQuery } from "jotai-tanstack-query";
import { HTTPError } from "ky";

import { getLoggedInUserDetails, getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";
import { getLocalStorage } from "@/utils/localStorage";

export const $getMyDetails = atomWithSuspenseQuery(() => ({
  queryKey: ["myDetails"],
  queryFn: async () => {
    try {
      return await getMyDetails();
    } catch (error) {
      if (error instanceof HTTPError) {
        if (error.response.status === 401) return null;
      }
    }
  },
}));

export const $getUserDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});

export const $getLoggedInUserDetails = atomWithQuery(() => ({
  queryKey: ["loggedInUser"],
  queryFn: getLoggedInUserDetails,
  enabled: !!getLocalStorage("accessToken"),
}));
