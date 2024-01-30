import { css } from "@styled-system/css";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import useRouter from "@/routes/useRouter";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CompleteAccountDeletionModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();

  const handelClickButton = () => {
    router.push("/");
    onClose();
  };

  return (
    isOpen && (
      <Modal>
        <Modal.Header fontSize="sm">탈퇴가 완료되었어요</Modal.Header>
        <Modal.Body>
          <div className={styles.content}>
            <span className={styles.block}>새해에 더 이루고싶은 소원이 생각나시면</span>
            <span>다시 한 번 떡국을 부탁해를 들려주세요!🥺</span>
          </div>
          <Button onClick={handelClickButton} color="primary.100" applyColorTo="background">
            첫 화면으로 이동
          </Button>
        </Modal.Body>
      </Modal>
    )
  );
};

export default CompleteAccountDeletionModal;

const styles = {
  content: css({
    fontSize: "1.4rem",
    marginY: "1.6rem",
    textAlign: "center",
  }),
  block: css({
    display: "block",
  }),
};
