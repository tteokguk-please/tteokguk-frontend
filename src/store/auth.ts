import { atomWithMutation } from "jotai-tanstack-query";
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
  KaKaoUserSignupResponse,
  KakaoLoginRequest,
  KakaoLoginResponse,
  KakaoTokenReponse,
  KakaoUserSignupRequest,
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

export const $postKakaoToken = atomWithMutation(() => ({
  mutationFn: (code: string): Promise<KakaoTokenReponse> => postKakaoToken(code),
}));

export const $postKakaoLogin = atomWithMutation(() => ({
  mutationFn: (body: KakaoLoginRequest): Promise<KakaoLoginResponse> => postKakaoLogin(body),
}));

export const $postKakaoUserSignup = atomWithMutation(() => ({
  mutationFn: (body: KakaoUserSignupRequest): Promise<KaKaoUserSignupResponse> =>
    postKakaoUserSignup(body),
}));
