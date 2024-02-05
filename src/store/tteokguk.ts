import { atomWithInfiniteQuery, atomWithMutation } from "jotai-tanstack-query";
import { atomFamily } from "jotai/utils";
import { atom } from "jotai";

import { getTteokguk, getCompletedTteokguks, getNewTteokguks, postTteokguk } from "@/apis/tteokguk";

import { atomFamilyWithQuery } from "@/utils/jotai";
import { differenceArray } from "@/utils/array";

import { PostTteokgukRequest } from "@/types/tteokguk.dto";
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
    const { data: loggedInUserDetails } = get($getLoggedInUserDetails);

    const $tteokgukAtom = tabIndex === 0 ? $getNewTteokguks : $getCompletedTteokguks;
    const tteokgukPaginationData = get($tteokgukAtom);
    const pages = tteokgukPaginationData.data?.pages || [];

    const tteokguks = pages
      .flatMap(({ data: tteokguks }) => tteokguks)
      .map((tteokguk) => {
        const isNonMember = !loggedInUserDetails;

        if (isNonMember) {
          return { ...tteokguk, hasIngredient: false };
        }

        const needIngredients = differenceArray<IngredientKey>(
          tteokguk.ingredients,
          tteokguk.usedIngredients,
        );

        const hasOwnIngredient = (ingredient: IngredientKey) =>
          loggedInUserDetails.itemResponses?.some(
            (item) => item.ingredient === ingredient && item.stockQuantity > 0,
          );
        const hasOwnedRequiredIngredient = needIngredients.some(hasOwnIngredient);

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
