import { atomWithInfiniteQuery } from "jotai-tanstack-query";
import { atom } from "jotai";
import * as Sentry from "@sentry/react";

import { getReceivedIngredients, getMySupportedTteokguks } from "@/apis/myActivity";

const $getReceivedIngredients = atomWithInfiniteQuery(() => ({
  queryKey: ["receivedIngredients"],
  queryFn: async ({ pageParam }) => getReceivedIngredients(pageParam),
  getNextPageParam: (lastPage, _allPages, lastPageParam) => {
    if (!lastPage.data.length) return;

    return lastPageParam + 1;
  },
  initialPageParam: 1,
}));

export const $receivedIngredients = atom(async (get) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, error, ...rest } = await get(
    $getReceivedIngredients,
  );

  if (error) {
    Sentry.captureException(error);
  }

  const handleReceivedIngredeintIntersect = ({ enabled }: { enabled: boolean }) => {
    if (hasNextPage && !isFetchingNextPage && enabled) {
      fetchNextPage();
    }
  };

  return {
    receivedIngredientList: data?.pages.flatMap(
      ({ data: receivedIngredients }) => receivedIngredients,
    ),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    handleReceivedIngredeintIntersect,
    ...rest,
  };
});

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
  const { data, hasNextPage, isFetchingNextPage, fetchNextPage, error, ...rest } =
    get($getMySupportedTteokguks);

  if (error) {
    Sentry.captureException(error);
  }

  const handleSupportedTtoekguksIntersect = ({ enabled }: { enabled: boolean }) => {
    if (hasNextPage && !isFetchingNextPage && enabled) {
      fetchNextPage();
    }
  };

  return {
    mySupportedTteokguks: data?.pages.flatMap(
      ({ data: mySupportedTteokguks }) => mySupportedTteokguks,
    ),
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleSupportedTtoekguksIntersect,
    ...rest,
  };
});
