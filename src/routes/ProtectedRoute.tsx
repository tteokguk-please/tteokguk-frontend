import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getLocalStorage } from "@/utils/localStorage";

import { RoutePath } from "./Routes";

interface Props {
  role: "member" | "nonMember";
  redirectPath: RoutePath;
  children: ReactNode;
}

const ProtectedRoute = ({ role, redirectPath = "/", children }: Props) => {
  const isLoggedIn = !!getLocalStorage("accessToken");
  const isTemporaryKakaoLoggedIn = !!getLocalStorage("kakaoToken");

  if (role === "nonMember" && (!isLoggedIn || !isTemporaryKakaoLoggedIn)) {
    return <Navigate to="/login" replace />;
  }

  if (role === "member" && isLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
