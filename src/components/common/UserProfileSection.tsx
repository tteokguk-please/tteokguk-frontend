import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import { INGREDIENT_ICON_BY_KEY } from "@/constants/ingredient";

interface Props {
  nickname: string;
  uniqueIngredientKey: IngredientKey;
  color: "primary" | "secondary";
  className?: string;
}

const UserProfileSection = ({ nickname, uniqueIngredientKey, color }: Props) => {
  const IngredientIcon = INGREDIENT_ICON_BY_KEY[uniqueIngredientKey];

  return (
    <article className={styles.userInfo(color)}>
      <div>{nickname}님</div>
      <div className={styles.uniqueIngredient}>
        고유재료
        <div className={styles.ingredientIcon(color)}>
          <IngredientIcon />
        </div>
      </div>
    </article>
  );
};

export default UserProfileSection;

const styles = {
  userInfo: (color: "primary" | "secondary") =>
    css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "8.4rem",
      fontWeight: 700,
      borderRadius: "0.8rem",
      backgroundColor: `${color}.100`,
      paddingX: "1.6rem",
      marginBottom: "1rem",
    }),
  uniqueIngredient: css({
    display: "flex",
    alignItems: "center",
  }),
  ingredientIcon: (color: "primary" | "secondary") =>
    css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "5.2rem",
      height: "5.2rem",
      borderRadius: "50%",
      backgroundColor: color === "primary" ? "primary.20" : "secondary.50",
      marginLeft: "1rem",
    }),
  primary: css({
    backgroundColor: "primary.100",
  }),
  secondary: css({
    backgroundColor: "secondary.100",
  }),
};
