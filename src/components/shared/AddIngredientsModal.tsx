import { css } from "@styled-system/css";

import { LoggedInUserDetailsResponse } from "@/types/user.dto";
import { IngredientKey } from "@/types/ingredient";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_KEYS } from "@/constants/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  memberId: number;
  loggedInUserDetails: LoggedInUserDetailsResponse;
}

const AddIngredientsModal = ({ isOpen, onClose, memberId, loggedInUserDetails }: Props) => {
  const title = loggedInUserDetails.id === memberId ? "떡국 재료 추가하기" : "떡국 재료 보내기";
  const buttonText = title === "떡국 재료 추가하기" ? "추가하기" : "다음";

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header onClose={onClose} hasCloseButton className={styles.title}>
          {title}
        </Modal.Header>
        <Modal.Body className={styles.contentContainer}>
          <div className={styles.bodyTitle}>내가 가지고 있는 재료</div>
          <ol className={styles.content}>
            {INGREDIENT_KEYS.map((ingredientKey) => (
              <Ingredient key={ingredientKey} ingredientKey={ingredientKey} />
            ))}
          </ol>
          <Button onClick={onClose} color="primary.100" applyColorTo="background">
            {buttonText}
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default AddIngredientsModal;

const Ingredient = ({ ingredientKey }: { ingredientKey: IngredientKey }) => {
  const IngredientIcon = INGREDIENT_ICON_BY_KEY[40][ingredientKey];

  return (
    <li className={styles.ingredient} aria-label="만두">
      <div className={styles.ingredientNumber}>1</div>
      <IngredientIcon />
    </li>
  );
};

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  title: css({
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "1.6rem",
  }),
  contentContainer: css({
    width: "28rem",
  }),
  bodyTitle: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "3.3rem",
    fontSize: "1.4rem",
    fontWeight: 700,
    backgroundColor: "secondary.100",
    borderTopRadius: "0.8rem",
  }),
  content: css({
    display: "flex",
    flexFlow: "row wrap",
    gap: "1rem",
    height: "22.8rem",
    backgroundColor: "primary.45",
    borderBottomRadius: "0.8rem",
    marginBottom: "2rem",
    padding: "1.2rem",
  }),
  ingredient: css({
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5.6rem",
    height: "5.6rem",
    borderRadius: "50%",
    backgroundColor: "secondary.100",
    cursor: "pointer",
  }),
  ingredientNumber: css({
    position: "absolute",
    top: 0,
    left: "4rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "2rem",
    height: "2rem",
    fontSize: "1rem",
    backgroundColor: "primary.100",
    borderRadius: "50%",
  }),
};
