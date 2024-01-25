import { ReactNode } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

import CloseIcon from "@/assets/svg/close.svg";

interface Props {
  children: ReactNode;
  className?: string;
  hasCloseButton?: boolean;
  handleClickClose?: () => void;
}

const ModalHeader = ({ children, className, hasCloseButton = false, handleClickClose }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.spacer} />
      <div className={classnames(styles.title, className)}>{children}</div>
      <div className={styles.spacer}>
        {hasCloseButton && (
          <button onClick={handleClickClose} className={styles.closeButton}>
            <CloseIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;

const styles = {
  container: css({
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  }),
  spacer: css({
    width: "2.4rem",
    height: "2.4rem",
    display: "flex",
    alignItems: "center",
  }),
  title: css({
    width: "100%",
    flex: 1,
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "1.2rem",
  }),
  closeButton: css({
    cursor: "pointer",
  }),
};
