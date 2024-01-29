import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import DumplingIcon from "@/assets/svg/dumpling.svg";

const ReceivedIngredientsList = () => {
  return (
    <ul className={styles.list}>
      {[...Array(9)].map(() => (
        <li className={styles.listItem}>
          <div className={styles.ingredientContainer}>
            <div className={styles.ingredientContent}>
              <div className={styles.iconContainer}>
                <DumplingIcon />
              </div>
              <div>
                <div className={styles.title}>@떡국을 부탁해</div>
                <div>응원의 떡이 도착했어요!</div>
              </div>
            </div>
            <div className={styles.buttonContainer}>
              <Link to="/tteokguks/:id" className={styles.button}>
                <button>내 떡국 보러가기</button>
              </Link>
              <Link to="/users/:id" className={styles.button}>
                <button>방문하기</button>
              </Link>
            </div>
          </div>
          <div className={styles.message}>
            잘먹고 잘지내야 건강하게 잘 살 수 있다. 건강의 비결은 잘먹고 잘지내야 건강하게 잘 살 수
            있다. 건강의 비결은 잘먹고 잘지내야 건강하게 잘 살 수 있다. 건강의 비결은 잘먹고
            잘지내야 건강하게 잘 살 수 있다. 건강의 비결은 잘먹고 잘지내야 건강하게 잘 살 수 있다.
            건강의 비결은 잘먹고 잘지내야 건강하게 잘 살 수 있다. 건강의 비결은 잘먹고 잘지내야
            건강하게 잘 살 수 있다. 건강의 비결은 잘먹고 잘지내야 건강하게 잘 살 수 있다. 건강의
            비결은
            <button className={styles.moreButton}>더보기</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReceivedIngredientsList;

const styles = {
  list: css({
    width: "100%",
  }),
  listItem: css({
    height: "21.1rem",
    marginBottom: "1.6rem",
    borderRadius: "0.8rem",
    overflow: "hidden",
  }),
  ingredientContainer: css({
    height: "14.5rem",
    backgroundColor: "white",
    padding: "1.6rem",
  }),
  ingredientContent: css({
    display: "flex",
    flexDirection: "row",
    fontSize: "1.4rem",
    gap: "1.6rem",
  }),
  title: css({
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
  }),
  iconContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "6.4rem",
    height: "6.4rem",
    backgroundColor: "primary.45",
    borderRadius: "50%",
  }),
  buttonContainer: css({
    display: "flex",
    gap: "0.8rem",
    marginTop: "1.2rem",
  }),
  button: css({
    flex: 1,
    backgroundColor: "primary.100",
    paddingY: "1rem",
    borderRadius: "0.8rem",
    textAlign: "center",
  }),
  message: css({
    position: "relative",
    height: "6.6rem",
    backgroundColor: "primary.20",
    fontSize: "1.4rem",
    padding: "1.6rem",
    paddingRight: "8.7rem",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  }),
  moreButton: css({
    position: "absolute",
    right: "1.6rem",
    bottom: "1.7rem",
    fontWeight: 700,
  }),
};
