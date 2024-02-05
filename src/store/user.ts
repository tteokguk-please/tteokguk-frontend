import { atomWithQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

import {
  getMyDetails,
  getSearchedUsers,
  getLoggedInUserDetails,
  getUserDetails,
} from "@/apis/user";

import { getLocalStorage } from "@/utils/localStorage";
import { atomFamilyWithQuery } from "@/utils/jotai";

export const $getMyDetails = atomWithQuery(() => ({
  queryKey: ["myDetails"],
  queryFn: async () => getMyDetails(),
}));

export const $getUserDetail = atomFamilyWithQuery("users", (id: number) => {
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
