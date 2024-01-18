import { Fragment } from "react";
import { Link } from "react-router-dom";

import { EMAIL_LOGIN_PAGE } from "@/constants/route";

const Login = () => {
  return (
    <Fragment>
      <Link to={EMAIL_LOGIN_PAGE}>이메일로 로그인</Link>
      <button>카카오로 로그인</button>
    </Fragment>
  );
};

export default Login;
