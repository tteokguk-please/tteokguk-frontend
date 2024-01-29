import { useEffect } from "react";

import { Atom, atom, useAtomValue, useSetAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { atomFamily } from "jotai/utils";

import { getUserDetails } from "@/apis/user";

export const $userIdAtom = atom(1);
export const $userDetail = atomWithQuery((get) => ({
  queryKey: ["users", get($userIdAtom)],
  queryFn: ({ queryKey: [, id] }) => {
    // const id = queryKey[1]
    return getUserDetails(id as number);
  },
}));

export const useAtomFamilyQuery = (
  $atomWithQuery: Atom<ReturnType<typeof atomWithQuery>>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  $idAtom: any, //WritableAtom<unknown, unknown[], unknown>,
  id: unknown,
) => {
  const setIdAtom = useSetAtom($idAtom);
  useEffect(() => {
    setIdAtom(id);
  }, [setIdAtom, id]);
  return useAtomValue($atomWithQuery);
};

// `atomFamily`를 사용하여 초기 데이터를 위한 atom 생성
export const initialDataAtom = atomFamily(() => atom(null));

// `atomFamilyWithQuery` 함수 정의
export const atomFamilyWithQuery = <Data, Variables>(
  key: string,
  fetcher: (variables: Variables) => Promise<Data>,
  equalityFn: (a: Data, b: Data) => boolean = Object.is,
) => {
  // `atomWithQuery`를 사용하여 쿼리 atom 생성
  const queryAtom = (params: Variables, initialData: unknown) =>
    atomWithQuery(() => ({
      queryKey: [key, params],
      queryFn: async () => fetcher(params),
      initialData,
      equalityFn,
    }));

  return atomFamily((params: Variables) =>
    atom((get) => {
      const data = get(initialDataAtom(params));
      const queryData = get(queryAtom(params, data));
      return queryData ?? data;
    }),
  );
};

// 사용 예시
// export const myDataAtom = atomFamilyWithQuery(
//   "myDataKey",
//   myDataFetcher, // API 호출 함수
// );

export const $user = atomFamilyWithQuery("user", (id: number) => {
  return getUserDetails(id);
});
