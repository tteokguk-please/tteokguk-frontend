import { ButtonHTMLAttributes } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary.100" | "primary.45" | "secondary" | "white" | "yellow";
  applyColorTo: "background" | "outline";
  size: "large" | "medium";
}

const Button = ({ children, onClick, className, color, applyColorTo, size }: Props) => {
  const buttonStyle = classnames(styles.button, styles[applyColorTo][color], styles[size]);

  return (
    <button className={classnames(buttonStyle, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

const styles = {
  button: css({
    fontSize: "1.6rem",
    fontWeight: 700,
    borderRadius: "1.2rem",
    backgroundColor: "white",
    cursor: "pointer",
  }),
  background: {
    "primary.100": css({ backgroundColor: "primary.100" }),
    "primary.45": css({ borderColor: "primary.45" }),
    secondary: css({ backgroundColor: "secondary.100" }),
    white: css({ backgroundColor: "white" }),
    yellow: css({ backgroundColor: "yellow.100" }),
  },
  outline: {
    "primary.100": css({ borderColor: "primary.100" }),
    "primary.45": css({ borderColor: "primary.45" }),
    secondary: css({ borderColor: "secondary.100" }),
    white: css({ borderColor: "white" }),
    yellow: css({ borderColor: "yellow.100" }),
  },
  large: css({
    width: "31.2rem",
    height: "5.1rem",
  }),
  medium: css({
    width: "28rem",
    height: "5.1rem",
  }),
};
