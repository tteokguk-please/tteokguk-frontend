import { IngredientKey, IngredientQuantity } from "./ingredient";
import { Tteokguk } from "./tteokguk";

export interface MyDetailsResponse {
  id: number;
  primaryIngredient: IngredientKey;
  nickname: string;
  tteokguks: Tteokguk[];
  items: IngredientQuantity[];
}
