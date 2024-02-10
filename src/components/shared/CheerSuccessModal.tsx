import { useState } from "react";

import { useOverlay } from "@toss/use-overlay";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";

import ViewMessageModal from "./ViewMessageModal";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";
import cheerSuccessBackground from "@/assets/images/cheer-success-background.png";
import LuckyBagIcon from "@/assets/svg/lucky-bag.svg";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  rewardIngredient: IngredientKey;
  rewardQuantity: number;
  ingredientKey: IngredientKey;
}

const CheerSuccessModal = ({
  isOpen,
  onClose,
  rewardIngredient,
  rewardQuantity,
  ingredientKey,
}: Props) => {
  const [step, setStep] = useState(0);
  const RewardIngredientIcon = INGREDIENT_ICON_BY_KEY[80][rewardIngredient];
  const viewMessageOverlay = useOverlay();

  const handleClickNextButton = () => {
    if (step === 1) {
      onClose();
      setStep(0);
    }

    setStep(step + 1);
  };

  const handleClickViewMessage = () => {
    viewMessageOverlay.open(({ isOpen, close: handleCloseViewMessageModal }) => (
      <ViewMessageModal
        isOpen={isOpen}
        onClose={() => {
          handleCloseViewMessageModal();
          onClose();
        }}
        ingredientKey={ingredientKey}
      />
    ));
  };

  const modalContents = [
    {
      title: "응원하기 성공",
      description: "응원 보상으로 복주머니를 드릴게요.",
      Button: (
        <Button onClick={handleClickNextButton} color="primary.100" applyColorTo="background">
          복주머니 열기
        </Button>
      ),
      icon: LuckyBagIcon,
    },
    {
      title: "새로운 떡국 재료 획득",
      description: `복주머니에서 ${INGREDIENT_NAME_BY_KEY[rewardIngredient]} ${rewardQuantity}개를 획득했어요.`,
      Button: (
        <div className={styles.buttonContainer}>
          <Button onClick={handleClickViewMessage} color="primary.45" applyColorTo="outline">
            보낸 메시지 보기
          </Button>
          <Button onClick={handleClickNextButton} color="primary.100" applyColorTo="background">
            확인
          </Button>
        </div>
      ),
      icon: INGREDIENT_ICON_BY_KEY[80][rewardIngredient],
    },
  ];

  return (
    isOpen && (
      <Modal>
        <Modal.Header hasCloseButton onClose={onClose}>
          {modalContents[step].title}
        </Modal.Header>
        <Modal.Body>
          <div className={styles.description}>{modalContents[step].description}</div>
          <div className={styles.imageContainer}>
            <img src={cheerSuccessBackground} alt="응원 성공 배경" className={styles.image} />
            <div className={styles.icon}>
              {step === 0 && <LuckyBagIcon aria-label="복주머니" />}
              {step === 1 && (
                <RewardIngredientIcon aria-label={INGREDIENT_NAME_BY_KEY[rewardIngredient]} />
              )}
            </div>
          </div>
          {modalContents[step].Button}
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
    position: "relative",
    height: "21rem",
    borderRadius: "0.8rem",
    backgroundColor: "white",
    marginBottom: "3.8rem",
    overflow: "hidden",
  }),
  image: css({
    position: "absolute",
    height: "100%",
    objectFit: "cover",
  }),
  icon: css({
    position: "absolute",
    left: "10rem",
    bottom: "5.3rem",
  }),
  buttonContainer: css({
    display: "flex",
    gap: "0.8rem",
    width: "100%",
  }),
};
