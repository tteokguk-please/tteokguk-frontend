import { atomWithSuspenseQuery } from "jotai-tanstack-query";

import { getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";
import { getLocalStorage } from "@/utils/localStorage";

export const $getMyDetails = atomWithSuspenseQuery(() => {
  return {
    queryKey: ["myDetails"],
    queryFn: () => getMyDetails(),
    enabled: !!getLocalStorage("accessToken"),
  };
});

export const $getUserDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});
