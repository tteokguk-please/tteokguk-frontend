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

export interface LoggedInUserDetailsResponse {
  id: number;
  primaryIngredient: IngredientKey;
  nickname: string;
  itemResponses: IngredientQuantity[];
}
