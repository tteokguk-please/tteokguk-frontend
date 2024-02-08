import { useAtom } from "jotai";
import { useOverlay } from "@toss/use-overlay";

import { css } from "@styled-system/css";

import { LoggedInUserDetailsResponse } from "@/types/user.dto";
import { IngredientKey } from "@/types/ingredient";

import Modal from "../common/modal/Modal";
import Ingredient from "../TteokgukCookingPage/Ingredient";
import Button from "../common/Button";

import CreateCheerMessageModal from "./CreateCheerMessageModal";

import { $updateSelectedIngredient } from "@/store/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tteokgukId: number;
  myDetails: LoggedInUserDetailsResponse;
  requiredIngredients: IngredientKey[];
}

const SendIngredientsToOthersTteokgukModal = ({
  isOpen,
  onClose,
  tteokgukId,
  myDetails,
  requiredIngredients,
}: Props) => {
  const createCheerMessageModalOverlay = useOverlay();
  const [selectedIngredient, updateSelectedIngredient] = useAtom($updateSelectedIngredient);

  const { itemResponses: ingredientsStocks } = myDetails;

  const handleClickIngredient = (ingredientKey: IngredientKey) => () => {
    updateSelectedIngredient(ingredientKey);
  };

  const handleClickNextButton = () => {
    if (!selectedIngredient) return;

    createCheerMessageModalOverlay.open(({ isOpen, close: handleCloseCheerMessageModal }) => (
      <CreateCheerMessageModal
        isOpen={isOpen}
        onClose={() => {
          handleCloseCheerMessageModal();
          onClose();
        }}
        tteokgukId={tteokgukId}
      />
    ));
  };

  const handleClickClose = () => {
    updateSelectedIngredient(null);
    onClose();
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header onClose={handleClickClose} hasCloseButton className={styles.title}>
          떡국 재료 보내기
        </Modal.Header>
        <Modal.Body className={styles.contentContainer}>
          <div className={styles.bodyTitle}>내가 가지고 있는 재료</div>
          <ol className={styles.content}>
            {ingredientsStocks.map(
              ({ ingredient, stockQuantity }) =>
                stockQuantity > 0 && (
                  <Ingredient
                    key={ingredient}
                    ingredientKey={ingredient}
                    handleClickIngredient={handleClickIngredient(ingredient)}
                    stockQuantity={stockQuantity}
                    isSelected={selectedIngredient === ingredient}
                    isDisabled={!requiredIngredients.includes(ingredient)}
                  />
                ),
            )}
          </ol>
          <Button onClick={handleClickNextButton} color="primary.100" applyColorTo="background">
            다음
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default SendIngredientsToOthersTteokgukModal;

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
    backgroundColor: "primary.20",
    borderBottomRadius: "0.8rem",
    marginBottom: "2rem",
    padding: "1.2rem",
  }),
};
