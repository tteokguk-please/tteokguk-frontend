import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import IconButton from "@/components/common/IconButton";
import UserProfileSection from "@/components/common/UserProfileSection";
import TteokgukList from "@/components/common/TteokgukList";
import VisitIcon from "@/assets/svg/visit.svg";
import { $getUserDetail } from "@/store/user";

const UserPage = () => {
  const { id } = useParams();
  const { data: userDetails } = useAtomValue($getUserDetail(Number(id)));
  const { nickname, primaryIngredient: uniqueIngredientKey, tteokguks } = userDetails;

  return (
    <Fragment>
      <Header showBackButton actionIcon="profile">
        프로필
      </Header>
      <div className={styles.container}>
        <UserProfileSection
          nickname={nickname}
          uniqueIngredientKey={uniqueIngredientKey}
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
          <TteokgukList tteokguks={tteokguks} className={styles.tteokgukList} />
        </div>
      </div>
    </Fragment>
  );
};

export default UserPage;

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
