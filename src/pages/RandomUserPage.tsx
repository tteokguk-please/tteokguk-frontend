import { Fragment } from "react";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import IconButton from "@/components/common/IconButton";
import UserProfileSection from "@/components/common/UserProfileSection";
import TteokgukList from "@/components/common/TteokgukList";
import DumplingIcon from "@/assets/svg/ingredients/dumpling.svg";
import VisitIcon from "@/assets/svg/visit.svg";

const RandomUserPage = () => {
  return (
    <Fragment>
      <Header hasPreviousPage actionIcon="profile">
        프로필
      </Header>
      <div className={styles.container}>
        <UserProfileSection
          nickname="사용자 닉네임"
          UniqueIngredientIcon={<DumplingIcon />}
          color="primary"
        />
        <div className={styles.buttonContainer}>
          <IconButton color="primary.45" applyColorTo="outline">
            <IconButton.Icon>
              <VisitIcon />
            </IconButton.Icon>
            랜덤 방문
          </IconButton>
        </div>
        <div>
          <div className={styles.wishTteokgukTitle}>
            <div>사용자님의 소원 떡국 리스트</div>
          </div>
          <TteokgukList className={styles.tteokgukList} />
        </div>
      </div>
    </Fragment>
  );
};

export default RandomUserPage;

const styles = {
  container: css({
    height: "calc(100% - 5.6rem)",
    padding: "0 2.4rem 2.4rem",
    marginBottom: "0.8rem",
  }),
  buttonContainer: css({
    display: "flex",
    gap: "0.8rem",
  }),
  wishTteokgukTitle: css({
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 700,

    marginTop: "3.2rem",
  }),
  tteokgukList: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 9.6rem)",
    justifyContent: "space-between",
    rowGap: "1.2rem",
    marginTop: "1.2rem",
  }),
};
