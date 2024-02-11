import { css } from "@styled-system/css";

import { IngredientName } from "@/types/ingredient";

interface Props {
  IngredientIcon: string; // string 타입이지만 svg component로 사용
  name: IngredientName;
  onClick?: () => void;
  isSelected: boolean;
}

const Ingredient = ({ IngredientIcon, name, onClick, isSelected }: Props) => {
  return (
    <button type="button" className={styles.ingredientContainer(isSelected)} onClick={onClick}>
      <div className={styles.ingredientContent}>
        <div className={styles.ingredientIcon(isSelected)} aria-label={name}>
          {<IngredientIcon />}
        </div>
        <div className={styles.ingredientLabel}>{name}</div>
      </div>
    </button>
  );
};

export default Ingredient;

const styles = {
  ingredientContainer: (isPointer: boolean) =>
    css({
      cursor: isPointer ? "pointer" : "default",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "7.6rem",
      height: "7.6rem",
    }),
  ingredientContent: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  }),
  ingredientIcon: (isSelected: boolean) =>
    css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "7.6rem",
      height: "7.6rem",
      backgroundColor: isSelected ? "secondary.50" : "primary.45",
      borderRadius: "50%",
      overflow: "hidden",
    }),
  ingredientLabel: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "6.8rem",
    height: "2.2rem",
    fontSize: "1.2rem",
    marginTop: "-1.4rem",
    backgroundColor: "white",
    borderRadius: "0.4rem",
    textAlign: "center",
  }),
};
