import { Fragment } from "react";

import classNames from "classnames";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";
import { TteokgukBackgroudColor } from "@/types/tteokguk";

import { BACKGROUND_COLOR, GARNISHES } from "@/constants/garnish";
import { INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  completion: boolean;
  backgroundColor: TteokgukBackgroudColor;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
}

const TteokgukImage = ({ completion, backgroundColor, frontGarnish, backGarnish }: Props) => {
  return (
    <Fragment>
      <img
        src={BACKGROUND_COLOR[backgroundColor]}
        className={styles.image}
        alt={completion ? "완성된 떡국" : "미완성 떡국"}
      />
      {completion && (
        <Fragment>
          <img
            src={GARNISHES.front[frontGarnish]}
            className={classNames(styles.image, styles.front)}
            alt={INGREDIENT_NAME_BY_KEY[frontGarnish]}
          />
          <img
            src={GARNISHES.back[backGarnish]}
            className={classNames(styles.image, styles.back)}
            alt={INGREDIENT_NAME_BY_KEY[backGarnish]}
          />
        </Fragment>
      )}
    </Fragment>
  );
};

export default TteokgukImage;

const styles = {
  image: css({
    width: "100%",
    height: "100%",
    position: "absolute",
    objectFit: "cover",
    objectPosition: "center",
  }),
  front: css({
    zIndex: 10,
  }),
  back: css({
    zIndex: 9,
  }),
};
