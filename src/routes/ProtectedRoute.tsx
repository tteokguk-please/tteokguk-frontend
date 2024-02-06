import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { getLocalStorage } from "@/utils/localStorage";

import { RoutePath } from "./Routes";

interface Props {
  inaccessibleRole: "member" | "nonMember";
  redirectPath: RoutePath;
  children: ReactNode;
}

const ProtectedRoute = ({ inaccessibleRole, redirectPath = "/", children }: Props) => {
  const isLoggedIn = !!getLocalStorage("accessToken");
  const isTemporaryKakaoLoggedIn = !!getLocalStorage("kakaoToken");

  if (inaccessibleRole === "nonMember" && (!isLoggedIn || !isTemporaryKakaoLoggedIn)) {
    return <Navigate to="/login" replace />;
  }

  if (inaccessibleRole === "member" && isLoggedIn && !isTemporaryKakaoLoggedIn) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
