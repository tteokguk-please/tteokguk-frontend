import { ButtonHTMLAttributes, ReactNode } from "react";

import classNames from "classnames";

import { css } from "@styled-system/css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: "primary.45";
  applyColorTo: "background" | "outline";
  layout?: "spaceBetween";
}

const IconButton = ({ children, onClick, className, color, applyColorTo, layout }: Props) => {
  const buttonStyle = classNames(styles.button(layout), styles[applyColorTo][color]);

  return (
    <button onClick={onClick} className={classNames(buttonStyle, className)}>
      {children}
    </button>
  );
};

const Icon = ({ children }: { children: ReactNode }) => {
  return children;
};

const Content = ({ children }: { children: ReactNode }) => {
  return children;
};

export default IconButton;

IconButton.Icon = Icon;
IconButton.Content = Content;

const styles = {
  button: (layout: "spaceBetween" | undefined) =>
    css({
      display: "flex",
      justifyContent: layout ? "space-between" : "center",
      alignItems: "center",
      gap: "0.6rem",
      width: "100%",
      height: "5.2rem",
      fontSize: "1.6rem",
      backgroundColor: "white",
      borderRadius: "0.8rem",
      padding: "0 2.2rem 0 1rem",
      cursor: "pointer",
    }),
  background: {
    "primary.45": css({ backgroundColor: "primary.45" }),
  },
  outline: {
    "primary.45": css({ borderWidth: "0.1rem", borderColor: "primary.45" }),
  },
};
