import { ReactNode } from "react";

import classNames from "classnames";

import { css } from "@styled-system/css";

import CloseIcon from "@/assets/svg/close.svg";

interface Props {
  fontSize: "md" | "sm";
  children: ReactNode;
  className?: string;
  hasCloseButton?: boolean;
  onClose?: () => void;
}

const ModalHeader = ({ children, className, fontSize, hasCloseButton = false, onClose }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.spacer} />
      <div className={classNames(styles.title, styles.headerTitleStyles[fontSize], className)}>
        {children}
      </div>
      <div className={styles.spacer}>
        {hasCloseButton && (
          <button onClick={onClose} className={styles.closeButton}>
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
    fontWeight: 700,
    textAlign: "center",
    marginTop: "0.8rem",
  }),

  headerTitleStyles: {
    md: css({ fontSize: "2rem" }),
    sm: css({ fontSize: "1.6rem" }),
  },
  closeButton: css({
    cursor: "pointer",
  }),
};
