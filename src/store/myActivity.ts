import { atomWithSuspenseInfiniteQuery } from "jotai-tanstack-query";
import { atom } from "jotai";

import { getMySupportedTteokguks } from "@/apis/myActivity";

const $getMySupportedTteokguks = atomWithSuspenseInfiniteQuery(() => ({
  queryKey: ["supportedTteokguks"],
  queryFn: async ({ pageParam }) => getMySupportedTteokguks(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

export const $mySupportedTteokguks = atom(async (get) => {
  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest
  } = await get($getMySupportedTteokguks);

  return {
    mySupportedTteokguks: pages.flatMap(({ data: receivedIngredients }) => receivedIngredients),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
});
