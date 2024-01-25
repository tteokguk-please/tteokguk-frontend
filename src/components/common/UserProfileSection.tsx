import { ReactNode } from "react";

import { css } from "@styled-system/css";

interface Props {
  nickname: string;
  UniqueIngredientIcon: ReactNode;
  color: "primary" | "secondary";
  className?: string;
}

const UserProfileSection = ({ nickname, UniqueIngredientIcon, color }: Props) => {
  return (
    <article className={styles.userInfo(color)}>
      <div>{nickname}님</div>
      <div className={styles.uniqueIngredient}>
        고유재료
        <div className={styles.ingredientIcon(color)}>{UniqueIngredientIcon}</div>
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