import { css } from "@styled-system/css";

import { copyLink } from "@/utils/linkShare";

import { IngredientKey } from "@/types/ingredient";

import { INGREDIENT_ICON_BY_KEY } from "@/constants/ingredient";

interface Props {
  id: number;
  nickname: string;
  uniqueIngredientKey: IngredientKey;
  color: "primary" | "secondary";
  className?: string;
  isMyPage?: boolean;
}

const UserProfileSection = ({
  id,
  nickname,
  uniqueIngredientKey,
  color,
  isMyPage = false,
}: Props) => {
  const IngredientIcon = INGREDIENT_ICON_BY_KEY[40][uniqueIngredientKey];

  const handleClickShareButton = () => {
    copyLink({
      path: `/users/${id}`,
      eventCategory: isMyPage ? "마이페이지 링크 공유 클릭" : "다른 유저 페이지 링크 공유 클릭",
    });
  };

  return (
    <article className={styles.userInfo(color)}>
      <div className={styles.uniqueIngredient}>
        <div className={styles.ingredientIcon(color)}>
          <IngredientIcon />
        </div>
        <div>{nickname}님</div>
      </div>
      <button onClick={handleClickShareButton} className={styles.shareButton(color)}>
        공유하기
      </button>
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
      marginRight: "0.6rem",
    }),
  primary: css({
    backgroundColor: "primary.100",
  }),
  secondary: css({
    backgroundColor: "secondary.100",
  }),
  shareButton: (color: "primary" | "secondary") =>
    css({
      fontSize: "1.4rem",
      fontWeight: 600,
      width: "6.5rem",
      backgroundColor: color === "primary" ? "primary.20" : "secondary.50",
      borderRadius: "0.4rem",
      paddingY: "0.4rem",
    }),
};
