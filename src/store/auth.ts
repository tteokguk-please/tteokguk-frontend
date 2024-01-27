import { atomWithMutation } from "jotai-tanstack-query";
import { checkEmail, checkNickname, postSignup } from "@/apis/auth";
import { CheckEmailNicknameResponse, SignupRequest, SignupResponse } from "@/types/auth";

export const $checkEmail = atomWithMutation(() => ({
  mutationKey: ["checkEmail"],
  mutationFn: (email: string): Promise<CheckEmailNicknameResponse> => checkEmail(email),
}));

export const $checkNickname = atomWithMutation(() => ({
  mutationKey: ["checkNickname"],
  mutationFn: (nickname: string): Promise<CheckEmailNicknameResponse> => checkNickname(nickname),
}));

export const $signup = atomWithMutation(() => ({
  mutationKey: ["signup"],
  mutationFn: (body: SignupRequest): Promise<SignupResponse> => postSignup(body),
}));
