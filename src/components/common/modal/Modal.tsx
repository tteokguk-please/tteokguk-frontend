import { ReactNode } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";

interface Props {
  className?: string;
  children: ReactNode;
}

const Modal = ({ className, children }: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={classnames(styles.container, className)}>{children}</div>
    </div>
  );
};

export default Modal;

Modal.Header = ModalHeader;
Modal.Body = ModalBody;

const styles = {
  overlay: css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "black",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  }),

  container: css({
    width: "31.2rem",
    padding: "1.6rem",
    opacity: 1,
    paddingBottom: "2.4rem",
    borderRadius: "0.8rem",
    backgroundColor: "back",
    zIndex: 1001,
  }),
};
