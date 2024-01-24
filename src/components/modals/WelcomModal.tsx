import { useState } from "react";

import { css } from "@styled-system/css";

import useNavigate from "@/routes/useNavigate";
import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import DumplingIcon from "@/assets/svg/dumpling.svg";

interface Props {
  isOpen: boolean;
  close: () => void;
  nickname: string;
  uniqueIngredient: string;
}

const WelcomModal = ({ isOpen, close, nickname, uniqueIngredient }: Props) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const modalContents = [
    {
      title: `${nickname}님 환영합니다!`,
      content: `${nickname}님의 고유 재료는 '${uniqueIngredient}' 이에요.\n 고유재료는 무제한으로 쓸 수 있어요.`,
      buttonContent: "다음",
    },
    {
      title: "재료를 선물해보세요!",
      content: "다른 사람들에게 떡국 재료를 나눠주면 복주머니를 얻을 수 있어요.",
      buttonContent: "다음",
    },
    {
      title: "복주머니를 열어보세요.",
      content: "복주머니를 열면 새로운 떡국 재료를 랜덤으로 얻을 수 있어요.",
      buttonContent: "소원 떡국 만들러 가기",
    },
  ];

  const handleClickNextButton = () => {
    if (step < modalContents.length - 1) {
      setStep(step + 1);
    }

    if (step === modalContents.length - 1) {
      close();
      navigate("/tteokguk/create");
    }
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header className={styles.title}>{modalContents[step].title}</Modal.Header>
        <Modal.Body className={styles.bodyContainer}>
          <div className={styles.content}>{modalContents[step].content}</div>
          <div className={styles.ingredientImage} aria-label={uniqueIngredient}>
            <DumplingIcon />
          </div>
          <Button onClick={handleClickNextButton} color="primary.100" applyColorTo="background">
            {modalContents[step].buttonContent}
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default WelcomModal;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  title: css({
    fontSize: "2rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
  }),
  bodyContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  content: css({
    fontSize: "1.4rem",
    textAlign: "center",
    paddingX: "3.6rem",
  }),
  ingredientImage: css({
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
};
