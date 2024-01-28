import {
  CheckEmailNicknameResponse,
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
