import { atomWithMutation, atomWithQuery, atomWithSuspenseQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import {
  getMyDetails,
  getSearchedUsers,
  getLoggedInUserDetails,
  getUserDetails,
  deleteLoggedInUser,
} from "@/apis/user";

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

export const $nickname = atom("");
export const $getSearchedUsers = atomFamily(() =>
  atomWithQuery((get) => ({
    queryKey: ["searchedUsers", get($nickname)],
    queryFn: () => getSearchedUsers(get($nickname)),
    enabled: !!get($nickname),
  })),
);

export const $deleteLoggedInUser = atomWithMutation(() => {
  return {
    mutationFn: deleteLoggedInUser,
  };
});
