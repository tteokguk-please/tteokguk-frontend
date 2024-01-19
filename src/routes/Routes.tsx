import { Routes as ReactRoutes, Route } from "react-router-dom";

import Home from "@/pages/Home";
import Login from "@/pages/Login";
import EmailLogin from "@/pages/EmailLogin";
import Signup from "@/pages/Signup";
import MainPage from "@/pages/MainPage";
import Tteokguk from "@/pages/Tteokguk";
import TteokgukCooking from "@/pages/TteokgukCooking";
import MyPage from "@/pages/MyPage";
import MyActivity from "@/pages/MyActivity";
import RandomUser from "@/pages/RandomUser";
import NotFound from "@/pages/NotFound";

export type RoutePath =
  | "/"
  | "/login"
  | "/login/email"
  | "/signup"
  | "/tteokguks"
  | "/tteokguks/:id"
  | `/tteokguks/${number}`
  | "/tteokguk/create"
  | "/my-page"
  | "/my-page/activity"
  | "users/:id"
  | `users/${number}`;

export const Routes = () => {
  return (
    <ReactRoutes>
      <Route path="/" />
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="login/email" element={<EmailLogin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tteokguks" element={<MainPage />} />
      <Route path="/tteokguks/:id" element={<Tteokguk />} />
      <Route path="/tteokguk/create" element={<TteokgukCooking />} />
      <Route path="/my-page" element={<MyPage />} />
      <Route path="/my-page/activity" element={<MyActivity />} />
      <Route path="/users/:id" element={<RandomUser />} />
      <Route path="/*" element={<NotFound />} />
    </ReactRoutes>
  );
};
