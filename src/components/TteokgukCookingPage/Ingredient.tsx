import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import {
  INFINITY,
  INGREDIENT_ICON_BY_KEY,
  INGREDIENT_NAME_BY_KEY,
  MAX_INGREDIENT_QUANTITY,
} from "@/constants/ingredient";

interface Props {
  ingredientKey: IngredientKey;
  isSelected: boolean;
  stockQuantity: number;
  isDisabled: boolean;
  handleClickIngredient: () => void;
}

const Ingredient = ({
  ingredientKey,
  isSelected,
  stockQuantity,
  isDisabled,
  handleClickIngredient,
}: Props) => {
  const isInfiniteQuantity = stockQuantity >= MAX_INGREDIENT_QUANTITY;
  const remainQuantity = isSelected ? stockQuantity - 1 : stockQuantity;
  const quantity = isInfiniteQuantity ? INFINITY : remainQuantity;

  const IngredientIcon = INGREDIENT_ICON_BY_KEY[isDisabled ? "disabled" : 40][ingredientKey];

  const getBackgroundColor = () => {
    if (isDisabled) return "white";
    if (isSelected) return "secondary.50";
    return "primary.45";
  };

  return (
    <li
      onClick={handleClickIngredient}
      className={styles.ingredient(getBackgroundColor())}
      aria-label={INGREDIENT_NAME_BY_KEY[ingredientKey]}
    >
      <div className={styles.ingredientNumber}>{quantity}</div>
      <IngredientIcon />
    </li>
  );
};

export default Ingredient;

const styles = {
  ingredient: (backgroundColor: "white" | "primary.45" | "secondary.50") =>
    css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "5.6rem",
      height: "5.6rem",
      borderRadius: "50%",
      backgroundColor,
      cursor: `${backgroundColor === "white" ? "default" : "pointer"}`,
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
