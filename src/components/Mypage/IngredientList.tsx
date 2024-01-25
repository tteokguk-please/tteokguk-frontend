import { css } from "@styled-system/css";

import IngredientListItem from "./IngredientListItem";

const IngredientList = () => {
  return (
    <ul className={styles.list}>
      <IngredientListItem ingredientCount={1} />
      <IngredientListItem ingredientCount={2} />
      <IngredientListItem ingredientCount={3} />
      <IngredientListItem ingredientCount={4} />
      <IngredientListItem ingredientCount={5} />
      <IngredientListItem ingredientCount={6} />
      <IngredientListItem ingredientCount={7} />
      <IngredientListItem ingredientCount={8} />
      <IngredientListItem ingredientCount={9} />
      <IngredientListItem ingredientCount={10} />
      <IngredientListItem ingredientCount={11} />
      <IngredientListItem ingredientCount={12} />
    </ul>
  );
};

export default IngredientList;

const styles = {
  list: css({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    gap: "1.2rem",
    fontSize: "1.4rem",
    fontWeight: 700,
    overflowX: "auto",
    marginTop: "1.2rem",
    marginBottom: "3.2rem",
  }),
};
