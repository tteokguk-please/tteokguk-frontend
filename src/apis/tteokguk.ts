import { PostTteokgukRequest, PostTteokgukResponse } from "@/types/tteokguk";

import http from "./core";

export const postTteokguk = (tteokguk: PostTteokgukRequest) =>
  http.post<PostTteokgukResponse>("api/v1/tteokguk", tteokguk);
