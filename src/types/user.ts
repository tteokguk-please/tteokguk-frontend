import { IngredientKey } from "./ingredient";
import { Tteokguk } from "./tteokguk";

export interface UserResponse {
  nickname: string;
  primaryIngredient: IngredientKey;
  tteokguks: Tteokguk[];
}
