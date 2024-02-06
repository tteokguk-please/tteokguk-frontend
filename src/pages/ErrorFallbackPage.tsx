import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import errorImage from "@/assets/images/error.png";
import Button from "@/components/common/Button";

const ErrorFallbackPage = ({ retry }: { retry: () => void }) => {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <Header showBackButton />
        <div className={styles.content}>
          <div className={styles.imageContainer}>
            <img className={styles.image} src={errorImage} alt="에러" />
          </div>
          <h1 className={styles.title}>일시적인 오류가 발생했어요</h1>
          <div className={styles.description}>
            <span className={styles.block}>서비스 이용 중 불편을 드려 죄송합니다.</span>
            <span className={styles.block}>시스템 오류로 현재 페이지를 불러올 수 없습니다.</span>
            <span className={styles.block}>잠시 뒤 다시 시도해주세요.</span>
          </div>
          <Button
            onClick={retry}
            className={styles.retryButton}
            color="primary.100"
            applyColorTo="background"
          >
            다시 시도하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallbackPage;

const styles = {
  container: css({
    maxWidth: "50rem",
    width: "100%",
    height: "100vh",
    margin: "0 auto",
  }),
  main: css({
    width: "100%",
    minHeight: "100vh",
    flexGrow: 1,
    backgroundColor: "back",
  }),
  content: css({
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    paddingX: "4rem",
    height: "calc(100vh - 4.8rem)",
  }),
  imageContainer: css({
    display: "flex",
    justifyContent: "center",
    width: "20rem",
  }),
  image: css({
    width: "100%",
  }),
  title: css({
    width: "100%",
    fontSize: "2.4rem",
    fontWeight: 800,
    textAlign: "center",
    marginTop: "0.8rem",
    marginBottom: "1.2rem",
  }),
  description: css({
    fontSize: "1.2rem",
    color: "gray.50",
    textAlign: "center",
  }),
  retryButton: css({
    marginTop: "11.4rem",
  }),
  block: css({
    display: "block",
  }),
};
