import { MyDetailsResponse } from "@/types/user.dto";
import { UserResponse } from "@/types/user";

import http from "./core";

export const getMyDetails = () => http.get<MyDetailsResponse>("api/v1/user/myPage");

export const getUserDetails = (id: number) => http.get<UserResponse>(`api/v1/user/${id}`);
