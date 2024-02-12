import { atomWithQuery, atomWithMutation } from "jotai-tanstack-query";
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

import { atomFamilyWithQuery, atomFamilyWithSuspenseQuery } from "@/utils/jotai";

import { LoggedInUserDetailsResponse, RandomUserResponse } from "@/types/user.dto";

export const $getMyDetails = atomWithQuery(() => ({
  queryKey: ["myDetails"],
  queryFn: getMyDetails,
}));

export const $getUserDetail = atomFamilyWithQuery("users", (id: number) => {
  return getUserDetails(id);
});

export const $getLoggedInUserDetails = atomFamilyWithSuspenseQuery(
  "loggedInUser",
  (enabled: boolean) => {
    const initialReponse: LoggedInUserDetailsResponse = {
      id: 0,
      primaryIngredient: "BEEF",
      nickname: "",
      itemResponses: [],
    };
    if (!enabled) {
      return Promise.resolve(initialReponse);
    }
    return getLoggedInUserDetails();
  },
);

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
