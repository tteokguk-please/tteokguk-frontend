import { useState } from "react";

import { css } from "@styled-system/css";

import Modal from "../common/modal/Modal";
import Button from "../common/Button";

interface Props {
  isOpen: boolean;
  close: () => void;
}

const CheerSuccessModal = ({ isOpen, close }: Props) => {
  const [step, setStep] = useState(0);

  const modalContents = [
    {
      title: "응원하기 성공",
      description: "응원 보상으로 복주머니를 드릴게요.",
      buttonContent: "복주머니 열기",
    },
    {
      title: "새로운 떡국 재료 획득",
      description: "복주머니에서 만두 6개를 획득했어요.",
      buttonContent: "확인",
    },
  ];

  const handleClickNextButton = () => {
    setStep(step + 1);
  };

  return (
    isOpen && (
      <Modal>
        <Modal.Header hasCloseButton handleClickClose={close}>
          {modalContents[step].title}
        </Modal.Header>
        <Modal.Body>
          <div className={styles.description}>{modalContents[step].description}</div>
          <div className={styles.imageContainer}></div>
          <Button onClick={handleClickNextButton} color="primary.100" applyColorTo="background">
            {modalContents[step].buttonContent}
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default CheerSuccessModal;

const styles = {
  description: css({
    fontSize: "1.4rem",
    textAlign: "center",
    marginTop: "0.8rem",
    marginBottom: "2.4rem",
  }),
  imageContainer: css({
    height: "21rem",
    borderRadius: "0.8rem",
    backgroundColor: "white",
    marginBottom: "3.8rem",
  }),
};
