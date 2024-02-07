import { IngredientKey } from "./ingredient";
import { GetTteokgukResponse } from "./tteokguk.dto";

export interface PostIngredientToMyTteokgukRequest {
  tteokgukId: number;
  ingredients: IngredientKey[];
}

export type PostIngredientToMyTteokgukResponse = GetTteokgukResponse;

export interface PostIngredientToOthersTteokgukRequest {
  tteokgukId: number;
  supportIngredient: IngredientKey;
  message: string;
  access: boolean;
}

export interface PostIngredientToOthersTteokgukResponse {
  id: number;
  rewardIngredient: IngredientKey;
  rewardQuantity: number;
}
