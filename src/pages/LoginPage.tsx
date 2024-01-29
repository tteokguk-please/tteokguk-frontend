import { Fragment } from "react";

import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import deliveryDragon from "@/assets/images/delivery-dragon.png";
import KakaoIcon from "@/assets/svg/kakao.svg";

const LoginPage = () => {
  return (
    <Fragment>
      <Header hasPreviousPage>
        <Link to="/">로그인</Link>
      </Header>
      <div className={styles.container}>
        <div>
          <img src={deliveryDragon} alt="배달하는 용용이" />
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/login/email">
            <Button color="primary.45" applyColorTo="outline" className={styles.emailLoginButton}>
              이메일로 로그인
            </Button>
          </Link>
          <Button className={styles.kakaoLoginButton}>
            <div>
              <KakaoIcon />
            </div>
            <span className={styles.kakao}>카카오로 로그인</span>
          </Button>
          <Link to="/signup" className={styles.signupLink}>
            회원가입 하러가기&gt;
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default LoginPage;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "calc(100vh - 4.8rem)",
    padding: "0 4rem",
  }),
  buttonContainer: css({
    width: "100%",
  }),
  emailLoginButton: css({
    marginBottom: "1rem",
  }),
  kakaoLoginButton: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "8rem",
    paddingX: "2.5rem",
    backgroundColor: "#FEE500",
  }),
  kakao: css({
    flexGrow: 1,
  }),
  signupLink: css({
    display: "block",
    textAlign: "center",
  }),
};
