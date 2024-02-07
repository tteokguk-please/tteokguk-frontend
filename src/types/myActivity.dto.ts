import { MySupportedTteokguk, ReceivedIngredient } from "./myActivity";

export interface GetReceivedIngredientsResponse {
  data: ReceivedIngredient[];
  pageInfo: {
    page: number;
    size: number;
  };
}

export interface GetMySupportedTteokguksRespose {
  data: MySupportedTteokguk[];
  pageInfo: {
    page: number;
    size: number;
  };
}
