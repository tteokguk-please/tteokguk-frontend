import { css } from "@styled-system/css";

import DumplingIcon from "@/assets/svg/ingredients-40/dumpling.svg";

interface Props {
  ingredientCount: number;
}

const IngredientListItem = ({ ingredientCount }: Props) => {
  return (
    <li className={styles.item}>
      <div className={styles.title}>희망떡</div>
      <div className={styles.iconContainer}>
        <DumplingIcon />
        <span>X {ingredientCount}</span>
      </div>
    </li>
  );
};

export default IngredientListItem;

const styles = {
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
