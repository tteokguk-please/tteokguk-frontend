import { IngredientKey } from "./ingredient";

export interface GetTteokgukResponse {
  tteokgukId: number;
  memberId: number;
  nickname: string;
  wish: string;
  access: boolean;
  completino: boolean;
  ingredients: IngredientKey[];
  usedIngredients: IngredientKey[];
}

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
