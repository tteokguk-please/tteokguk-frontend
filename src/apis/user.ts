import http from "./core";

export const getMyDetails = () => http.get("api/v1/user/myPage");
