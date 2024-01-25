import { Fragment } from "react";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";
import ProfileIcon from "@/assets/svg/profile.svg";
import ActivityIcon from "@/assets/svg/activity.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import Button from "@/components/common/Button";

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
          <div className={styles.meterialContainer}></div>
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
    height: "calc(100% - 4.8rem)",
    paddingX: "2.4rem",
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
  }),
  wishDeleteButton: css({
    display: "flex",
    justifyContent: "center",
    color: "gray.50",
    marginTop: "4rem",
  }),
};
