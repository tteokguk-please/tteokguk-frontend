import { ReactNode } from "react";

import { css } from "@styled-system/css";

import CloseIcon from "@/assets/svg/close.svg";

interface Props {
  children: ReactNode;
  handleClickClose: () => void;
}

const ModalHeader = ({ children, handleClickClose }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{children}</div>
      <button onClick={handleClickClose} className={styles.closeButton}>
        <CloseIcon />
      </button>
    </div>
  );
};

export default ModalHeader;

const styles = {
  container: css({
    display: "flex",
    position: "relative",
  }),
  title: css({
    flex: 1,
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "1.2rem",
  }),
  closeButton: css({
    position: "absolute",
    right: 0,
    top: 0,
    cursor: "pointer",
  }),
};
