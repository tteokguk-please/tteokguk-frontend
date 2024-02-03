import { IngredientKey } from "./ingredient";
import { Tteokguk } from "./tteokguk";

export interface GetNewTteokguksReponse {
  data: Tteokguk[];
  pageInfo: {
    page: number;
    size: number;
  };
}

export interface GetTteokgukResponse {
  tteokgukId: number;
  memberId: number;
  nickname: string;
  wish: string;
  access: boolean;
  completion: boolean;
  ingredients: IngredientKey[];
  usedIngredients: IngredientKey[];
  backgroundColor: "BLUE" | "GREEN" | "PINK" | "YELLOW";
  visibleIngredient1: IngredientKey;
  visibleIngredient2: IngredientKey;
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
