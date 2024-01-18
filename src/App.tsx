import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailLogin from "./pages/EmailLogin";
import Signup from "./pages/Signup";
import TteokgukCooking from "./pages/TteokgukCooking";
import MainPage from "./pages/MainPage";
import Tteokguk from "./pages/Tteokguk";
import MyPage from "./pages/MyPage";
import MyActivity from "./pages/MyActivity";
import RandomUser from "./pages/RandomUser";
import NotFound from "./pages/NotFound";
import {
  EMAIL_LOGIN_PAGE,
  HOME_PAGE,
  LOGIN_PAGE,
  MAIN_PAGE,
  MY_ACTIVITY_PAGE,
  MY_PAGE,
  RANDOM_USER_PAGE,
  SIGNUP_PAGE,
  TTEOKGUK_COOKING_PAGE,
  TTEOKGUK_PAGE,
} from "./constants/route";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={HOME_PAGE} />
        <Route index element={<Home />} />
        <Route path={LOGIN_PAGE} element={<Login />} />
        <Route path={EMAIL_LOGIN_PAGE} element={<EmailLogin />} />
        <Route path={SIGNUP_PAGE} element={<Signup />} />
        <Route path={MAIN_PAGE} element={<MainPage />} />
        <Route path={TTEOKGUK_PAGE} element={<Tteokguk />} />
        <Route path={TTEOKGUK_COOKING_PAGE} element={<TteokgukCooking />} />
        <Route path={MY_PAGE} element={<MyPage />} />
        <Route path={MY_ACTIVITY_PAGE} element={<MyActivity />} />
        <Route path={RANDOM_USER_PAGE} element={<RandomUser />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
