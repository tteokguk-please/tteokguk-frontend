import { IngredientKey } from "./ingredient";
import { Tteokguk, TteokgukBackgroudColor } from "./tteokguk";

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
  requiredIngredients: IngredientKey[];
  backgroundColor: TteokgukBackgroudColor;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
}

export interface PostTteokgukRequest {
  wish: string;
  ingredients: IngredientKey[];
  access: boolean;
}

export type PostTteokgukResponse = GetTteokgukResponse;
