import { IngredientKey } from "./ingredient";
import { Tteokguk } from "./tteokguk";

interface IngredientQuantity {
  ingredient: IngredientKey;
  stockQuantity: number;
}

export interface MyDetailsResponse {
  id: number;
  primaryIngredient: IngredientKey;
  nickname: string;
  tteokguks: Tteokguk[];
  items: IngredientQuantity[];
}
