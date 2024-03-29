import { Fragment, useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import { useAtom, useAtomValue } from "jotai";
import { useOverlay } from "@toss/use-overlay";
import { toast } from "sonner";

import { useDialog } from "@/hooks/useDialog";

import { css } from "@styled-system/css";

import { getLocalStorage } from "@/utils/localStorage";
import { copyLink } from "@/utils/linkShare";

import { IngredientKey } from "@/types/ingredient";

import ErrorFallbackPage from "./ErrorFallbackPage";
import Meta from "./Meta";

import { Link } from "@/routes/Link";
import useRouter from "@/routes/useRouter";
import AddIngredientsToMyTteokgukModal from "@/components/shared/AddIngredientsToMyTteokgukModal";
import SendIngredientsToOthersTteokgukModal from "@/components/shared/SendIngredientToOthersTteokgukModal";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Ingredient from "@/components/common/Ingredient";
import TteokgukImage from "@/components/common/TteokgukImage";
import { $getLoggedInUserDetails } from "@/store/user";
import {
  $deleteTteokguk,
  $getRandomTteokguk,
  $getTteokguk,
  $getTteokgukCheerMessages,
  $postCompleteTteokguk,
  $ingredientSupportMessage,
} from "@/store/tteokguk";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";
import SmallActivityIcon from "@/assets/svg/small-activity.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import Loading from "@/components/common/Loading";
import SuccessfulTteokgukCreationModal from "@/components/shared/SuccessfulTteokgukCreationModal";
import { $selectedIngredient } from "@/store/ingredient";
import ViewMessageModal from "@/components/shared/ViewMessageModal";

const MAX_INGREDIENTS = 5;

const TteokgukPage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();
  const addIngredientsToMyTteokgukOverlay = useOverlay();
  const sendIngredientsToOthersTteokgukOverlay = useOverlay();
  const successfulTteokgukCreationOverlay = useOverlay();
  const viewMessageOverlay = useOverlay();
  const router = useRouter();
  const { confirm } = useDialog();
  const { data: loggedInUserDetails } = useAtomValue(
    $getLoggedInUserDetails(!!getLocalStorage("accessToken")),
  );
  const { mutate: deleteTteokguk } = useAtomValue($deleteTteokguk);
  const { data: tteokguk, isPending, isError, refetch } = useAtomValue($getTteokguk(Number(id)));
  const { refetch: refetchRandomTteokguk } = useAtomValue($getRandomTteokguk);
  const { mutate: postCompleteTteokguk } = useAtomValue($postCompleteTteokguk);
  const { data: tteokgukCheerMessages } = useAtomValue($getTteokgukCheerMessages(Number(id)));
  const [, setIngredientSupportMessage] = useAtom($ingredientSupportMessage);
  const [, setSelectedIngredient] = useAtom($selectedIngredient);

  useEffect(() => {
    const ingredientKey = searchParams.get("ingredient") as IngredientKey;
    if (ingredientKey === null) return;

    const { nickname, message, ingredient } = tteokgukCheerMessages.supporters[ingredientKey];

    setIngredientSupportMessage((previousState) => ({ ...previousState, nickname, message }));
    setSelectedIngredient(ingredient);

    viewMessageOverlay.open(({ isOpen, close }) => (
      <ViewMessageModal
        isOpen={isOpen}
        onClose={() => {
          searchParams.delete("ingredient");
          setSearchParams(searchParams, { replace: true });
          close();
        }}
        ingredientKey={ingredientKey}
      />
    ));
    // mount 시에만 실행
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isPending) {
    return (
      <Fragment>
        <Header showBackButton showHomeButton actionIcon="profile">
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

  const {
    nickname,
    wish,
    ingredients,
    usedIngredients,
    requiredIngredients,
    completion,
    backgroundColor,
    frontGarnish,
    backGarnish,
    tteokgukId,
    memberId,
  } = tteokguk;
  const isMyTteokguk = loggedInUserDetails?.id === memberId;

  const handleClickAddIngredientButton = () => {
    if (!loggedInUserDetails) return;

    if (isMyTteokguk) {
      gtag("event", "click", { event_category: "내 떡국에 재료 추가" });
      addIngredientsToMyTteokgukOverlay.open(({ isOpen, close }) => (
        <AddIngredientsToMyTteokgukModal
          isOpen={isOpen}
          onClose={close}
          tteokgukId={tteokgukId}
          myDetails={loggedInUserDetails}
          requiredIngredients={requiredIngredients}
          usedIngredients={usedIngredients}
        />
      ));
    }

    if (!isMyTteokguk) {
      gtag("event", "click", { event_category: "다른 사람 떡국에 재료 추가" });

      sendIngredientsToOthersTteokgukOverlay.open(({ isOpen, close }) => (
        <SendIngredientsToOthersTteokgukModal
          isOpen={isOpen}
          onClose={close}
          tteokgukId={tteokgukId}
          myDetails={loggedInUserDetails}
          requiredIngredients={requiredIngredients}
          usedIngredients={usedIngredients}
        />
      ));
    }
  };

  const handleClickDeleteTteokgukButton = async () => {
    const isConfirmedDelete = await confirm({
      title: <span className={styles.confirmTitle}>소원 떡국을 삭제하시겠어요?</span>,
      description: (
        <div className={styles.confirmContent}>
          <div className={styles.block}>소원 떡국을 삭제하면</div>
          다시 복구할 수 없어요!
        </div>
      ),
      confirmButton: { text: "삭제" },
      cancelButton: { text: "취소" },
    });

    if (!isConfirmedDelete) return;

    deleteTteokguk(tteokgukId, {
      onSuccess: () => {
        gtag("event", "click", { event_category: "소원 떡국 삭제" });

        router.back();
      },
    });
  };

  const handleClickRandomVisitButton = async () => {
    const { data: randomTteokguk } = await refetchRandomTteokguk();

    gtag("event", "click", { event_category: "랜덤 떡국 방문" });

    if (randomTteokguk) {
      router.push(`/tteokguks/${randomTteokguk.tteokgukId}`);
    }
  };

  const handleClickCompleteButton = () => {
    postCompleteTteokguk(tteokgukId, {
      onSuccess: () => {
        gtag("event", "click", { event_category: "소원 떡국 완성" });

        successfulTteokgukCreationOverlay.open(({ isOpen, close }) => (
          <SuccessfulTteokgukCreationModal
            isOpen={isOpen}
            onClose={close}
            isCompletion
            tteokgukId={tteokgukId}
            nickname={nickname}
            tteokgukBackgroundColor={backgroundColor}
            frontGarnish={frontGarnish}
            backGarnish={backGarnish}
          />
        ));
      },
    });
  };

  const handleClickCopyLinkButton = () => {
    copyLink({ path: location.pathname, eventCategory: "소원 떡국 링크 복사" });
  };

  const handleClickIngredient = (ingredientKey: IngredientKey) => () => {
    if (!tteokgukCheerMessages.supporters || !tteokgukCheerMessages.supporters[ingredientKey]) {
      if (usedIngredients.includes(ingredientKey)) toast("본인이 추가한 재료입니다.");
      return;
    }

    const { nickname, message, ingredient } = tteokgukCheerMessages.supporters[ingredientKey];

    setIngredientSupportMessage((previousState) => ({ ...previousState, nickname, message }));
    setSelectedIngredient(ingredient);

    setSearchParams(`?ingredient=${ingredientKey}`, { replace: true });

    viewMessageOverlay.open(({ isOpen, close }) => {
      return (
        <ViewMessageModal
          isOpen={isOpen}
          onClose={() => {
            searchParams.delete("ingredient");
            setSearchParams(searchParams, { replace: true });
            close();
          }}
          ingredientKey={ingredientKey}
        />
      );
    });
  };

  return (
    <Fragment>
      <Meta
        path={`/tteokguks/${Number(id)}`}
        title="소원 떡국 상세보기 페이지"
        description="떡국에 어떤 소원과 재료가 들어갔는지 확인해보세요"
      />
      <Header showBackButton showHomeButton actionIcon="profile">
        소원 떡국
      </Header>
      <div className={styles.container}>
        <article>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <SmallActivityIcon />
              {nickname}님
            </div>
            <Link to={`/users/${memberId}`} className={styles.profileVisit}>
              프로필 방문하기
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <TteokgukImage
              completion={completion}
              backgroundColor={backgroundColor}
              frontGarnish={frontGarnish}
              backGarnish={backGarnish}
            />
          </div>
          <div className={styles.content}>
            <div className={styles.wish}>{wish}</div>
            <button onClick={handleClickCopyLinkButton} className={styles.shareLinkButton}>
              떡국 공유하기
            </button>
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
                  onClick={handleClickIngredient(ingredientKey)}
                  key={ingredientKey}
                  IngredientIcon={INGREDIENT_ICON_BY_KEY[40][ingredientKey]}
                  name={INGREDIENT_NAME_BY_KEY[ingredientKey]}
                  isSelected={usedIngredients.includes(ingredientKey)}
                />
              ))}
            </div>
            <div className={styles.ingredientSecondRow}>
              {ingredients.slice(3, 5).map((ingredientKey) => (
                <Ingredient
                  onClick={handleClickIngredient(ingredientKey)}
                  key={ingredientKey}
                  IngredientIcon={INGREDIENT_ICON_BY_KEY[40][ingredientKey]}
                  name={INGREDIENT_NAME_BY_KEY[ingredientKey]}
                  isSelected={usedIngredients.includes(ingredientKey)}
                />
              ))}
            </div>
          </div>
        </article>

        {!getLocalStorage("accessToken") && (
          <Link to="/login">
            <Button color="primary.45" applyColorTo="outline">
              소원 떡국 만들기
            </Button>
          </Link>
        )}
        {!!getLocalStorage("accessToken") && !isMyTteokguk && !completion && (
          <Button
            onClick={handleClickAddIngredientButton}
            color="primary.45"
            applyColorTo="outline"
          >
            떡국 재료 보내기
          </Button>
        )}
        {isMyTteokguk && requiredIngredients.length !== 0 && !completion && (
          <Button
            onClick={handleClickAddIngredientButton}
            color="primary.45"
            applyColorTo="outline"
          >
            떡국 재료 추가하기
          </Button>
        )}
        {isMyTteokguk && requiredIngredients.length === 0 && completion && (
          <Link to="/tteokguk/create">
            <Button color="primary.45" applyColorTo="outline">
              다른 떡국 만들기
            </Button>
          </Link>
        )}
        {isMyTteokguk && requiredIngredients.length === 0 && !completion && (
          <Button onClick={handleClickCompleteButton} color="primary.45" applyColorTo="outline">
            완성하기
          </Button>
        )}

        <Button
          onClick={handleClickRandomVisitButton}
          className={styles.randomVisitButton}
          color="primary.100"
          applyColorTo="background"
        >
          랜덤 떡국 방문하기
        </Button>

        {isMyTteokguk && (
          <div className={styles.wishDeleteButton}>
            <button onClick={handleClickDeleteTteokgukButton}>소원 삭제하기</button>
          </div>
        )}
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
    paddingBottom: "2rem",
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
  profileVisit: css({
    display: "flex",
    alignItems: "center",
    height: "2.6rem",
    paddingX: "0.8rem",
    backgroundColor: "primary.20",
    fontSize: "1.4rem",
    borderRadius: "0.4rem",
  }),
  imageContainer: css({
    position: "relative",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderTopRadius: "0.8rem",
    height: "17.6rem",
  }),
  content: css({
    minHeight: "7.1rem",
    fontSize: "1.4rem",
    backgroundColor: "primary.100",
    marginBottom: "2.7rem",
    borderBottomRadius: "1.2rem",
  }),
  wish: css({
    padding: "1rem 1.6rem",
  }),
  shareLinkButton: css({
    width: "100%",
    height: "3.6rem",
    backgroundColor: "primary.200",
    borderBottomRadius: "1.2rem",
    borderTop: "0.1rem solid white",
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
    marginBottom: "2rem",
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
  confirmTitle: css({
    fontSize: "1.6rem",
  }),
  confirmContent: css({
    display: "flex",
    flexFlow: "column wrap",
    justifyContent: "center",
    textAlign: "center",
    marginY: "1.6rem",
  }),
  block: css({
    display: "block",
  }),
  randomVisitButton: css({
    marginTop: "1rem",
  }),
};
