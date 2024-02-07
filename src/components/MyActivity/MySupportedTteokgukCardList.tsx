import { css } from "@styled-system/css";

import { MySupportedTteokguk } from "@/types/myActivity";

import TteokgukImage from "@/components/common/TteokgukImage";
import { Link } from "@/routes/Link";

interface Props {
  tteokguks: MySupportedTteokguk[];
}

const MySupportedTteokgukCardList = ({ tteokguks }: Props) => {
  return (
    <ul className={styles.container}>
      {tteokguks.map(
        ({
          tteokgukId,
          receiverNickname,
          completion,
          backgroundColor,
          frontGarnish,
          backGarnish,
        }) => (
          <li key={tteokgukId} className={styles.cardContainer}>
            <Link to={`/tteokguks/${tteokgukId}`}>
              <div>
                <div className={styles.imageContainer}>
                  <TteokgukImage
                    completion={completion}
                    backgroundColor={backgroundColor}
                    frontGarnish={frontGarnish}
                    backGarnish={backGarnish}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{tteokgukId}번째 소원떡국</div>
                  <div className={styles.cardNickname}>@ {receiverNickname}</div>
                </div>
              </div>
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export default MySupportedTteokgukCardList;

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
    paddingBottom: "5.3rem",
  }),
  imageContainer: css({
    position: "relative",
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
