import { atomWithMutation } from "jotai-tanstack-query";

import { getTteokguk, postTteokguk } from "@/apis/tteokguk";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

import { PostTteokgukRequest } from "@/types/tteokguk.dto";

export const $postTteokguk = atomWithMutation(() => {
  return {
    mutationFn: (tteokguk: PostTteokgukRequest) => postTteokguk(tteokguk),
  };
});

export const $getTteokguk = atomFamilyWithSuspenseQuery("tteokguk", (id: number) =>
  getTteokguk(id),
);
