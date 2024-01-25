import { useState } from "react";

import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import DumplingIcon from "@/assets/svg/dumpling.svg";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const GuideModal = ({ isOpen, close }: Props) => {
  const [step, setStep] = useState(0);

  const modalContents = [
    {
      title: "소원 떡국을 만들어보세요!",
      content: `새해 소원을 작성하고,\n 떡국에 들어갈 재료 5개를 선택해주세요.`,
      buttonContent: "다음",
    },
    {
      title: "재료를 선물해보세요!",
      content: "다른 사람들에게 떡국 재료를 나눠주면 복주머니를 얻을 수 있어요.",
      buttonContent: "다음",
    },
    {
      title: "복주머니를 열어보세요!",
      content: "복주머니를 열면 새로운 떡국 재료를\n 랜덤으로 얻을 수 있어요.",
      buttonContent: "확인",
    },
  ];

  const handleClickNextButton = () => {
    if (step < modalContents.length - 1) {
      setStep(step + 1);
    }

    if (step === modalContents.length - 1) {
      close();
    }
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header className={styles.title}>{modalContents[step].title}</Modal.Header>
        <Modal.Body className={styles.bodyContainer}>
          <div className={styles.content}>{modalContents[step].content}</div>
          <div className={styles.ingredientImage} aria-label="만두">
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

export default GuideModal;

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
    paddingX: "3rem",
    whiteSpace: "pre-line",
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
