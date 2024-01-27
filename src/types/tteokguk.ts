import { IngredientName } from "./ingredient";

export interface PostTteokgukRequest {
  wish: string;
  ingredients: IngredientName[];
  access: boolean;
}

export interface PostTteokgukResponse {
  tteokgukId: number;
  memberId: number;
  wish: string;
  access: boolean;
  completion: boolean;
  ingredients: IngredientName[];
}
