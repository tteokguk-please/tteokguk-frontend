import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";

import {
  checkEmail,
  checkNickname,
  postKakaoLogin,
  postKakaoToken,
  postKakaoUserSignup,
  postLogin,
  postSignup,
} from "@/apis/auth";

import {
  CheckEmailNicknameResponse,
  PostKakaoUserSignupResponse,
  PostKakaoLoginRequest,
  PostKakaoLoginResponse,
  PostKakaoTokenReponse,
  PostKakaoUserSignupRequest,
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/auth";

export const $checkEmail = atomWithMutation(() => ({
  mutationFn: (email: string): Promise<CheckEmailNicknameResponse> => checkEmail(email),
}));

export const $checkNickname = atomWithMutation(() => ({
  mutationFn: (nickname: string): Promise<CheckEmailNicknameResponse> => checkNickname(nickname),
}));

export const $signup = atomWithMutation(() => ({
  mutationFn: (body: SignupRequest): Promise<SignupResponse> => postSignup(body),
}));

export const $login = atomWithMutation((get) => ({
  mutationFn: (body: LoginRequest): Promise<LoginResponse> => postLogin(body),
  onSuccess: () => {
    get(queryClientAtom).invalidateQueries();
  },
}));

export const $postKakaoToken = atomWithMutation(() => ({
  mutationFn: (code: string): Promise<PostKakaoTokenReponse> => postKakaoToken(code),
}));

export const $postKakaoLogin = atomWithMutation((get) => ({
  mutationFn: (body: PostKakaoLoginRequest): Promise<PostKakaoLoginResponse> =>
    postKakaoLogin(body),
  onSuccess: () => {
    get(queryClientAtom).invalidateQueries({ queryKey: ["newTteokguks"] });
  },
}));

export const $postKakaoUserSignup = atomWithMutation(() => ({
  mutationFn: (body: PostKakaoUserSignupRequest): Promise<PostKakaoUserSignupResponse> =>
    postKakaoUserSignup(body),
}));
