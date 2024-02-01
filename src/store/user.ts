import { atomWithSuspenseQuery } from "jotai-tanstack-query";
import { HTTPError } from "ky";

import { getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

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
