import { ButtonHTMLAttributes, MouseEvent } from "react";

import classNames from "classnames";

import { css } from "@styled-system/css";
import { ColorToken } from "@styled-system/tokens";

import { Filter } from "@/types/utils.ts";

import LoadingLottie from "./LoadingLottie";

export type ButtonColor = Filter<ColorToken, "primary.100" | "primary.45" | "secondary.100">;

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: ButtonColor;
  applyColorTo?: "background" | "outline";
  size?: "full";
  isPending?: boolean;
}

const Button = ({
  children,
  onClick,
  className,
  disabled = false,
  color = "primary.100",
  applyColorTo = "background",
  size = "full",
  isPending = false,
}: Props) => {
  const buttonStyle = classNames(
    styles.base(isPending),
    styles.variants[applyColorTo](color),
    styles.variants[size],
    className,
  );

  const handleClickButton = (event: MouseEvent<HTMLButtonElement>) => {
    if (isPending) return;
    onClick?.(event);
  };

  return (
    <button className={buttonStyle} disabled={disabled} onClick={handleClickButton}>
      {isPending && <LoadingLottie className={styles.lottie} />}
      {children}
    </button>
  );
};

export default Button;

const styles = {
  base: (isPending: boolean) =>
    css({
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "5.1rem",
      fontSize: "1.6rem",
      fontWeight: 700,
      borderRadius: "1.2rem",
      cursor: isPending ? "not-allowed" : "pointer",

      _disabled: {
        backgroundColor: "white",
        cursor: "default",
        borderWidth: "0.1rem",
        borderColor: "primary.45",
        color: "gray.50",
      },
    }),
  variants: {
    background: (color: ButtonColor) => css({ backgroundColor: color }),
    outline: (color: ButtonColor) =>
      css({ borderColor: color, borderWidth: "0.1rem", backgroundColor: "white" }),
    full: css({
      width: "100%",
    }),
  },
  lottie: css({
    marginRight: "0.8rem",
    width: "2rem",
  }),
};
