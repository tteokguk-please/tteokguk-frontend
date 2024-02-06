import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import notFound from "@/assets/images/not-found.png";

const NotFoundPage = () => {
  return (
    <div>
      <Header showBackButton />
      <div className={styles.container}>
        <div>
          <div className={styles.imageContainer}>
            <img src={notFound} alt="페이지를 찾을 수 없음" />
          </div>
          <h1 className={styles.content}>
            <div>404</div>
            <div className={styles.title}>not found</div>
            <div className={styles.description}>
              죄송합니다. 존재하지 않는 주소이거나,
              <span className={styles.block}>
                해당 주소가 변경 혹은 삭제되어 페이지를 찾을 수 없습니다.
              </span>
            </div>
          </h1>
          <Link to="/" className={styles.link}>
            <Button color="primary.100" applyColorTo="background">
              홈으로 이동하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

const styles = {
  container: css({
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "calc(100vh - 4.8rem)",
    paddingX: "4rem",
  }),
  imageContainer: css({
    display: "flex",
    justifyContent: "center",
  }),
  content: css({
    fontSize: "3.2rem",
    fontWeight: 800,
    textAlign: "center",
    "@media (max-width: 500px)": {
      marginBottom: "8.7rem",
    },
    "@media (min-width: 501px)": {
      marginBottom: "3.2rem",
    },
  }),
  title: css({
    color: "primary.80",
    textTransform: "uppercase",
    "@media (max-width: 500px)": {
      marginBottom: "0.8rem",
    },
    "@media (min-width: 501px)": {
      marginBottom: "1.6rem",
    },
  }),
  description: css({
    "@media (max-width: 500px)": {
      fontSize: "1.2rem",
    },
    "@media (min-width: 501px)": {
      fontSize: "1.6rem",
    },
  }),
  block: css({
    display: "block",
  }),
  link: css({
    width: "100%",
  }),
};
