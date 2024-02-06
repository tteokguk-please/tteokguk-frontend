import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { useAtomValue } from "jotai";
import { useOverlay } from "@toss/use-overlay";

import { css } from "@styled-system/css";

import { getLocalStorage } from "@/utils/localStorage";

import ErrorFallbackPage from "./ErrorFallbackPage";

import { Link } from "@/routes/Link";
import AddIngredientsModal from "@/components/shared/AddIngredientsModal";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Ingredient from "@/components/common/Ingredient";
import { $getLoggedInUserDetails } from "@/store/user";
import { $getTteokguk } from "@/store/tteokguk";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";
import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";
import ActivityIcon from "@/assets/svg/activity.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import Loading from "@/components/common/Loading";

const MAX_INGREDIENTS = 5;

const TteokgukPage = () => {
  const { id } = useParams();
  const addIngredientModalOverlay = useOverlay();
  const { data: loggedInUserDetails } = useAtomValue($getLoggedInUserDetails);
  const { data: tteokguk, isPending, isError, refetch } = useAtomValue($getTteokguk(Number(id)));

  if (isPending) {
    return (
      <Fragment>
        <Header showBackButton actionIcon="profile">
          소원 떡국
        </Header>
        <div className={styles.container}>
          <Loading />
        </div>
      </Fragment>
    );
  }

  if (!tteokguk || isError) {
    return <ErrorFallbackPage retry={refetch} />;
  }

  const { nickname, wish, ingredients, usedIngredients, memberId } = tteokguk;
  const isLoggedIn = !!getLocalStorage("accessToken");

  const handleClickAddIngredientButton = () => {
    if (!loggedInUserDetails) return;

    addIngredientModalOverlay.open(({ isOpen, close }) => (
      <AddIngredientsModal
        isOpen={isOpen}
        onClose={close}
        memberId={memberId}
        loggedInUserDetails={loggedInUserDetails}
      />
    ));
  };

  return (
    <Fragment>
      <Header showBackButton actionIcon="profile">
        소원 떡국
      </Header>
      <div className={styles.container}>
        <article>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <ActivityIcon />
              {nickname}님의 떡국
            </div>
            <button className={styles.randomVisitButton}>랜덤 방문</button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img src={tteokgukIncomplete} alt="미완성 떡국" />
            </div>
            <div className={styles.content}>{wish}</div>
          </div>
        </article>
        <article>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <MeterialIcon />
              필요한 떡국 재료
            </div>
            <div>
              {usedIngredients.length}/{MAX_INGREDIENTS}
            </div>
          </div>
          <div className={styles.meterialContainer}>
            <div className={styles.ingredientFirstRow}>
              {ingredients.slice(0, 3).map((ingredientKey) => (
                <Ingredient
                  IngredientIcon={INGREDIENT_ICON_BY_KEY[40][ingredientKey]}
                  name={INGREDIENT_NAME_BY_KEY[ingredientKey]}
                  isSelected={usedIngredients.includes(ingredientKey)}
                  isPointer={false}
                />
              ))}
            </div>
            <div className={styles.ingredientSecondRow}>
              {ingredients.slice(3, 5).map((ingredientKey) => (
                <Ingredient
                  IngredientIcon={INGREDIENT_ICON_BY_KEY[40][ingredientKey]}
                  name={INGREDIENT_NAME_BY_KEY[ingredientKey]}
                  isSelected={usedIngredients.includes(ingredientKey)}
                  isPointer={false}
                />
              ))}
            </div>
          </div>
        </article>

        {!isLoggedIn && (
          <Link to="/login">
            <Button color="primary.45" applyColorTo="outline">
              소원 떡국 만들기
            </Button>
          </Link>
        )}
        {isLoggedIn && (
          <Button
            onClick={handleClickAddIngredientButton}
            color="primary.45"
            applyColorTo="outline"
          >
            {loggedInUserDetails?.id === memberId ? "떡국 재료 추가하기" : "떡국 재료 보내기"}
          </Button>
        )}

        <div className={styles.wishDeleteButton}>
          <button>소원 삭제하기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default TteokgukPage;

const styles = {
  container: css({
    height: "calc(100% - 5.9rem)",
    paddingX: "2.4rem",
    marginTop: "1.1rem",
  }),
  titleContainer: css({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "0.8rem",
  }),
  title: css({
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
  }),
  randomVisitButton: css({
    width: "6.8rem",
    height: "2.6rem",
    backgroundColor: "primary.20",
    fontSize: "1.4rem",
    borderRadius: "0.4rem",
  }),
  imageContainer: css({
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
    overflow: "hidden",
    marginBottom: "2.7rem",
  }),
  image: css({
    display: "flex",
    justifyContent: "center",
    height: "17.6rem",
    backgroundColor: "white",
  }),
  content: css({
    height: "7.1rem",
    fontSize: "1.4rem",
    backgroundColor: "primary.100",
    padding: "1rem 1.6rem",
  }),
  meterialContainer: css({
    height: "23.2rem",
    backgroundColor: "primary.20",
    borderRadius: "0.8rem",
    marginBottom: "2.4rem",
    padding: "2.4rem",
  }),
  ingredientFirstRow: css({
    display: "flex",
    justifyContent: "center",
    gap: "1.8rem",
    marginBottom: "3rem",
    cursor: "default",
  }),
  ingredientSecondRow: css({
    display: "flex",
    justifyContent: "center",
    gap: "1.8rem",
    cursor: "default",
  }),
  wishDeleteButton: css({
    display: "flex",
    justifyContent: "center",
    color: "gray.50",
    marginTop: "4rem",
  }),
};
