import { css } from "@styled-system/css";

interface Props {
  IngredientIcon: string;
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const Ingredient = ({ IngredientIcon, label, onClick, isSelected }: Props) => {
  return (
    <button type="button" className={styles.ingredientContainer} onClick={onClick}>
      <div className={styles.ingredientIcon(isSelected)} aria-label={label}>
        {<IngredientIcon />}
      </div>
      <div className={styles.ingredientLabel}>{label}</div>
    </button>
  );
};

export default Ingredient;

const styles = {
  ingredientContainer: css({
    position: "relative",
    cursor: "pointer",
    width: "7.6rem",
    height: "7.6rem",
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
    position: "absolute",
    left: "0.5rem",
    bottom: "-1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "6.8rem",
    height: "2.2rem",
    fontSize: "1.2rem",
    backgroundColor: "white",
    borderRadius: "0.4rem",
    textAlign: "center",
  }),
};
