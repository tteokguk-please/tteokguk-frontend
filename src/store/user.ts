import { atomWithQuery, atomWithMutation, atomWithSuspenseQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import {
  getLoggedInUserDetails,
  getMyDetails,
  getRandomUserDetails,
  getSearchedUsers,
  getUserDetails,
  deleteLoggedInUser,
} from "@/apis/user";

import { getLocalStorage } from "@/utils/localStorage";
import { atomFamilyWithQuery } from "@/utils/jotai";

import { RandomUserResponse } from "@/types/user.dto";

export const $getMyDetails = atomWithQuery(() => ({
  queryKey: ["myDetails"],
  queryFn: async () => getMyDetails(),
}));

export const $getUserDetail = atomFamilyWithQuery("users", (id: number) => {
  return getUserDetails(id);
});

export const $getLoggedInUserDetails = atomWithSuspenseQuery(() => ({
  queryKey: ["loggedInUser"],
  queryFn: getLoggedInUserDetails,
  enabled: !!getLocalStorage("accessToken"),
  refetchOnMount: false,
}));

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

export const $deleteLoggedInUser = atomWithMutation(() => {
  return {
    mutationFn: deleteLoggedInUser,
  };
});
