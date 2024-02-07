import { Fragment, useCallback, useEffect } from "react";
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
    window.location.href = import.meta.env.VITE_KAKAO_LOGIN_URI;
  };

  const handleSuccessPostKakaoLogin = useCallback(
    ({ accessToken, refreshToken, isInitialized }: PostKakaoLoginResponse) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      if (isInitialized) {
        localStorage.removeItem("kakaoToken");
        router.push("/tteokguks");
      } else {
        router.push("/nickname/create");
      }
    },
    [router],
  );

  const handleSuccessPostKakaoToken = useCallback(
    ({ access_token }: PostKakaoTokenReponse) => {
      localStorage.setItem("kakaoToken", access_token);
      postKakaoLogin(
        { accessToken: access_token },
        {
          onSuccess: handleSuccessPostKakaoLogin,
        },
      );
    },
    [postKakaoLogin, handleSuccessPostKakaoLogin],
  );

  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    const kakaoUserCode = searchParams.get("code");
    const kakaoToken = localStorage.getItem("kakaoToken");

    if (kakaoUserCode) {
      postKakaoToken(kakaoUserCode, {
        onSuccess: handleSuccessPostKakaoToken,
      });
    } else if (kakaoToken) {
      localStorage.removeItem("kakaoToken");
    }
  }, [searchParams, postKakaoToken, handleSuccessPostKakaoToken]);

  return (
    <Fragment>
      <Header showBackButton>
        <Link to="/">로그인</Link>
      </Header>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={deliveryDragon} alt="배달하는 용용이" />
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
  imageContainer: css({
    width: "100%",
    paddingTop: "101.01%",
    position: "relative",
  }),
  image: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "auto",
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
