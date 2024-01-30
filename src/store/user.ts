import { atomWithSuspenseQuery } from "jotai-tanstack-query";

import { getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

export const $getMyDetails = atomWithSuspenseQuery(() => ({
  queryKey: ["my-details"],
  queryFn: getMyDetails,
}));

export const $userDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});
