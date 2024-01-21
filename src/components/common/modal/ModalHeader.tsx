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
    alignItems: "flex-start",
  }),
  title: css({
    flex: 1,
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    marginTop: "1.2rem",
    paddingLeft: "2.4rem",
  }),
  closeButton: css({
    cursor: "pointer",
  }),
};
