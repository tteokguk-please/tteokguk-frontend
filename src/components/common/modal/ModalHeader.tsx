import { ReactNode } from "react";

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
      <div className={(styles.title(hasCloseButton), className)}>{children}</div>
      {hasCloseButton && (
        <button onClick={handleClickClose} className={styles.closeButton}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default ModalHeader;

const styles = {
  container: css({
    display: "flex",
    alignItems: "flex-start",
  }),
  title: (hasCloseButton: boolean) =>
    css({
      flex: 1,
      fontSize: "2rem",
      fontWeight: 700,
      textAlign: "center",
      marginTop: "1.2rem",
      paddingLeft: hasCloseButton ? "2.4rem" : "0",
    }),
  closeButton: css({
    cursor: "pointer",
  }),
};
