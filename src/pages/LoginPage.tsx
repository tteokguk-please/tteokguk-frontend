import { Fragment, useEffect } from "react";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import headerLogo from "@/assets/images/header-logo.png";
import Button from "@/components/common/Button";
import { Link } from "@/routes/Link";
import { useSearchParams } from "react-router-dom";
import { useAtomValue } from "jotai";
import { $postKakaoLogin, $postKakaoToken } from "@/store/auth";
import { KakaoLoginResponse, KakaoTokenReponse } from "@/types/auth";
import useRouter from "@/routes/useRouter";
import { RoutePath } from "@/routes/Routes";

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const router = useRouter();

  const { mutate: postKakaoToken } = useAtomValue($postKakaoToken);
  const { mutate: postKakaoLogin } = useAtomValue($postKakaoLogin);

  const handleClickKakaoLogin = () => {
    const kakaoToken = localStorage.getItem("kakaoToken");

    if (kakaoToken) {
      postKakaoLogin(
        { accessToken: kakaoToken },
        {
          onSuccess: handleSuccessPostKakaoLogin,
        },
      );
    } else {
      window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URI;
    }
  };

  const handleSuccessPostKakaoToken = ({ access_token }: KakaoTokenReponse) => {
    localStorage.setItem("kakaoToken", access_token);
    postKakaoLogin(
      { accessToken: access_token },
      {
        onSuccess: handleSuccessPostKakaoLogin,
      },
    );
  };

  const handleSuccessPostKakaoLogin = ({
    accessToken,
    refreshToken,
    isInitialized,
  }: KakaoLoginResponse) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    const nextPath: RoutePath = isInitialized ? "/tteokguks" : "/nickname/create";
    router.push(nextPath);
  };

  useEffect(() => {
    const kakaoUserCode = searchParams.get("code");
    if (kakaoUserCode) {
      postKakaoToken(kakaoUserCode, {
        onSuccess: handleSuccessPostKakaoToken,
      });
    }
  }, [searchParams, postKakaoToken]);

  return (
    <Fragment>
      <Header hasPreviousPage>
        <Link to="/">
          <img src={headerLogo} alt="용용이 로고" />
        </Link>
      </Header>
      <div className={styles.buttonContainer}>
        <Link to="/login/email">
          <Button color="primary.45" applyColorTo="outline" className={styles.emailLoginButton}>
            이메일로 로그인
          </Button>
        </Link>
        <Button className={styles.kakaoLoginButton} onClick={handleClickKakaoLogin}>
          카카오로 로그인
        </Button>
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
