import { Fragment } from "react";

import { useAtomValue } from "jotai";

import { useDialog } from "@/hooks/useDialog";

import { css } from "@styled-system/css";

import { removeLocalStorage } from "@/utils/localStorage";
import { copyLink } from "@/utils/linkShare";

import ErrorFallbackPage from "./ErrorFallbackPage";
import Meta from "./Meta";

import { Link } from "@/routes/Link";
import useRouter from "@/routes/useRouter";
import { $getMyDetails, $getRandomUserDetails, $deleteLoggedInUser } from "@/store/user";
import Header from "@/components/common/Header";
import IconButton from "@/components/common/IconButton";
import TteokgukList from "@/components/common/TteokgukList";
import IngredientList from "@/components/Mypage/IngredientList";
import VisitIcon from "@/assets/svg/visit.svg";
import BigActivityIcon from "@/assets/svg/big-activity.svg";
import Loading from "@/components/common/Loading";
import UserProfileSection from "@/components/common/UserProfileSection";

const MyPage = () => {
  const router = useRouter();
  const { data: myDetails, isPending, isError, refetch } = useAtomValue($getMyDetails);
  const { mutate: deleteLoggedInUser } = useAtomValue($deleteLoggedInUser);
  const { refetch: refetchRandomUserDetails } = useAtomValue($getRandomUserDetails);
  const { confirm, alert } = useDialog();

  if (isPending) {
    return (
      <Fragment>
        <Header showBackButton showHomeButton actionIcon="guide">
          마이페이지
        </Header>
        <div className={styles.container}>
          <Loading />
        </div>
      </Fragment>
    );
  }

  if (!myDetails || isError) {
    return <ErrorFallbackPage retry={refetch} />;
  }

  const { id, nickname, primaryIngredient, tteokguks, items: ingredients } = myDetails;

  const handleClickRandomVisitButton = async () => {
    const { data: randomUserDetails } = await refetchRandomUserDetails();

    gtag("event", "click", { event_category: "랜덤 유저 방문" });

    if (randomUserDetails) {
      router.push(`/users/${randomUserDetails.id}`);
    }
  };

  const handleClickLogoutButton = async () => {
    const isLoggedOut = await confirm({
      title: <div className={styles.confirmTitle}>로그아웃 하시겠어요?</div>,
      description: (
        <div className={styles.alertContent}>
          <div className={styles.block}>접속중인 아이디로</div>언제든 다시 로그인하실 수 있어요!
        </div>
      ),
      confirmButton: {
        text: "로그아웃",
        color: "primary.100",
        applyColorTo: "background",
      },
      cancelButton: {
        text: "취소",
        color: "primary.45",
        applyColorTo: "outline",
      },
    });

    if (isLoggedOut) {
      removeLocalStorage("accessToken");
      removeLocalStorage("refreshToken");
      gtag("event", "logout", { event_category: "로그아웃" });

      router.push("/");
    }
  };

  const handleClickWithdrawalButton = async () => {
    const isConfirmedWithdrawal = await confirm({
      title: <span className={styles.confirmTitle}>정말 탈퇴하시겠어요?</span>,
      description: (
        <div>
          <div className={styles.confirmContent}>
            <span className={styles.block}>계정을 삭제하면 복구할 수 없어요.</span>
            다른 사람들과 함께 더 많은 소원을 이뤄보세요🥺
          </div>
          <div className={styles.confirmDescription}>
            <span className={styles.block}>*계정을 삭제해도 작성하신 소원은 남아있어요.</span>
            <span className={styles.block}>남아있는 소원을 지우시고 싶으시다면</span>
            소원 떡국 하단의 삭제하기를 눌러주세요.
          </div>
        </div>
      ),
      confirmButton: { text: "탈퇴", color: "primary.45", applyColorTo: "outline" },
      cancelButton: { text: "취소", color: "primary.100", applyColorTo: "background" },
    });

    if (!isConfirmedWithdrawal) return;

    deleteLoggedInUser(undefined, {
      onSuccess: () => {
        removeLocalStorage("accessToken");
        removeLocalStorage("refreshToken");

        alert({
          title: <div className={styles.alertTitle}>탈퇴가 완료되었어요</div>,
          description: (
            <div className={styles.alertContent}>
              <span className={styles.block}>새해에 더 이루고싶은 소원이 생각나시면</span>
              다시 한 번 떡국을 부탁해를 들려주세요!🥺
            </div>
          ),
          confirmButton: {
            text: "첫 화면으로 이동",
            color: "primary.100",
            applyColorTo: "background",
            onClick: () => {
              gtag("event", "click", { event_category: "유저 탈퇴" });
              router.push("/");
            },
          },
        });
      },
    });
  };

  const handleClickShareButton = () => {
    copyLink({
      path: `/users/${id}`,
      eventCategory: "마이페이지 링크 공유 클릭",
    });
  };

  return (
    <Fragment>
      <Meta
        path="/my-page"
        title="마이 페이지"
        description="내가 가진 재료나 생성한 소원 떡국을 확인해보세요"
      />
      <Header showBackButton showHomeButton actionIcon="guide">
        마이페이지
      </Header>
      <div className={styles.container}>
        <UserProfileSection
          nickname={nickname}
          uniqueIngredientKey={primaryIngredient}
          color="secondary"
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
          <Link to="/my-page/activity" className={styles.full}>
            <IconButton color="primary.45" applyColorTo="outline">
              <IconButton.Icon>
                <BigActivityIcon />
              </IconButton.Icon>
              활동 내역
            </IconButton>
          </Link>
        </div>
        <div>
          <div className={styles.wishTteokgukTitle}>
            <div>소원 떡국 리스트</div>
            <Link to="/tteokguk/create" className={styles.wishTteokgukLink}>
              <button>소원 떡국 만들기</button>
            </Link>
          </div>
          {!isPending && tteokguks.length === 0 && (
            <div className={styles.noTteokguk}>
              <div className={styles.noTteokgukTitle}>아직 만든 떡국이 없어요.</div>
              <div>소원 떡국 만들기 버튼을 클릭하여 새 떡국을 만들어보세요.</div>
            </div>
          )}
          <TteokgukList tteokguks={tteokguks} />
        </div>
        <div>
          <div className={styles.wishTteokgukTitle}>
            <div>보유중인 떡국 재료</div>
          </div>
          <IngredientList ingredients={ingredients} uniqueIngredientKey={primaryIngredient} />
        </div>
        <div className={styles.accountContainer}>
          <button onClick={handleClickLogoutButton}>로그아웃</button>
          <button onClick={handleClickWithdrawalButton}>탈퇴하기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default MyPage;

const styles = {
  container: css({
    height: "calc(100% - 5.6rem)",
    paddingX: "2.4rem",
    paddingBottom: "2rem",
    marginBottom: "0.8rem",
  }),
  userInfo: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8.4rem",
    fontWeight: 700,
    borderRadius: "0.8rem",
    backgroundColor: "secondary.100",
    paddingX: "1.6rem",
    marginBottom: "1rem",
  }),
  uniqueIngredient: css({
    display: "flex",
    alignItems: "center",
  }),
  ingredientIcon: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5.2rem",
    height: "5.2rem",
    borderRadius: "50%",
    backgroundColor: "secondary.50",
    marginRight: "0.8rem",
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
  wishTteokgukLink: css({
    fontSize: "1.4rem",
    fontWeight: 400,
    borderRadius: "0.4rem",
    backgroundColor: "primary.20",
    padding: "0.45rem 0.8rem",
  }),
  accountContainer: css({
    display: "flex",
    justifyContent: "space-around",
  }),
  full: css({
    width: "100%",
  }),
  block: css({
    display: "block",
  }),
  confirmTitle: css({
    fontSize: "1.6rem",
  }),
  confirmContent: css({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    fontSize: "1.4rem",
    marginY: "1.6rem",
  }),
  confirmDescription: css({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    fontSize: "1.2rem",
    color: "gray.50",
    marginY: "1.6rem",
  }),
  alertTitle: css({
    fontSize: "1.6rem",
  }),
  alertContent: css({
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    fontSize: "1.4rem",
    marginY: "1.6rem",
  }),
  noTteokguk: css({
    textAlign: "center",
    marginTop: "1.6rem",
    fontSize: "1.4rem",
  }),
  noTteokgukTitle: css({
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
  }),
};
