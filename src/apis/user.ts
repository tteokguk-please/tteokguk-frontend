import { MyDetailsResponse } from "@/types/user.dto";

import http from "./core";

export const getMyDetails = () => http.get<MyDetailsResponse>("api/v1/user/myPage");
