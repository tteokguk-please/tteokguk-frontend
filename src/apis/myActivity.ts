import { GetNewTteokguksReponse } from "@/types/tteokguk.dto";

import http from "./core";

const TTEOKGUK_SIZE = 20;

export const getMySupportedTteokguks = (page: number) =>
  http.get<GetNewTteokguksReponse>(`api/v1/support?page=${page}&size=${TTEOKGUK_SIZE}`);
