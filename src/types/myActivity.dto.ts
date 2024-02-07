import { ReceivedIngredient } from "./myActivity";

export interface GetReceivedIngredientsResponse {
  data: ReceivedIngredient[];
  pageInfo: {
    page: number;
    size: number;
  };
}
