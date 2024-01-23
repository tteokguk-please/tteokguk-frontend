import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import DumplingIngredientIcon from "@/assets/svg/dumplingIngredient.svg";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const AddIngredientsModal = ({ isOpen, close }: Props) => {
  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header handleClickClose={close} className={styles.title}>
          떡국 재료 보내기
        </Modal.Header>
        <Modal.Body className={styles.contentContainer}>
          <div className={styles.bodyTitle}>내가 가지고 있는 재료</div>
          <div className={styles.content}>
            {[...Array(12)].map(() => (
              <Ingredient />
            ))}
          </div>
          <Button onClick={close} color="primary.100" applyColorTo="background">
            추가하기
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default AddIngredientsModal;

const Ingredient = () => {
  return (
    <div className={styles.ingredient} aria-label="만두">
      <div className={styles.ingredientNumber}>1</div>
      <DumplingIngredientIcon />
    </div>
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
