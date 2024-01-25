import { ButtonHTMLAttributes } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary.100" | "primary.45" | "secondary" | "yellow";
  applyColorTo: "background" | "outline";
  size?: "full";
}

const Button = ({
  children,
  onClick,
  className,
  disabled,
  color,
  applyColorTo,
  size = "full",
}: Props) => {
  console.log(disabled);

  const buttonStyle = classnames(styles.button, styles[applyColorTo][color], styles[size], {
    [styles.disabled]: disabled,
  });

  return (
    <button className={classnames(buttonStyle, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

const styles = {
  button: css({
    height: "5.1rem",
    fontSize: "1.6rem",
    fontWeight: 700,
    backgroundColor: "white",
    borderRadius: "1.2rem",
    cursor: "pointer",
  }),
  background: {
    "primary.100": css({ backgroundColor: "primary.100" }),
    "primary.45": css({ backgroundColor: "primary.45" }),
    secondary: css({ backgroundColor: "secondary.100" }),
    yellow: css({ backgroundColor: "yellow.100" }),
  },
  outline: {
    "primary.100": css({ borderWidth: "0.1rem", borderColor: "primary.100" }),
    "primary.45": css({ borderWidth: "0.1rem", borderColor: "primary.45" }),
    secondary: css({ borderWidth: "0.1rem", borderColor: "secondary.100" }),
    yellow: css({ borderWidth: "0.1rem", borderColor: "yellow.100" }),
  },
  full: css({
    width: "100%",
  }),
  disabled: css({
    backgroundColor: "white",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    color: "gray.50",
  }),
};
