import { FormEvent, Fragment } from "react";

import { useAtomValue } from "jotai";
import { toast } from "sonner";

import { css } from "@styled-system/css";

import { setLocalStorage } from "@/utils/localStorage";

import Meta from "./Meta";

import { Link } from "@/routes/Link";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Header from "@/components/common/Header";
import { $login } from "@/store/auth";
import useRouter from "@/routes/useRouter";
import driveDragon from "@/assets/images/drive-dragon.png";

const EmailLoginPage = () => {
  const router = useRouter();
  const { mutate: login } = useAtomValue($login);

  const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    login(
      {
        email,
        password,
      },
      {
        onSuccess: ({ accessToken, refreshToken }) => {
          gtag("event", "login", { event_category: "이메일로 로그인" });
          setLocalStorage("accessToken", accessToken);
          setLocalStorage("refreshToken", refreshToken);
          router.push("/tteokguks");
        },
        onError: () => toast("아이디 혹은 비밀번호를 확인해주세요."),
      },
    );
  };

  return (
    <Fragment>
      <Meta path="/login/email" title="이메일 로그인 페이지" description="이메일로 로그인 하세요" />
      <Header showBackButton>이메일로 로그인</Header>
      <div className={styles.container}>
        <div className={styles.content}>
          <form onSubmit={handleSubmitLogin} noValidate>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              className={styles.emailInput}
            />
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
            />
            <button type="submit" className={styles.button}>
              로그인 하기
            </button>
          </form>
          <Link to="/signup" className={styles.signupLink}>
            회원가입 하러가기&gt;
          </Link>
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} src={driveDragon} alt="운전하는 용용이" />
        </div>
      </div>
    </Fragment>
  );
};

export default EmailLoginPage;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "calc(100vh - 4.8rem)",
    padding: "0 4rem",
    position: "relative",
  }),
  content: css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    marginTop: "0.8rem",
  }),
  emailInput: css({
    marginBottom: "1.6rem",
  }),
  button: css({
    position: "absolute",
    bottom: "-10rem",
    left: 0,
    zIndex: 1,
    width: "100%",
    height: "5.1rem",
    backgroundColor: "primary.100",
    borderRadius: "1.2rem",
    marginTop: "4rem",
    marginBottom: "2.2rem",
  }),
  signupLink: css({
    position: "absolute",
    bottom: "-12rem",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1,
    textAlign: "center",
  }),
  imageContainer: css({
    position: "relative",
    marginX: "-4rem",
    marginTop: "25rem",
  }),
  image: css({
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "auto",
    zIndex: "0",
  }),
};
