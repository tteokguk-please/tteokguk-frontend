import ky from "ky";

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
import http from "./core";

export const checkEmail = (email: string) => {
  return http.get<CheckEmailNicknameResponse>(`api/v1/auth/check-email/${email}`);
};

export const checkNickname = (nickname: string) => {
  return http.get<CheckEmailNicknameResponse>(`api/v1/auth/check-nickname/${nickname}`);
};

export const postSignup = (body: SignupRequest) => {
  return http.post<SignupResponse>("api/v1/auth/join", body);
};

export const postLogin = (body: LoginRequest) => {
  return http.post<LoginResponse>("api/v1/auth/login", body);
};

export const postKakaoToken = (code: string) => {
  const searchParams = new URLSearchParams();
  searchParams.append("grant_type", "authorization_code");
  searchParams.append("client_id", import.meta.env.VITE_KAKAO_API_KEY);
  searchParams.append("redirect_uri", import.meta.env.VITE_KAKAO_REDIRECT_URI);
  searchParams.append("client_secret", import.meta.env.VITE_KAKAO_CLIENT_SECRET);
  searchParams.append("code", code);

  return ky
    .post("https://kauth.kakao.com/oauth/token", {
      headers: {
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: searchParams,
    })
    .then((reponse) => reponse.json<PostKakaoTokenReponse>());
};

export const postKakaoLogin = (body: PostKakaoLoginRequest) => {
  return http.post<PostKakaoLoginResponse>("api/v1/oauth/kakao/login", body);
};

export const postKakaoUserSignup = (body: PostKakaoUserSignupRequest) => {
  return http.post<PostKakaoUserSignupResponse>("api/v1/user/initialization", body);
};
