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
