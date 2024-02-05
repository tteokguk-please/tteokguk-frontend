import { Fragment, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { PostKakaoLoginResponse, PostKakaoTokenReponse } from "@/types/auth";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { Link } from "@/routes/Link";
import { $postKakaoLogin, $postKakaoToken } from "@/store/auth";
import useRouter from "@/routes/useRouter";
import deliveryDragon from "@/assets/images/delivery-dragon.png";
import KakaoIcon from "@/assets/svg/kakao.svg";

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

  const handleSuccessPostKakaoToken = ({ access_token }: PostKakaoTokenReponse) => {
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
  }: PostKakaoLoginResponse) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    if (isInitialized) {
      localStorage.removeItem("kakaoToken");
      router.push("/tteokguks");
    } else {
      router.push("/nickname/create");
    }
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
      <Header showBackButton>
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
          <Button className={styles.kakaoLoginButton} onClick={handleClickKakaoLogin}>
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
