import { UserResponse } from "@/types/user";

import http from "./core";

export const getUserDetails = (id: number) => http.get<UserResponse>(`api/v1/user/${id}`);
