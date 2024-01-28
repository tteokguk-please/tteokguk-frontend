import { atomWithMutation } from "jotai-tanstack-query";
import { checkEmail, checkNickname, postLogin, postSignup } from "@/apis/auth";
import {
  CheckEmailNicknameResponse,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/auth";

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

export const $login = atomWithMutation(() => ({
  mutationFn: (body: LoginRequest): Promise<LoginResponse> => postLogin(body),
}));
