import { ButtonHTMLAttributes } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary.100" | "primary.45" | "secondary" | "white" | "yellow";
  applyColorTo: "background" | "outline";
}

const Button = ({ children, onClick, className, color, applyColorTo }: Props) => {
  const buttonStyle = classnames(styles.button, styles[applyColorTo][color]);

  return (
    <button className={classnames(buttonStyle, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

const styles = {
  button: css({
    width: "100%",
    height: "5.1rem",
    fontSize: "1.6rem",
    fontWeight: 700,
    borderRadius: "1.2rem",
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
    "primary.100": css({ borderWidth: "0.1rem", borderColor: "primary.100" }),
    "primary.45": css({ borderWidth: "0.1rem", borderColor: "primary.45" }),
    secondary: css({ borderWidth: "0.1rem", borderColor: "secondary.100" }),
    white: css({ borderWidth: "0.1rem", borderColor: "white" }),
    yellow: css({ borderWidth: "0.1rem", borderColor: "yellow.100" }),
  },
};
