import { FormEvent } from "react";

import { useAtom, useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { LoggedInUserDetailsResponse } from "@/types/user.dto";
import { IngredientKey } from "@/types/ingredient";

import Modal from "../common/modal/Modal";
import Ingredient from "../TteokgukCookingPage/Ingredient";
import Button from "../common/Button";

import { $postIngredientsToMyTteokguk, $updateSelectedIngredients } from "@/store/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tteokgukId: number;
  myDetails: LoggedInUserDetailsResponse;
  requiredIngredients: IngredientKey[];
}

const AddIngredientsToMyTteokgukModal = ({
  isOpen,
  onClose,
  tteokgukId,
  myDetails,
  requiredIngredients,
}: Props) => {
  const { mutate: postIngredients } = useAtomValue($postIngredientsToMyTteokguk);
  const [selectedIngredients, updateSelectedIngredients] = useAtom($updateSelectedIngredients);

  const { itemResponses: ingredientsStocks } = myDetails;

  const handleClickIngredient = (ingredientKey: IngredientKey) => () => {
    if (!requiredIngredients.includes(ingredientKey)) return;

    updateSelectedIngredients(ingredientKey);
  };

  const handleSubmitIngredients = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedIngredients.length === 0) return;

    postIngredients(
      {
        tteokgukId,
        ingredients: selectedIngredients,
      },
      {
        onSuccess: () => {
          updateSelectedIngredients([]);
          onClose();
        },
      },
    );
  };

  const handleClickClose = () => {
    onClose();
    updateSelectedIngredients([]);
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header onClose={handleClickClose} hasCloseButton className={styles.title}>
          떡국 재료 추가하기
        </Modal.Header>
        <Modal.Body className={styles.contentContainer}>
          <div className={styles.bodyTitle}>내가 가지고 있는 재료</div>
          <form onSubmit={handleSubmitIngredients}>
            <ol className={styles.content}>
              {ingredientsStocks.map(
                ({ ingredient, stockQuantity }) =>
                  stockQuantity > 0 && (
                    <Ingredient
                      key={ingredient}
                      ingredientKey={ingredient}
                      handleClickIngredient={handleClickIngredient(ingredient)}
                      stockQuantity={stockQuantity}
                      isSelected={selectedIngredients.includes(ingredient)}
                      isDisabled={!requiredIngredients.includes(ingredient)}
                    />
                  ),
              )}
            </ol>
            <Button color="primary.100" applyColorTo="background">
              추가하기
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    )
  );
};

export default AddIngredientsToMyTteokgukModal;

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
