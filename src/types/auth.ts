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

export interface KakaoTokenReponse {
  token_type: string; // 토큰 타입, bearer로 고정
  access_token: string; // 사용자 액세스 토큰 값
  id_token?: string; // ID 토큰 값 (OpenID Connect 확장 기능을 통해 발급되는 ID 토큰, Base64 인코딩 된 사용자 인증 정보 포함)
  expires_in: number; // 액세스 토큰과 ID 토큰의 만료 시간(초) (액세스 토큰과 ID 토큰의 만료 시간은 동일)
  refresh_token: string; // 사용자 리프레시 토큰 값
  refresh_token_expires_in: number; // 리프레시 토큰 만료 시간(초)
  scope?: string; // 인증된 사용자의 정보 조회 권한 범위 (범위가 여러 개일 경우, 공백으로 구분)
}

export interface KakaoLoginRequest {
  accessToken: string;
}

export interface KakaoLoginResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
  isInitialized: boolean;
}
