import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const CheerMessageModal = ({ isOpen, onClose, message }: Props) => {
  return (
    isOpen && (
      <Modal>
        <Modal.Header>응원 메시지</Modal.Header>
        <Modal.Body>
          <div className={styles.content}>{message}</div>
          <Button onClick={onClose} color="primary.100" applyColorTo="background">
            닫기
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default CheerMessageModal;

const styles = {
  content: css({
    height: "21.6rem",
    backgroundColor: "primary.45",
    borderRadius: "0.8rem",
    marginY: "1.6rem",
    padding: "1.6rem 1.2rem",
  }),
};
