import {
  PostIngredientToMyTteokgukRequest,
  PostIngredientToMyTteokgukResponse,
  PostIngredientToOthersTteokgukRequest,
  PostIngredientToOthersTteokgukResponse,
} from "@/types/ingredient.dto";

import http from "./core";

export const postIngredientToMyTteokguk = (body: PostIngredientToMyTteokgukRequest) =>
  http.post<PostIngredientToMyTteokgukResponse>("api/v1/tteokguk/use", body);

export const postIngredientToOthersTtoekguk = (body: PostIngredientToOthersTteokgukRequest) =>
  http.post<PostIngredientToOthersTteokgukResponse>("api/v1/support", body);
