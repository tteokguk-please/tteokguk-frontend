import { ButtonHTMLAttributes } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary.45" | "primary.20";
  applyColorTo: "background" | "outline";
  size: "large" | "medium" | "small";
}

const RandomVisitButton = ({ children, onClick, className, color, applyColorTo, size }: Props) => {
  const buttonStyle = classnames(
    styles[applyColorTo][color],
    styles.button,
    styles[size],
    className,
  );

  return (
    <button className={classnames(buttonStyle, className)} onClick={onClick}>
      {children}
    </button>
  );
};

const styles = {
  button: css({
    fontSize: "1.6rem",
    fontWeight: 400,
    borderWidth: "0.1rem",
    borderRadius: "0.8rem",
  }),
  background: {
    "primary.20": css({ backgroundColor: "primary.20" }),
    "primary.45": css({ backgroundColor: "primary.45" }),
  },
  outline: {
    "primary.20": css({ borderColor: "primary.20" }),
    "primary.45": css({ borderColor: "primary.45" }),
  },
  large: css({
    width: "31.2rem",
    height: "5.2rem",
  }),
  medium: css({
    width: "15.2rem",
    height: "5.2rem",
  }),
  small: css({
    width: "6.8rem",
    height: "2.6rem",
    fontSize: "1.4rem",
    border: "none",
    borderRadius: "0.4rem",
  }),
};

export default RandomVisitButton;
