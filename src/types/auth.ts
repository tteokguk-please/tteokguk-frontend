import { IngredientKey } from "./ingredient";

export interface CheckEmailNicknameResponse {
  isExist: boolean;
}

export interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  acceptsMarketing: boolean;
}

export interface SignupResponse {
  id: number;
  nickname: string;
  primaryIngredient: IngredientKey;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
}
