import { FormEvent, Fragment } from "react";

import { toast } from "sonner";

import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Header from "@/components/common/Header";
import { useAtomValue } from "jotai";
import { $login } from "@/store/auth";

const EmailLoginPage = () => {
  const {
    mutateAsync: login,
    data: loginResponse,
    error: loginError,
    isPending,
  } = useAtomValue($login);

  const handleSubmitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await login({
      email,
      password,
    });

    console.log("isPending", isPending);
    console.log("loginResponse", loginResponse);
    console.log("loginError", loginError);
    // mutate
    // toast("아이디 혹은 비밀번호를 확인해주세요.");
  };

  return (
    <Fragment>
      <Header hasPreviousPage>이메일로 로그인</Header>
      <div className={styles.container}>
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
    </Fragment>
  );
};

export default EmailLoginPage;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "calc(100% - 4.8rem)",
    padding: "0 4rem",
    paddingTop: "10rem",
  }),
  emailInput: css({
    marginBottom: "1.6rem",
  }),
  button: css({
    width: "100%",
    height: "5.1rem",
    backgroundColor: "primary.100",
    borderRadius: "1.2rem",
    marginTop: "4rem",
    marginBottom: "2.2rem",
  }),
  signupLink: css({
    textAlign: "center",
  }),
};
