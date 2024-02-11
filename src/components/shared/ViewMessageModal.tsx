import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAtom, useAtomValue } from "jotai";
import classNames from "classnames";

import { css } from "@styled-system/css";

import { copyLink } from "@/utils/linkShare";

import { IngredientKey } from "@/types/ingredient";

import Modal from "../common/modal/Modal";
import Button from "../common/Button";

import { $selectedIngredient } from "@/store/ingredient";
import { $ingredientSupportMessage } from "@/store/tteokguk";
import { INGREDIENT_ICON_BY_KEY, INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  ingredientKey: IngredientKey;
}

const ViewMessageModal = ({ isOpen, onClose, ingredientKey }: Props) => {
  const [searchParams] = useSearchParams();
  const [selectedIngredient, setSelectedIngredient] = useAtom($selectedIngredient);
  const { nickname, message, isAnonymous } = useAtomValue($ingredientSupportMessage);

  useEffect(() => {
    gtag("event", "page_view", { event_category: "재료 클릭하여 응원 메시지 보기" });

    return () => {
      setSelectedIngredient(null);
    };
  }, [setSelectedIngredient, searchParams]);

  const handleClickCopyLinkButton = () => {
    copyLink({
      path: `${location.pathname}?ingredient=${selectedIngredient}`,
      eventCategory: "작성한 응원 메시지 공유",
    });
  };

  const IngredientIcon = INGREDIENT_ICON_BY_KEY[28][ingredientKey];
  console.log(isAnonymous, nickname);

  return (
    isOpen && (
      <Modal>
        <Modal.Header hasCloseButton onClose={onClose}>
          보낸 메시지
        </Modal.Header>
        <Modal.Body>
          <div className={classNames(styles.title, styles.sentby)}>
            보낸이 {!isAnonymous && `@${nickname}`}
            {isAnonymous && `익명의 ${INGREDIENT_NAME_BY_KEY[ingredientKey]}님`}
          </div>
          <div className={styles.message}>{message}</div>
          <div className={styles.userInfo}>
            <div>
              <div className={styles.title}>보낸 떡국 재료</div>
              <div>{`응원의 ${INGREDIENT_NAME_BY_KEY[ingredientKey]}을/를 보냈어요!`}</div>
            </div>
            <div className={styles.ingredient}>
              <IngredientIcon aria-label={INGREDIENT_NAME_BY_KEY[ingredientKey]} />
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
  sentby: css({
    marginTop: "1.3rem",
    marginLeft: "1.3rem",
  }),
  message: css({
    height: "22.4rem",
    backgroundColor: "primary.45",
    borderRadius: "0.8rem",
    marginTop: "0.3rem",
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
  title: css({
    fontWeight: 700,
    fontSize: "1.4rem",
    marginBottom: "0.2rem",
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
