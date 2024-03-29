import { ReactNode } from "react";

import classNames from "classnames";

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
      <div className={classNames(styles.container, className)}>{children}</div>
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
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,

    _last: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
  }),

  container: css({
    width: "31.2rem",
    padding: "1.6rem",
    paddingBottom: "2.4rem",
    borderRadius: "0.8rem",
    backgroundColor: "back",
    zIndex: 1001,
  }),
};
