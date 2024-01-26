import { css } from "@styled-system/css";

import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";

const TteokgukCardsWithCaption = () => {
  return (
    <ul className={styles.container}>
      {[...Array(12)].map(() => (
        <div className={styles.cardContainer}>
          <div className={styles.badge}>응원요청</div>
          <div className={styles.imageContainer}>
            <img src={tteokgukIncomplete} alt="미완성된 떡국" />
          </div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>{1178}번째 소원떡국</div>
            <div className={styles.cardNickname}>@ {"재민"}</div>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default TteokgukCardsWithCaption;

const styles = {
  container: css({
    display: "flex",
    flexFlow: "row wrap",
    gap: "1.6rem",
  }),
  cardContainer: css({
    position: "relative",
    maxWidth: "calc(50% - 1.6rem)",
    width: "100%",
    height: "20.5rem",
    boxSizing: "border-box",
    borderRadius: "1rem",
    overflow: "hidden",
  }),
  badge: css({
    position: "absolute",
    top: "0.7rem",
    right: "0.6rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "4.7rem",
    height: "2rem",
    fontSize: "1rem",
    borderRadius: "0.8rem",
    backgroundColor: "secondary.50",
  }),
  imageContainer: css({
    display: "flex",
    justifyContent: "center",
    height: "15.2rem",
    backgroundColor: "white",
    overflow: "hidden",
  }),
  cardContent: css({
    width: "100%",
    height: "5.3rem",
    backgroundColor: "primary.80",
    padding: "0.8rem 1rem 0",
  }),
  cardTitle: css({
    fontSize: "1.4rem",
    fontWeight: 700,
  }),
  cardNickname: css({
    fontSize: "1.2rem",
  }),
};
