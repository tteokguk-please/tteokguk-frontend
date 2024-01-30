import { css } from "@styled-system/css";

import { IngredientKey, IngredientQuantity } from "@/types/ingredient";

import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  ingredients: IngredientQuantity[];
  uniqueIngredient: IngredientKey;
}

const INFINITY = "\u221E";

const IngredientList = ({ ingredients, uniqueIngredient }: Props) => {
  return (
    <ul className={styles.list}>
      {ingredients.map(({ ingredient, stockQuantity }, index) => {
        const Icon = INGREDIENT_ICON_BY_KEY[ingredient];

        return (
          <li key={`${index}-${ingredient}`} className={styles.item}>
            <div className={styles.title}>{INGREDIENT_NAME_BY_KEY[ingredient]}</div>
            <div className={styles.iconContainer}>
              <Icon />
              <span>X {ingredient === uniqueIngredient ? INFINITY : stockQuantity}</span>
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
    width: "9.6rem",
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
