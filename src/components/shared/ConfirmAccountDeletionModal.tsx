import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmAccountDeletionModal = ({ isOpen, onClose }: Props) => {
  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header fontSize="sm" className={styles.modalHeader}>
          정말 탈퇴하시겠어요?
        </Modal.Header>
        <Modal.Body>
          <div className={styles.content}>
            <span className={styles.block}>계정을 삭제하면 복구할 수 없어요.</span>
            <span>다른 사람들과 함께 더 많은 소원을 이뤄보세요🥺</span>
          </div>
          <div className={styles.description}>
            <span className={styles.block}>*계정을 삭제해도 작성하신 소원은 남아있어요.</span>
            <span className={styles.block}>남아있는 소원을 지우시고 싶으시다면</span>
            <span>소원 떡국 하단의 삭제하기를 눌러주세요.</span>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onClose} color="primary.100" applyColorTo="background">
              취소
            </Button>
            <Button color="primary.45" applyColorTo="outline">
              탈퇴
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

export default ConfirmAccountDeletionModal;

const styles = {
  container: css({}),
  modalHeader: css({
    fontSize: "1.6rem",
  }),
  content: css({
    fontSize: "1.4rem",
    whiteSpace: "pre-line",
    textAlign: "center",
    marginY: "1.6rem",
  }),
  description: css({
    fontSize: "1.2rem",
    color: "gray.50",
    textAlign: "center",
    whiteSpace: "pre-line",
  }),
  buttonContainer: css({
    display: "flex",
    width: "100%",
    gap: "0.8rem",
    marginTop: "1.6rem",
  }),
  block: css({
    display: "block",
  }),
};
