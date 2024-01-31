import { Routes as ReactRoutes, Route } from "react-router-dom";

import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/LoginPage";
import EmailLoginPage from "@/pages/EmailLoginPage";
import NicknamePage from "@/pages/NicknamePage";
import SignupPage from "@/pages/SignupPage";
import MainPage from "@/pages/MainPage";
import TteokgukPage from "@/pages/TteokgukPage";
import TteokgukCookingPage from "@/pages/TteokgukCookingPage";
import MyPage from "@/pages/MyPage";
import MyActivityPage from "@/pages/MyActivityPage";
import UserPage from "@/pages/UserPage";
import NotFoundPage from "@/pages/NotFoundPage";

import Layout from "@/components/layout/Layout";

export type RoutePath =
  | "/"
  | "/login"
  | "/login/email"
  | "/nickname/create"
  | "/signup"
  | "/tteokguks"
  | "/tteokguks/:id"
  | `/tteokguks/${number}`
  | "/tteokguk/create"
  | "/my-page"
  | "/my-page/activity"
  | "/users/:id"
  | `/users/${number}`;

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="login/email" element={<EmailLoginPage />} />
        <Route path="/nickname/create" element={<NicknamePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/tteokguks" element={<MainPage />} />
        <Route path="/tteokguks/:id" element={<TteokgukPage />} />
        <Route path="/tteokguk/create" element={<TteokgukCookingPage />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/my-page/activity" element={<MyActivityPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </ReactRoutes>
  );
};
