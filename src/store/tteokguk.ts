import { atomWithMutation, atomWithSuspenseInfiniteQuery } from "jotai-tanstack-query";
import { atomFamily } from "jotai/utils";
import { atom } from "jotai";

import { getCompletedTteokguks, getNewTteokguks, postTteokguk } from "@/apis/tteokguk";

import { PostTteokgukRequest } from "@/types/tteokguk.dto";

import { $getMyDetails } from "./user";

export const $getNewTteokguks = atomWithSuspenseInfiniteQuery(() => ({
  queryKey: ["newTteokguks"],
  queryFn: async ({ pageParam }) => getNewTteokguks(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

export const $getCompletedTteokguks = atomWithSuspenseInfiniteQuery(() => ({
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
    const { data: myDetails } = await get($getMyDetails);

    const $tteokgukAtom = tabIndex === 0 ? $getNewTteokguks : $getCompletedTteokguks;

    const {
      data: { pages },
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      ...rest
    } = await get($tteokgukAtom);

    const tteokguks = pages
      .flatMap(({ data: tteokguk }) => tteokguk)
      .map((tteokguk) => {
        const hasOwnedRequiredIngredient =
          tteokguk.completion === false &&
          tteokguk.ingredients.some(
            (ingredient) =>
              !tteokguk.usedIngredients.includes(ingredient) &&
              myDetails?.items.some(
                (item) => item.ingredient === ingredient && item.stockQuantity > 0,
              ),
          );

        return { ...tteokguk, hasIngredient: myDetails ? hasOwnedRequiredIngredient : false };
      });

    return {
      tteokguks,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
      ...rest,
    };
  }),
);

export const $postTteokguk = atomWithMutation(() => {
  return {
    mutationFn: (tteokguk: PostTteokgukRequest) => postTteokguk(tteokguk),
  };
});
