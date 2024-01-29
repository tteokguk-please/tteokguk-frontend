import { css } from "@styled-system/css";

import homeLogo from "@/assets/images/home-logo.png";
import Button from "@/components/common/Button";
import { Link } from "@/routes/Link";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1>
        <Link to="/">
          <img src={homeLogo} alt="로고" />
        </Link>
      </h1>
      <div className={styles.buttonContainer}>
        <Link to="/login">
          <Button color="primary.100" applyColorTo="background" className={styles.loginButton}>
            로그인
          </Button>
        </Link>
        <Link to="/tteokguks">
          <Button color="primary.45" applyColorTo="outline">
            떡국 둘러보기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;

const styles = {
  container: css({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "6.8rem 4rem 11.2rem",
  }),
  buttonContainer: css({
    width: "100%",
  }),
  loginButton: css({
    marginTop: "5.6rem",
    marginBottom: "1.6rem",
  }),
};
