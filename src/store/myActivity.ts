import { atomWithSuspenseInfiniteQuery } from "jotai-tanstack-query";
import { atom } from "jotai";

import { getReceivedIngredients } from "@/apis/myActivity";

const $getReceivedIngredients = atomWithSuspenseInfiniteQuery(() => ({
  queryKey: ["receivedIngredients"],
  queryFn: async ({ pageParam }) => getReceivedIngredients(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

export const $receivedIngredients = atom(async (get) => {
  const {
    data: { pages },
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest
  } = await get($getReceivedIngredients);

  const handleReceivedIngredeintIntersect = ({ enabled }: { enabled: boolean }) => {
    if (hasNextPage && !isFetchingNextPage && enabled) {
      fetchNextPage();
    }
  };

  return {
    receivedIngredientList: pages.flatMap(({ data: receivedIngredients }) => receivedIngredients),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleReceivedIngredeintIntersect,
    ...rest,
  };
});
