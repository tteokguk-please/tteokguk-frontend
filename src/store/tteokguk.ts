import { atomWithMutation } from "jotai-tanstack-query";

import { postTteokguk } from "@/apis/tteokguk";

import { PostTteokgukRequest, PostTteokgukResponse } from "@/types/tteokguk";

import useRouter from "@/routes/useRouter";

export const $postTteokguk = atomWithMutation(() => {
  const navigate = useRouter();

  return {
    mutationFn: (tteokguk: PostTteokgukRequest) => postTteokguk(tteokguk),
    onSuccess: (tteokgukResponse: PostTteokgukResponse) => {
      const { tteokgukId } = tteokgukResponse;

      navigate.push(`/tteokguks/${tteokgukId}`);
    },
  };
});
