import { Fragment } from "react";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import headerLogo from "@/assets/images/header-logo.png";
import Button from "@/components/common/Button";
import { Link } from "@/routes/Link";
const LoginPage = () => {
  return (
    <Fragment>
      <Header hasPreviousPage>
        <img src={headerLogo} alt="용용이 로고" />
      </Header>
      <div className={styles.buttonContainer}>
        <Link to="/login/email">
          <Button color="primary.45" applyColorTo="outline" className={styles.emailLoginButton}>
            이메일로 로그인
          </Button>
        </Link>
        <Button className={styles.kakaoLoginButton}>카카오로 로그인</Button>
        <Link to="/signup" className={styles.signupLink}>
          회원가입 하러가기&gt;
        </Link>
      </div>
    </Fragment>
  );
};

export default LoginPage;

const styles = {
  buttonContainer: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "calc(100vh - 4.8rem)",
    padding: "0 4rem",
  }),
  emailLoginButton: css({
    marginBottom: "1rem",
  }),
  kakaoLoginButton: css({
    marginBottom: "8rem",
    backgroundColor: "#FEE500",
  }),
  signupLink: css({
    display: "block",
    textAlign: "center",
  }),
};
