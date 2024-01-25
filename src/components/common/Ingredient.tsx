import { ReactNode } from "react";

import { css } from "@styled-system/css";

interface Props {
  ingredientIcon: ReactNode;
  label: string;
}

const Ingredient = ({ ingredientIcon, label }: Props) => {
  return (
    <button className={styles.ingredientContainer}>
      <div className={styles.ingredientIcon}>{ingredientIcon}</div>
      <div className={styles.ingredientLabel}>{label}</div>
    </button>
  );
};

export default Ingredient;

const styles = {
  ingredientContainer: css({
    position: "relative",
    cursor: "pointer",
  }),
  ingredientIcon: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "7.6rem",
    height: "7.6rem",
    backgroundColor: "primary.45",
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
