import { atomWithQuery, atomWithSuspenseQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { getMyDetails, getRandomUserDetails, getSearchedUsers, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

import { RandomUserResponse } from "@/types/user.dto";

export const $getMyDetails = atomWithSuspenseQuery(() => {
  return {
    queryKey: ["myDetails"],
    queryFn: () => getMyDetails(),
  };
});

export const $getUserDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});

export const $nickname = atom("");
export const $getSearchedUsers = atomFamily(() =>
  atomWithQuery((get) => ({
    queryKey: ["searchedUsers", get($nickname)],
    queryFn: () => getSearchedUsers(get($nickname)),
    enabled: !!get($nickname),
  })),
);

export const $getRandomUserDetails = atomWithQuery<RandomUserResponse>(() => ({
  queryKey: ["randomUserDetails"],
  queryFn: getRandomUserDetails,
  enabled: false,
}));
