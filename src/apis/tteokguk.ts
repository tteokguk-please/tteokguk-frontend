import {
  GetTteokgukResponse,
  PostTteokgukRequest,
  PostTteokgukResponse,
} from "@/types/tteokguk.dto";

import http from "./core";

export const getTteokguk = (id: number) =>
  http.get<GetTteokgukResponse>(`api/v1/tteokguk/find/${id}`);

export const postTteokguk = (tteokguk: PostTteokgukRequest) =>
  http.post<PostTteokgukResponse>("api/v1/tteokguk", tteokguk);
