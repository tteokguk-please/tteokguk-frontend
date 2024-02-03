import { atomWithQuery, atomWithSuspenseQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import { getMyDetails, getSearchedUsers, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

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
export const $getSearchedUsers = atomFamily((nickname: string) =>
  atomWithQuery(() => ({
    queryKey: ["searchedUsers", nickname],
    queryFn: () => getSearchedUsers(nickname),
    enabled: !!nickname,
  })),
);
