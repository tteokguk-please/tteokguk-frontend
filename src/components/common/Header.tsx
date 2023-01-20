import { ReactNode } from "react";

import classnames from "classnames";

import { css } from "@styled-system/css";

import BeforeIcon from "@/assets/svg/before.svg";

interface Props {
  hasPreviousPage?: true;
  actionIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

const Header = ({ hasPreviousPage, actionIcon, className, children }: Props) => {
  return (
    <header className={classnames(styles.header, className)}>
      <div>{hasPreviousPage && <BeforeIcon />}</div>
      <div className={styles.title}>
        <h1>{children}</h1>
      </div>
      <div>{actionIcon}</div>
    </header>
  );
};

export default Header;

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "4.8rem",
  }),
  title: css({
    fontSize: "1.6rem",
    fontWeight: 700,
  }),
};
