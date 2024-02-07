import { Routes as ReactRoutes, Route } from "react-router-dom";
import { Suspense } from "react";

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
import SearchUserPage from "@/pages/SearchUserPage";
import UserPage from "@/pages/UserPage";
import NotFoundPage from "@/pages/NotFoundPage";
import MainPageFallback from "@/pages/MainPage.fallback";

import ProtectedRoute from "./ProtectedRoute";

import Layout from "@/components/layout/Layout";
import MyActivityPageFallback from "@/pages/MyActivityPage.fallback";

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
  | "/user/search"
  | "/users/:id"
  | `/users/${number}`;

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <ProtectedRoute inaccessibleRole="member" redirectPath="/tteokguks">
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectedRoute inaccessibleRole="member" redirectPath="/tteokguks">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="login/email"
          element={
            <ProtectedRoute inaccessibleRole="member" redirectPath="/tteokguks">
              <EmailLoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nickname/create"
          element={
            <ProtectedRoute inaccessibleRole="member" redirectPath="/tteokguks">
              <NicknamePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute inaccessibleRole="member" redirectPath="/tteokguks">
              <SignupPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tteokguks"
          element={
            <Suspense fallback={<MainPageFallback />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route path="/tteokguks/:id" element={<TteokgukPage />} />
        <Route
          path="/tteokguk/create"
          element={
            <ProtectedRoute inaccessibleRole="nonMember" redirectPath="/login">
              <TteokgukCookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-page"
          element={
            <ProtectedRoute inaccessibleRole="nonMember" redirectPath="/login">
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-page/activity"
          element={
            <ProtectedRoute inaccessibleRole="nonMember" redirectPath="/login">
              <Suspense fallback={<MyActivityPageFallback />}>
                <MyActivityPage />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route path="/user/search" element={<SearchUserPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Route>
    </ReactRoutes>
  );
};
