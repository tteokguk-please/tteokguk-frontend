import { useOverlay } from "@toss/use-overlay";

import { css } from "@styled-system/css";

import { ReceivedIngredient } from "@/types/myActivity";

import { Link } from "@/routes/Link";
import CheerMessageModal from "@/components/MyActivity/CheerMessageModal";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  receivedIngredientList: ReceivedIngredient[];
}

const ReceivedIngredientsList = ({ receivedIngredientList }: Props) => {
  const cheerMessageModalOverlay = useOverlay();

  const handleClickMoreButton = (message: string) => () => {
    cheerMessageModalOverlay.open(({ isOpen, close }) => (
      <CheerMessageModal isOpen={isOpen} onClose={close} message={message} />
    ));
  };

  return (
    <ul className={styles.list}>
      {receivedIngredientList.map(
        ({ id, senderId, nickname, ingredient, message, access, supportedTteokgukId }) => {
          const IngredientIcon = INGREDIENT_ICON_BY_KEY[40][ingredient];
          const ANONIMOUS_NICKNAME = `익명의 ${INGREDIENT_NAME_BY_KEY[ingredient]}`;
          const visitableTtoekguk = nickname !== "탈퇴한 사용자" && access;

          return (
            <li key={id} className={styles.listItem}>
              <div className={styles.ingredientContainer}>
                <div className={styles.ingredientContent}>
                  <div className={styles.iconContainer}>
                    <IngredientIcon aria-label={INGREDIENT_NAME_BY_KEY[ingredient]} />
                  </div>
                  <div>
                    <div className={styles.title}>@{access ? nickname : ANONIMOUS_NICKNAME}</div>
                    <div>응원의 {INGREDIENT_NAME_BY_KEY[ingredient]}(이/가) 도착했어요!</div>
                  </div>
                </div>
                <div className={styles.buttonContainer}>
                  <Link to={`/tteokguks/${supportedTteokgukId}`} className={styles.button}>
                    <button>내 떡국 보러가기</button>
                  </Link>
                  {visitableTtoekguk && (
                    <Link to={`/users/${senderId}`} className={styles.button}>
                      <button>방문하기</button>
                    </Link>
                  )}
                </div>
              </div>
              <div className={styles.message}>
                <div className={styles.messageContent}>{message}</div>
                <button onClick={handleClickMoreButton(message)} className={styles.moreButton}>
                  더보기
                </button>
              </div>
            </li>
          );
        },
      )}
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
  }),
  messageContent: css({
    lineClamp: 2,
    overflow: "hidden",
    textOverflow: "ellipsis",
  }),
  moreButton: css({
    position: "absolute",
    right: "1.6rem",
    bottom: "1.7rem",
    fontWeight: 700,
  }),
};
