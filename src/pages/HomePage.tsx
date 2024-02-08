import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import Button from "@/components/common/Button";
import homeLogo from "@/assets/images/home-logo.png";
import tryDragon from "@/assets/images/try-dragon.png";
import leftMountain from "@/assets/images/left-mountain.png";
import rightMountain from "@/assets/images/right-mountain.png";
import homePattern from "@/assets/images/home-pattern.png";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>
        <Link to="/">
          <img src={homeLogo} alt="로고" />
        </Link>
      </h1>
      <div>
        <img src={homePattern} alt="배경" className={styles.backgroundImage} />
      </div>
      <div className={styles.dragon}>
        <img src={tryDragon} alt="떡국 권하는 용용이" />
      </div>
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
      <div className={styles.leftMountain}>
        <img src={leftMountain} alt="산" />
      </div>
      <div className={styles.rightMountain}>
        <img src={rightMountain} alt="산" />
      </div>
    </div>
  );
};

export default HomePage;

const styles = {
  container: css({
    position: "relative",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "6.8rem 4rem 11.2rem",
    backgroundPosition: "center",
    backgroundRepeat: "repeat-Y",
    backgroundImage: `url(src/assets/images/home-pattern.png)`,
    overflow: "hidden",
  }),
  backgroundImage: css({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover", // 또는 'contain'에 따라
    zIndex: -1, // 다른 내용 위에 배치
  }),
  logo: css({
    width: "21rem",
  }),
  dragon: css({
    width: "14.4rem",
  }),
  buttonContainer: css({
    marginTop: "-2rem",
    width: "100%",
  }),
  loginButton: css({
    marginBottom: "1.6rem",
  }),
  leftMountain: css({
    position: "absolute",
    zIndex: "0",
    bottom: "-1rem",
    left: "-1.5rem",
    width: "13.2rem",
  }),
  rightMountain: css({
    position: "absolute",
    zIndex: "0",
    bottom: "-1.6rem",
    right: "-0.5rem",
    width: "11.2rem",
  }),
};
