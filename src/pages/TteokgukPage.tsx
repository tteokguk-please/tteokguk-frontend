import { Fragment } from "react";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Ingredient from "@/components/common/Ingredient";
import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";
import ProfileIcon from "@/assets/svg/profile.svg";
import ActivityIcon from "@/assets/svg/activity.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import DumplingIcon from "@/assets/svg/dumpling.svg";

const TteokgukPage = () => {
  return (
    <Fragment>
      <Header hasPreviousPage actionIcon={<ProfileIcon />}>
        소원 떡국
      </Header>
      <div className={styles.container}>
        <article>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <ActivityIcon />
              아잣스님의 떡국
            </div>
            <button className={styles.randomVisitButton}>랜덤 방문</button>
          </div>
          <div className={styles.imageContainer}>
            <div className={styles.image}>
              <img src={tteokgukIncomplete} alt="미완성 떡국" />
            </div>
            <div className={styles.content}>적게 일하고 많이 벌기</div>
          </div>
        </article>
        <article>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <MeterialIcon />
              필요한 떡국 재료
            </div>
            <div>0/5</div>
          </div>
          <div className={styles.meterialContainer}>
            <div className={styles.ingredientFirstRow}>
              <Ingredient
                ingredientIcon={<DumplingIcon />}
                label="희망떡"
                isSelected
                onClick={() => {}}
              />
              <Ingredient
                ingredientIcon={<DumplingIcon />}
                label="사랑계란"
                isSelected
                onClick={() => {}}
              />
              <Ingredient
                ingredientIcon={<DumplingIcon />}
                label="해피김"
                isSelected
                onClick={() => {}}
              />
            </div>
            <div className={styles.ingredientSecondRow}>
              <Ingredient
                ingredientIcon={<DumplingIcon />}
                label="행운파"
                isSelected
                onClick={() => {}}
              />
              <Ingredient
                ingredientIcon={<DumplingIcon />}
                label="튼튼고기"
                isSelected
                onClick={() => {}}
              />
            </div>
          </div>
        </article>
        <Button color="primary.45" applyColorTo="outline">
          떡국 재료 추가하기
        </Button>
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
    justifyContent: "space-between",
    marginBottom: "2rem",
  }),
  ingredientSecondRow: css({
    display: "flex",
    justifyContent: "space-evenly",
  }),
  wishDeleteButton: css({
    display: "flex",
    justifyContent: "center",
    color: "gray.50",
    marginTop: "4rem",
  }),
};
