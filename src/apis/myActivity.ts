import { GetNewTteokguksReponse } from "@/types/tteokguk.dto";
import { GetReceivedIngredientsResponse } from "@/types/myActivity.dto";

import http from "./core";

const RECEIVED_INGREDIENTS_SIZE = 10;

export const getMySupportedTteokguks = (page: number) =>
  http.get<GetNewTteokguksReponse>(`api/v1/support?page=${page}&size=${RECEIVED_INGREDIENTS_SIZE}`);

export const getReceivedIngredients = (page: number) =>
  http.get<GetReceivedIngredientsResponse>(
    `api/v1/support/ingredient?page=${page}&size=${RECEIVED_INGREDIENTS_SIZE}`,
  );
