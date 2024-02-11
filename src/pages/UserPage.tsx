import { Fragment } from "react";
import { useParams } from "react-router-dom";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { copyLink } from "@/utils/linkShare";

import ErrorFallbackPage from "./ErrorFallbackPage";
import Meta from "./Meta";

import useRouter from "@/routes/useRouter";
import Header from "@/components/common/Header";
import IconButton from "@/components/common/IconButton";
import Loading from "@/components/common/Loading";
import UserProfileSection from "@/components/common/UserProfileSection";
import TteokgukList from "@/components/common/TteokgukList";
import { $getRandomUserDetails, $getUserDetail } from "@/store/user";
import VisitIcon from "@/assets/svg/visit.svg";
import notFound from "@/assets/images/not-found.png";

const UserPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const {
    data: userDetails,
    isPending,
    isError,
    refetch,
  } = useAtomValue($getUserDetail(Number(id)));
  const { refetch: refetchRandomUserDetails } = useAtomValue($getRandomUserDetails);

  if (isPending || !userDetails) {
    return (
      <Fragment>
        <Header showBackButton showHomeButton actionIcon="profile">
          프로필
        </Header>
        <div className={styles.container}>
          <Loading />
        </div>
      </Fragment>
    );
  }

  if (!userDetails || isError) {
    return <ErrorFallbackPage retry={refetch} />;
  }

  const { nickname, primaryIngredient: uniqueIngredientKey, tteokguks } = userDetails;

  const handleClickRandomVisitButton = async () => {
    const { data: randomUserDetails } = await refetchRandomUserDetails();

    gtag("event", "click", { event_category: "랜덤 유저 방문" });

    if (randomUserDetails) {
      router.push(`/users/${randomUserDetails.id}`);
    }
  };

  if (!id) return <Fragment />;

  const handleClickShareButton = () => {
    copyLink({
      path: `/users/${id}`,
      eventCategory: "마이페이지 링크 공유 클릭",
    });
  };

  return (
    <Fragment>
      <Meta
        path={`/users/${Number(id)}`}
        title="다른 유저 페이지"
        description="다른 유저들은 어떤 떡국을 만들었는지 확인해보세요"
      />
      <Header showBackButton showHomeButton actionIcon="profile">
        프로필
      </Header>
      <div className={styles.container}>
        <UserProfileSection
          nickname={nickname}
          uniqueIngredientKey={uniqueIngredientKey}
          color="primary"
          onClickShareButton={handleClickShareButton}
        />
        <div className={styles.buttonContainer}>
          <IconButton
            onClick={handleClickRandomVisitButton}
            color="primary.45"
            applyColorTo="outline"
          >
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
          {!isPending && tteokguks.length === 0 && (
            <div className={styles.noTteokguk}>
              <div className={styles.noTteokgukTitle}>아직 만든 떡국이 없어요.</div>
              <div>랜덤 방문을 통해 떡국을 만든 사용자를 찾아보세요.</div>
              <img className={styles.notFound} src={notFound} alt="데이터 없음" />
            </div>
          )}
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
  noTteokguk: css({
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    marginTop: "1.6rem",
    fontSize: "1.4rem",
  }),
  noTteokgukTitle: css({
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
  }),
  notFound: css({
    marginTop: "1.6rem",
  }),
};
