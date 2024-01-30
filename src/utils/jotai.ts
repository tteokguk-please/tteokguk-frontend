import { atomFamily } from "jotai/utils";
import { atomWithQuery, atomWithSuspenseQuery } from "jotai-tanstack-query";

export const atomFamilyWithQuery = <Data, Variables>(
  key: string,
  fetcher: (variables: Variables) => Promise<Data>,
  equalityFn: (a: Data, b: Data) => boolean = Object.is,
) => {
  return atomFamily((params: Variables) =>
    atomWithQuery(() => ({
      queryKey: [key, params],
      queryFn: async () => fetcher(params),
      equalityFn,
    })),
  );
};

export const atomFamilyWithSuspenseQuery = <Data, Variables>(
  key: string,
  fetcher: (variables: Variables) => Promise<Data>,
  equalityFn: (a: Data, b: Data) => boolean = Object.is,
) => {
  return atomFamily((params: Variables) =>
    atomWithSuspenseQuery(() => ({
      queryKey: [key, params],
      queryFn: async () => fetcher(params),
      equalityFn,
    })),
  );
};
