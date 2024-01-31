import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

import { css } from "@styled-system/css";

import { DialogModalContextProps } from "@/types/dialog";

import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";

const DialogModal = () => {
  const [{ isOpen, type, title, description, confirmButton, cancelButton }] =
    useContext(DialogModalContext);
  const isConfirmModal = type === "confirm";

  return (
    isOpen && (
      <Modal className={styles.container}>
        {title && <Modal.Header className={styles.modalHeader}>{title}</Modal.Header>}
        <Modal.Body>
          {description}
          <div className={styles.footer}>
            {isConfirmModal && (
              <Button
                color={cancelButton.color ?? "primary.45"}
                applyColorTo={cancelButton.applyColorTo ?? "outline"}
                onClick={cancelButton.onClick}
              >
                {cancelButton.text}
              </Button>
            )}
            <Button
              color={confirmButton.color ?? "primary.100"}
              applyColorTo={confirmButton.applyColorTo ?? "background"}
              onClick={confirmButton.onClick}
            >
              {confirmButton.text}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    )
  );
};

export const DialogModalContext = createContext<
  [DialogModalContextProps, Dispatch<SetStateAction<DialogModalContextProps>>]
>([] as any);

export const DialogModalProvider = ({ children }: { children: ReactNode }) => {
  const dialogContext = useState<DialogModalContextProps>({
    isOpen: false,
    type: "alert",
    description: "",
    confirmButton: {
      text: "",
    },
    cancelButton: {
      text: "",
    },
  });

  return (
    <DialogModalContext.Provider value={dialogContext}>
      <DialogModal />
      {children}
    </DialogModalContext.Provider>
  );
};

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
  footer: css({
    display: "flex",
    width: "100%",
    gap: "0.8rem",
  }),
  block: css({
    display: "block",
  }),
};
