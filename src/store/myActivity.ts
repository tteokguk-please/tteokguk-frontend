import { atomWithInfiniteQuery } from "jotai-tanstack-query";
import { atom } from "jotai";

import { getMySupportedTteokguks } from "@/apis/myActivity";

const $getMySupportedTteokguks = atomWithInfiniteQuery(() => ({
  queryKey: ["supportedTteokguks"],
  queryFn: async ({ pageParam }) => getMySupportedTteokguks(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

export const $mySupportedTteokguks = atom((get) => {
  const mySupportedTteokguks = get($getMySupportedTteokguks);

  return {
    mySupportedTteokguks: mySupportedTteokguks.data?.pages.flatMap(
      ({ data: receivedIngredients }) => receivedIngredients,
    ),
    ...mySupportedTteokguks,
  };
});
