import { IngredientKey } from "./ingredient";

export interface PostTteokgukRequest {
  wish: string;
  ingredients: IngredientKey[];
  access: boolean;
}

export interface PostTteokgukResponse {
  tteokgukId: number;
  memberId: number;
  wish: string;
  access: boolean;
  completion: boolean;
  ingredients: IngredientKey[];
}

export interface Tteokguk {
  tteokgukId: number;
  wish: string;
  access: boolean;
  tteokgukIngredients: IngredientKey[];
}
