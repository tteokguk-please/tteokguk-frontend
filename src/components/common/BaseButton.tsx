import { ReactNode } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

interface Props {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const BaseButton = ({ children, onClick, className }: Props) => {
  return (
    <button className={classnames(styles.button, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default BaseButton;

const styles = {
  button: css({
    width: "28rem",
    height: "5.1rem",
    fontSize: "1.6rem",
    fontWeight: 700,
    borderRadius: "1.2rem",
    cursor: "pointer",
  }),
};
