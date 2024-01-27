import { atomWithMutation } from "jotai-tanstack-query";
import { checkEmail, checkNickname } from "@/apis/auth";
import { CheckEmailNicknameResponse } from "@/types/auth";

export const $checkEmail = atomWithMutation(() => ({
  mutationKey: ["checkEmail"],
  mutationFn: async (email: string): Promise<CheckEmailNicknameResponse> => checkEmail(email),
}));

export const $checkNickname = atomWithMutation(() => ({
  mutationKey: ["checkNickname"],
  mutationFn: async (nickname: string): Promise<CheckEmailNicknameResponse> =>
    checkNickname(nickname),
}));
