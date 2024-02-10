import { Fragment, useEffect } from "react";

import { useAtom, useAtomValue } from "jotai";
import { toast } from "sonner";
import { useResetAtom } from "jotai/utils";

import { css } from "@styled-system/css";

import Modal from "../common/modal/Modal";
import Button from "../common/Button";

import { $selectedIngredient } from "@/store/ingredient";
import { $sentMessage } from "@/store/tteokguk";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ViewMessageModal = ({ isOpen, onClose }: Props) => {
  const [selectedIngredient, setSelectedIngredient] = useAtom($selectedIngredient);
  const { nickname, message, isAnonymous } = useAtomValue($sentMessage);
  const resetSentMessage = useResetAtom($sentMessage);

  useEffect(() => {
    return () => {
      setSelectedIngredient(null);
      resetSentMessage();
    };
  }, []);

  if (selectedIngredient === null) return <Fragment />;

  const handleClickCopyLinkButton = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${location.pathname}?ingredient=${selectedIngredient}`,
      );

      toast("링크 복사가 완료되었습니다.");
      gtag("event", "click", { event_category: "작성한 응원 메시지 공유" });
    } catch (error) {
      console.error(error);
    }
  };

  const IngredientIcon = INGREDIENT_ICON_BY_KEY[28][selectedIngredient];

  return (
    isOpen && (
      <Modal>
        <Modal.Header hasCloseButton onClose={onClose}>
          보낸 메시지
        </Modal.Header>
        <Modal.Body>
          <div className={styles.message}>{message}</div>
          <div className={styles.userInfo}>
            <div>
              <div className={styles.nickname}>
                {!isAnonymous && `@ ${nickname}`}
                {isAnonymous &&
                  selectedIngredient &&
                  `익명의 ${INGREDIENT_NAME_BY_KEY[selectedIngredient]}님`}
              </div>
              {selectedIngredient && (
                <div>{`응원의 ${INGREDIENT_NAME_BY_KEY[selectedIngredient]}을/를 보냈어요!`}</div>
              )}
            </div>
            <div className={styles.ingredient}>
              {selectedIngredient && (
                <IngredientIcon aria-label={INGREDIENT_NAME_BY_KEY[selectedIngredient]} />
              )}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={onClose} color="primary.45" applyColorTo="outline">
              확인
            </Button>
            <Button
              onClick={handleClickCopyLinkButton}
              color="primary.100"
              applyColorTo="background"
            >
              공유하기
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

export default ViewMessageModal;

const styles = {
  message: css({
    height: "22.4rem",
    backgroundColor: "primary.45",
    borderRadius: "0.8rem",
    marginTop: "1.6rem",
    padding: "1.9rem 1.3rem",
  }),
  userInfo: css({
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.2rem",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
    marginTop: "1rem",
    marginBottom: "1.6rem",
    padding: "1rem 1.5rem",
  }),
  nickname: css({
    fontWeight: 700,
    fontSize: "1.4rem",
  }),
  ingredient: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "4rem",
    borderRadius: "50%",
    backgroundColor: "primary.45",
  }),
  buttonContainer: css({
    display: "flex",
    width: "100%",
    gap: "0.8rem",
  }),
};
