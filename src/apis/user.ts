import { MyDetailsResponse, SearchedUserResponse, UserDetailsResponse } from "@/types/user.dto";

import http from "./core";

export const getMyDetails = () => http.get<MyDetailsResponse>("api/v1/user/myPage");

export const getUserDetails = (id: number) => http.get<UserDetailsResponse>(`api/v1/user/${id}`);

export const getSearchedUsers = (nickname: string) =>
  http.get<SearchedUserResponse>(`api/v1/user/all?nickname=${nickname}`);

export const deleteLoggedInUser = () => http.delete("api/v1/user/me");
