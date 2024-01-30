import { IngredientKey, IngredientQuantity } from "./ingredient";
import { Tteokguk } from "./tteokguk";

export interface UserResponse {
  nickname: string;
  primaryIngredient: IngredientKey;
  tteokguks: Tteokguk[];
}

export interface MyDetailsResponse {
  id: number;
  primaryIngredient: IngredientKey;
  nickname: string;
  tteokguks: Tteokguk[];
  items: IngredientQuantity[];
}
