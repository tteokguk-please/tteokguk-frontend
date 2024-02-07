import { GetReceivedIngredientsResponse } from "@/types/myActivity.dto";

import http from "./core";

const RECEIVED_INGREDIENTS_SIZE = 10;

export const getReceivedIngredients = (page: number) =>
  http.get<GetReceivedIngredientsResponse>(
    `api/v1/support/ingredient?page=${page}&size=${RECEIVED_INGREDIENTS_SIZE}`,
  );
