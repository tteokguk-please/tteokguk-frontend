import { FormEvent } from "react";

import { toast } from "sonner";

import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Header from "@/components/common/Header";

const EmailLoginPage = () => {
  const handleSubmitLogin = (event: FormEvent) => {
    event.preventDefault();

    toast("아이디 혹은 비밀번호를 확인해주세요.");
  };

  return (
    <div className={styles.container}>
      <Header hasPreviousPage className={styles.header}>
        이메일로 로그인
      </Header>
      <form onSubmit={handleSubmitLogin} noValidate>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className={styles.emailInput}
        />
        <Label htmlFor="password">비밀번호</Label>
        <Input id="password" type="password" placeholder="비밀번호를 입력해주세요" />
        <button type="submit" className={styles.button}>
          로그인 하기
        </button>
      </form>
      <Link to="/signup" className={styles.signupLink}>
        회원가입 하러가기&gt;
      </Link>
    </div>
  );
};

export default EmailLoginPage;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0 4rem",
  }),
  header: css({
    marginBottom: "10rem",
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
