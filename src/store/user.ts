import { atomWithQuery, atomWithSuspenseQuery } from "jotai-tanstack-query";

import { getLoggedInUserDetails, getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";
import { getLocalStorage } from "@/utils/localStorage";

export const $getMyDetails = atomWithSuspenseQuery(() => ({
  queryKey: ["myDetails"],
  queryFn: async () => getMyDetails(),
}));

export const $getUserDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});

export const $getLoggedInUserDetails = atomWithQuery(() => ({
  queryKey: ["loggedInUser"],
  queryFn: getLoggedInUserDetails,
  enabled: !!getLocalStorage("accessToken"),
}));
