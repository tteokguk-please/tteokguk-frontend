import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import { INFINITY, INGREDIENT_ICON_BY_KEY, MAX_INGREDIENT_QUANTITY } from "@/constants/ingredient";

interface Props {
  ingredientKey: IngredientKey;
  isSelected: boolean;
  stockQuantity: number;
  handleClickIngredient: () => void;
}

const Ingredient = ({ ingredientKey, isSelected, stockQuantity, handleClickIngredient }: Props) => {
  const quantity =
    stockQuantity === MAX_INGREDIENT_QUANTITY
      ? INFINITY
      : isSelected
      ? stockQuantity - 1
      : stockQuantity;
  const IngredientIcon = isSelected
    ? INGREDIENT_ICON_BY_KEY[40][ingredientKey]
    : INGREDIENT_ICON_BY_KEY.disabled[ingredientKey];

  return (
    <li onClick={handleClickIngredient} className={styles.ingredient(isSelected)} aria-label="만두">
      <div className={styles.ingredientNumber}>{quantity}</div>
      <IngredientIcon />
    </li>
  );
};

export default Ingredient;

const styles = {
  ingredient: (isSelected: boolean) =>
    css({
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "5.6rem",
      height: "5.6rem",
      borderRadius: "50%",
      backgroundColor: `${isSelected ? "secondary.100" : "white"}`,
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
