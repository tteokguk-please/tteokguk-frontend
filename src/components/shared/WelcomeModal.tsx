import { useState } from "react";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import useRouter from "@/routes/useRouter";
import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import GiftIcon from "@/assets/svg/gift.svg";
import LuckyBagIcon from "@/assets/svg/lucky-bag.svg";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  nickname: string;
  uniqueIngredientKey: IngredientKey;
}

const WelcomeModal = ({ isOpen, onClose, nickname, uniqueIngredientKey }: Props) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const ingredientName = INGREDIENT_NAME_BY_KEY[uniqueIngredientKey];
  const IngredientIcon = INGREDIENT_ICON_BY_KEY[80][uniqueIngredientKey];

  const modalContents = [
    {
      title: `${nickname}님 환영합니다!`,
      content: `${nickname}님의 고유 재료는 '${ingredientName}' 이에요.\n 고유재료는 무제한으로 쓸 수 있어요.`,
      icon: <IngredientIcon aria-label={ingredientName} />,
      buttonContent: "다음",
    },
    {
      title: "재료를 선물해보세요!",
      content: "다른 사람들에게 떡국 재료를 나눠주면\n 복주머니를 얻을 수 있어요.",
      icon: <GiftIcon aria-label="선물" />,
      buttonContent: "다음",
    },
    {
      title: "복주머니를 열어보세요!",
      content: "복주머니를 열면 새로운 떡국 재료를\n 랜덤으로 얻을 수 있어요.",
      icon: <LuckyBagIcon aria-label="복주머니" />,
      buttonContent: "홈으로 이동하기",
    },
  ];

  const handleClickNextButton = () => {
    if (step < modalContents.length - 1) {
      setStep(step + 1);
    }

    if (step === modalContents.length - 1) {
      onClose();
      setStep(0);
      router.push("/tteokguks");
    }
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header className={styles.title}>{modalContents[step].title}</Modal.Header>
        <Modal.Body className={styles.bodyContainer}>
          <div className={styles.content}>{modalContents[step].content}</div>
          <div className={styles.imageContainer}>{modalContents[step].icon}</div>
          <Button onClick={handleClickNextButton} color="primary.100" applyColorTo="background">
            {modalContents[step].buttonContent}
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default WelcomeModal;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  title: css({
    marginBottom: "0.8rem",
  }),
  bodyContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  }),
  content: css({
    fontSize: "1.4rem",
    textAlign: "center",
    whiteSpace: "pre-line",
  }),
  imageContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "9.6rem",
    height: "9.6rem",
    backgroundColor: "primary.20",
    borderRadius: "0.8rem",
    marginTop: "1.6rem",
    marginBottom: "2rem",
  }),
  icon: css({
    width: "100%",
    height: "100%",
    objectFit: "contain",
  }),
};
