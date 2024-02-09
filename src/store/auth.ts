import { atomWithMutation, queryClientAtom } from "jotai-tanstack-query";
import * as Sentry from "@sentry/react";

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
  onError: (error) => {
    Sentry.captureException(error);
  },
}));

export const $checkNickname = atomWithMutation(() => ({
  mutationFn: (nickname: string): Promise<CheckEmailNicknameResponse> => checkNickname(nickname),
  onError: (error) => {
    Sentry.captureException(error);
  },
}));

export const $signup = atomWithMutation(() => ({
  mutationFn: (body: SignupRequest): Promise<SignupResponse> => postSignup(body),
  onError: (error) => {
    Sentry.captureException(error);
  },
}));

export const $login = atomWithMutation(() => ({
  mutationFn: (body: LoginRequest): Promise<LoginResponse> => postLogin(body),
  onError: (error) => {
    Sentry.captureException(error);
  },
}));

export const $postKakaoToken = atomWithMutation(() => ({
  mutationFn: (code: string): Promise<PostKakaoTokenReponse> => postKakaoToken(code),
  onError: (error) => {
    Sentry.captureException(error);
  },
}));

export const $postKakaoLogin = atomWithMutation((get) => ({
  mutationFn: (body: PostKakaoLoginRequest): Promise<PostKakaoLoginResponse> =>
    postKakaoLogin(body),
  onSuccess: () => {
    get(queryClientAtom).invalidateQueries({ queryKey: ["newTteokguks"] });
  },
  onError: (error) => {
    Sentry.captureException(error);
  },
}));

export const $postKakaoUserSignup = atomWithMutation(() => ({
  mutationFn: (body: PostKakaoUserSignupRequest): Promise<PostKakaoUserSignupResponse> =>
    postKakaoUserSignup(body),
  onError: (error) => {
    Sentry.captureException(error);
  },
}));
