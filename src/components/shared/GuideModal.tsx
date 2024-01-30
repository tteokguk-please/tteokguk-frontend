import { useState } from "react";

import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import TteokgukIcon from "@/assets/svg/tteokguk.svg";
import GiftIcon from "@/assets/svg/gift.svg";
import LuckyBagIcon from "@/assets/svg/lucky-bag.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const GuideModal = ({ isOpen, onClose }: Props) => {
  const [step, setStep] = useState(0);

  const modalContents = [
    {
      title: "소원 떡국을 만들어보세요!",
      content: `새해 소원을 작성하고,\n 떡국에 들어갈 재료 5개를 선택해주세요.`,
      icon: <TteokgukIcon aria-label="떡국" />,
      buttonContent: "다음",
    },
    {
      title: "재료를 선물해보세요!",
      content: "다른 사람들에게 떡국 재료를 나눠주면 복주머니를 얻을 수 있어요.",
      icon: <GiftIcon aria-label="선물" />,
      buttonContent: "다음",
    },
    {
      title: "복주머니를 열어보세요!",
      content: "복주머니를 열면 새로운 떡국 재료를\n 랜덤으로 얻을 수 있어요.",
      icon: <LuckyBagIcon aria-label="복주머니" />,
      buttonContent: "확인",
    },
  ];

  const handleClickNextButton = () => {
    if (step < modalContents.length - 1) {
      setStep(step + 1);
    }

    if (step === modalContents.length - 1) {
      onClose();
      setStep(0);
    }
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header fontSize="md" className={styles.title}>
          {modalContents[step].title}
        </Modal.Header>
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

export default GuideModal;

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
  }),
  content: css({
    fontSize: "1.4rem",
    textAlign: "center",
    paddingX: "3rem",
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
};
