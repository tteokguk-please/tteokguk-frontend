import { useAtom } from "jotai";

import { css } from "@styled-system/css";

import { LoggedInUserDetailsResponse } from "@/types/user.dto";
import { IngredientKey } from "@/types/ingredient";

import Ingredient from "../TteokgukCookingPage/Ingredient";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import { $updateSelectedIngredients } from "@/store/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  memberId: number;
  loggedInUserDetails: LoggedInUserDetailsResponse;
}

const AddIngredientsModal = ({ isOpen, onClose, memberId, loggedInUserDetails }: Props) => {
  const [selectedIngredients, updateSelectedIngredients] = useAtom($updateSelectedIngredients);

  const { itemResponses: ingredientsStocks } = loggedInUserDetails;
  const title = loggedInUserDetails.id === memberId ? "떡국 재료 추가하기" : "떡국 재료 보내기";
  const buttonText = title === "떡국 재료 추가하기" ? "추가하기" : "다음";

  const handleClickIngredient = (ingredientKey: IngredientKey) => () => {
    console.log(ingredientKey);

    updateSelectedIngredients(ingredientKey);
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header onClose={onClose} hasCloseButton className={styles.title}>
          {title}
        </Modal.Header>
        <Modal.Body className={styles.contentContainer}>
          <div className={styles.bodyTitle}>내가 가지고 있는 재료</div>
          <ol className={styles.content}>
            {ingredientsStocks.map(({ ingredient, stockQuantity }) => (
              <Ingredient
                key={ingredient}
                ingredientKey={ingredient}
                handleClickIngredient={handleClickIngredient(ingredient)}
                stockQuantity={stockQuantity}
                isSelected={selectedIngredients.includes(ingredient)}
              />
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
};
