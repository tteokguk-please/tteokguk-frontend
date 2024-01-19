import { ButtonHTMLAttributes } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

const BaseButton = ({ children, onClick, className }: ButtonHTMLAttributes<HTMLButtonElement>) => {
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
