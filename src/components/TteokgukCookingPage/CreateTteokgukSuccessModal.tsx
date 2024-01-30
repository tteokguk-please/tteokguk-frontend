import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";
import useRouter from "@/routes/useRouter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tteokgukId: number;
}

const CreateTteokgukSuccessModal = ({ isOpen, onClose, tteokgukId }: Props) => {
  const router = useRouter();

  const handleClickButton = () => {
    router.push(`/tteokguks/${tteokgukId}`);
    onClose();
  };

  return (
    isOpen && (
      <Modal>
        <Modal.Header>소원 떡국 제작 성공!</Modal.Header>
        <Modal.Body>
          <div className={styles.content}>내 재료와 친구들의 응원으로 떡국을 완성해보세요!</div>
          <div className={styles.imageContainer}>
            <img src={tteokgukIncomplete} alt="미완성 떡국" />
          </div>
          <Button onClick={handleClickButton} color="primary.100" applyColorTo="background">
            소원 떡국 페이지로 가기
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default CreateTteokgukSuccessModal;

const styles = {
  content: css({
    fontSize: "1.4rem",
    textAlign: "center",
    marginTop: "0.8rem",
    marginBottom: "2.4rem",
  }),
  imageContainer: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "21rem",
    backgroundColor: "white",
    marginBottom: "3.8rem",
    borderRadius: "0.8rem",
  }),
};
