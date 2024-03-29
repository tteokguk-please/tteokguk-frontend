import { InputHTMLAttributes, forwardRef } from "react";

import classNames from "classnames";

import { css } from "@styled-system/css";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return <input {...props} ref={ref} className={classNames(styles.input, className)} />;
  },
);

export default Input;

const styles = {
  input: css({
    width: "100%",
    height: "3.7rem",
    backgroundColor: "primary.20",
    borderRadius: "1rem",
    paddingX: "1.6rem",
    outline: "none",
    _placeholder: {
      color: "black",
      fontSize: "1.4rem",
    },
  }),
};
