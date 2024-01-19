import { ReactNode } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

import BaseButton from "@/components/common/BaseButton";
import CloseIcon from "@/assets/svg/close.svg";

interface Props {
  close: () => void;
  hasCloseIcon?: boolean;
  closeButtonText?: string;
  className?: string;
  children: ReactNode;
}

const BaseModal = ({
  close,
  hasCloseIcon = false,
  closeButtonText = "닫기",
  className,
  children,
}: Props) => {
  return (
    <div className={styles.overlay}>
      <div className={classnames(styles.container, className)}>
        {hasCloseIcon && (
          <button className={styles.closeIcon} onClick={close}>
            <CloseIcon />
          </button>
        )}
        <div className={styles.content}>{children}</div>
        <BaseButton onClick={close} className={styles.closeButton}>
          {closeButtonText}
        </BaseButton>
      </div>
    </div>
  );
};

export default BaseModal;

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
    position: "relative",
    width: "31.2rem",
    padding: "1.6rem",
    opacity: 1,
    paddingBottom: "2.4rem",
    borderRadius: "0.8rem",
    backgroundColor: "back",
    zIndex: 1001,
  }),

  closeIcon: css({
    position: "absolute",
    top: "1.6rem",
    right: "1.6rem",
    cursor: "pointer",
  }),

  content: css({
    marginTop: "1.2rem",
  }),

  closeButton: css({
    backgroundColor: "primary.100",
  }),
};
