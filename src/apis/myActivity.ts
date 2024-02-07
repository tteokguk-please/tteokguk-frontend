import {
  GetMySupportedTteokguksRespose,
  GetReceivedIngredientsResponse,
} from "@/types/myActivity.dto";

import http from "./core";

const RECEIVED_INGREDIENTS_SIZE = 10;

export const getMySupportedTteokguks = (page: number) =>
  http.get<GetMySupportedTteokguksRespose>(
    `api/v1/support?page=${page}&size=${RECEIVED_INGREDIENTS_SIZE}`,
  );

export const getReceivedIngredients = (page: number) =>
  http.get<GetReceivedIngredientsResponse>(
    `api/v1/support/ingredient?page=${page}&size=${RECEIVED_INGREDIENTS_SIZE}`,
  );
