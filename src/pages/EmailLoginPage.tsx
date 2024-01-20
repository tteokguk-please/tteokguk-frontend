import { FormEvent } from "react";

import { toast } from "sonner";
import classnames from "classnames";

import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";

const EmailLoginPage = () => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    toast("아이디 혹은 비밀번호를 확인해주세요.");
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email" className={styles.label}>
          이메일
        </label>
        <input
          id="email"
          type="email"
          placeholder="이메일을 입력해주세요"
          className={classnames(styles.input, styles.emailInput)}
        />
        <label htmlFor="password" className={styles.label}>
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          className={styles.input}
        />
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
    padding: "10rem 4rem 0 4rem",
    position: "relative",
  }),
  label: css({
    display: "block",
    fontSize: "1.4rem",
    fontWeight: 700,
    marginBottom: "0.6rem",
  }),
  input: css({
    width: "100%",
    height: "3.7rem",
    backgroundColor: "primary.20",
    borderRadius: "1rem",
    paddingX: "1.6rem",
    outline: "none",
    _placeholder: {
      color: "black",
      fontSize: "1.2rem",
    },
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
