import {
  atomWithInfiniteQuery,
  atomWithMutation,
  atomWithQuery,
  queryClientAtom,
} from "jotai-tanstack-query";
import { atomFamily } from "jotai/utils";
import { atom } from "jotai";

import {
  getTteokguk,
  getCompletedTteokguks,
  getNewTteokguks,
  postTteokguk,
  deleteTteokguk,
  getRandomTteokguk,
  postCompleteTteokguk,
} from "@/apis/tteokguk";

import { atomFamilyWithQuery } from "@/utils/jotai";
import { getLocalStorage } from "@/utils/localStorage";

import { GetTteokgukResponse, PostTteokgukRequest } from "@/types/tteokguk.dto";
import { IngredientKey } from "@/types/ingredient";

import { $getLoggedInUserDetails } from "./user";

const $getNewTteokguks = atomWithInfiniteQuery(() => ({
  queryKey: ["newTteokguks"],
  queryFn: async ({ pageParam }) => getNewTteokguks(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

const $getCompletedTteokguks = atomWithInfiniteQuery(() => ({
  queryKey: ["completedTteokguks"],
  queryFn: async ({ pageParam }) => getCompletedTteokguks(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

export const $tteokguksByTab = atomFamily((tabIndex: number) =>
  atom(async (get) => {
    const $tteokgukAtom = tabIndex === 0 ? $getNewTteokguks : $getCompletedTteokguks;
    const tteokgukPaginationData = await get($tteokgukAtom);
    const pages = tteokgukPaginationData.data?.pages || [];

    if (!getLocalStorage("accessToken")) {
      return {
        tteokguks: pages
          .flatMap(({ data: tteokguks }) => tteokguks)
          .map((tteokguk) => ({
            ...tteokguk,
            hasIngredient: false,
          })),
        ...tteokgukPaginationData,
      };
    }

    const userDetail = await get($getLoggedInUserDetails);

    const tteokguks = pages
      .flatMap(({ data: tteokguks }) => tteokguks)
      .map((tteokguk) => {
        const { requiredIngredients } = tteokguk;

        const hasOwnIngredient = (ingredient: IngredientKey) =>
          userDetail.data?.itemResponses?.some(
            (item) => item.ingredient === ingredient && item.stockQuantity > 0,
          );
        const hasOwnedRequiredIngredient = requiredIngredients.some(hasOwnIngredient);

        return {
          ...tteokguk,
          hasIngredient: tteokguk.completion === false && hasOwnedRequiredIngredient,
        };
      });

    return {
      tteokguks,
      ...tteokgukPaginationData,
    };
  }),
);

export const $postTteokguk = atomWithMutation(() => {
  return {
    mutationFn: (tteokguk: PostTteokgukRequest) => postTteokguk(tteokguk),
  };
});

export const $getTteokguk = atomFamilyWithQuery("tteokguk", (id: number) => getTteokguk(id));

export const $deleteTteokguk = atomWithMutation(() => {
  return {
    mutationFn: (tteokgukId: number) => deleteTteokguk(tteokgukId),
  };
});

export const $getRandomTteokguk = atomWithQuery<GetTteokgukResponse>(() => ({
  queryKey: ["randomTteokguk"],
  queryFn: getRandomTteokguk,
  enabled: false,
}));

export const $postCompleteTteokguk = atomWithMutation((get) => ({
  mutationFn: (id: number) => postCompleteTteokguk(id),
  onSuccess: () => {
    get(queryClientAtom).invalidateQueries({ queryKey: ["tteokguk"] });
  },
}));
