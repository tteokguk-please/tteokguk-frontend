import { IngredientKey } from "./ingredient";
import { Tteokguk } from "./tteokguk";

export interface GetNewTteokguksReponse {
  data: Tteokguk[];
  pageInfo: {
    page: number;
    size: number;
  };
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
