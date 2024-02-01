import {
  GetNewTteokguksReponse,
  PostTteokgukRequest,
  PostTteokgukResponse,
} from "@/types/tteokguk.dto";

import http from "./core";

const TTEOKGUKS_SIZE = 20;

export const getNewTteokguks = (page: number) =>
  http.get<GetNewTteokguksReponse>(`api/v1/tteokguk/new?size=${TTEOKGUKS_SIZE}&page=${page}`);

export const getCompletedTteokguks = (page: number) =>
  http.get<GetNewTteokguksReponse>(
    `api/v1/tteokguk/completion?size=${TTEOKGUKS_SIZE}&page=${page}`,
  );

export const postTteokguk = (tteokguk: PostTteokgukRequest) =>
  http.post<PostTteokgukResponse>("api/v1/tteokguk", tteokguk);
