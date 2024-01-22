import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import headerLogo from "@/assets/images/header-logo.png";
import Button from "@/components/common/Button";
import { Link } from "@/routes/Link";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <Header hasPreviousPage className={styles.header}>
        <img src={headerLogo} alt="용용이 로고" />
      </Header>
      <div className={styles.buttonContainer}>
        <Link to="/login/email">
          <Button color="primary.45" applyColorTo="outline" className={styles.emailLoginButton}>
            이메일로 로그인
          </Button>
        </Link>
        <Button color="yellow" applyColorTo="background" className={styles.kakaoLoginButton}>
          카카오로 로그인
        </Button>
        <Link to="/signup" className={styles.signupLink}>
          회원가입 하러가기&gt;
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;

const styles = {
  container: css({
    height: "100%",
    padding: "0 4rem 12.3rem",
  }),
  header: css({
    marginBottom: "5rem",
  }),
  buttonContainer: css({
    width: "100%",
  }),
  emailLoginButton: css({
    marginTop: "21.6rem",
    marginBottom: "1rem",
  }),
  kakaoLoginButton: css({
    marginBottom: "8rem",
  }),
  signupLink: css({
    display: "block",
    textAlign: "center",
  }),
};
