import { css } from "@styled-system/css";

import { IngredientKey, IngredientQuantity } from "@/types/ingredient";

import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  ingredients: IngredientQuantity[];
  uniqueIngredientKey: IngredientKey;
}

const INFINITY = "\u221E";

const IngredientList = ({ ingredients, uniqueIngredientKey }: Props) => {
  return (
    <ul className={styles.list}>
      {ingredients.map(({ ingredient, stockQuantity }, index) => {
        const Icon = INGREDIENT_ICON_BY_KEY[40][ingredient];
        const quantity = ingredient === uniqueIngredientKey ? INFINITY : stockQuantity;

        return (
          <li key={`${index}-${ingredient}`} className={styles.item}>
            <div className={styles.title}>{INGREDIENT_NAME_BY_KEY[ingredient]}</div>
            <div className={styles.iconContainer}>
              <Icon />
              <span>X {quantity}</span>
            </div>
          </li>
        );
      })}
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
  item: css({
    minWidth: "9.6rem",
    flex: "1 0 9.6rem",
    height: "9.3rem",
    backgroundColor: "primary.20",
    borderRadius: "0.8rem",
  }),
  title: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "2.9rem",
    backgroundColor: "primary.100",
    borderTopRadius: "0.8rem",
  }),
  iconContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "6.4rem",
  }),
};
