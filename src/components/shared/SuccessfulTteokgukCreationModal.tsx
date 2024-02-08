import { css } from "@styled-system/css";

import { TteokgukBackgroudColor } from "@/types/tteokguk";
import { IngredientKey } from "@/types/ingredient";

import Button from "../common/Button";

import TteokgukImage from "@/components/common/TteokgukImage";
import Modal from "@/components/common/modal/Modal";
import useRouter from "@/routes/useRouter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tteokgukId?: number;
  isCompletion?: boolean;
  nickname?: string;
  tteokgukBackgroundColor: TteokgukBackgroudColor;
  frontGarnish: IngredientKey;
  backGarnish: IngredientKey;
}

const SuccessfulTteokgukCreationModal = ({
  isOpen,
  onClose,
  tteokgukId,
  isCompletion = false,
  nickname,
  tteokgukBackgroundColor,
  frontGarnish,
  backGarnish,
}: Props) => {
  const router = useRouter();

  const handleClickButton = () => {
    router.replace(`/tteokguks/${tteokgukId}`);

    onClose();
  };

  return (
    isOpen && (
      <Modal>
        <Modal.Header>
          {isCompletion ? "소원 떡국이 완성되었어요!" : "소원 떡국 제작 성공!"}
        </Modal.Header>
        <Modal.Body>
          <div>
            <div className={styles.description}>
              {isCompletion
                ? `${nickname}님의 새해 소원, 이루어져라 얍✨`
                : "내 재료와 친구들의 응원으로 떡국을 완성해보세요!"}
            </div>
            <div className={styles.imageContainer}>
              <TteokgukImage
                completion
                backgroundColor={tteokgukBackgroundColor}
                frontGarnish={frontGarnish}
                backGarnish={backGarnish}
              />
            </div>
            <Button onClick={handleClickButton}>
              {isCompletion ? "확인" : "소원 떡국 페이지로 가기"}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

export default SuccessfulTteokgukCreationModal;

const styles = {
  description: css({
    fontSize: "1.4rem",
    marginTop: "0.8rem",
    textAlign: "center",
  }),
  imageContainer: css({
    position: "relative",
    width: "100%",
    height: "21rem",
    overflow: "hidden",
    borderRadius: "0.8rem",
    marginTop: "2.4rem",
    marginBottom: "3.8rem",
  }),
};
