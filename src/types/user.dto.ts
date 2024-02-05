import { IngredientKey, IngredientQuantity } from "./ingredient";
import { UserTteokguk } from "./tteokguk";

export interface UserDetailsResponse {
  nickname: string;
  primaryIngredient: IngredientKey;
  tteokguks: UserTteokguk[];
}

export interface MyDetailsResponse {
  id: number;
  primaryIngredient: IngredientKey;
  nickname: string;
  tteokguks: UserTteokguk[];
  items: IngredientQuantity[];
}

export type SearchedUserResponse = {
  id: number;
  nickname: string;
  primaryIngredient: IngredientKey;
}[];

export interface RandomUserResponse {
  id: number;
}
