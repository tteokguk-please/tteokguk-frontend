import { LabelHTMLAttributes } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

const Label = ({ htmlFor, children, className }: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label htmlFor={htmlFor} className={classnames(styles.label, className)}>
      {children}
    </label>
  );
};

export default Label;

const styles = {
  label: css({
    display: "block",
    fontSize: "1.4rem",
    fontWeight: 700,
  }),
};
