import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleClickBefore = () => {
    navigate(-1);
  };

  return (
    <header className={classnames(styles.header, className)}>
      <div onClick={handleClickBefore} className={styles.beforeIcon} aria-label="뒤로 가기">
        {hasPreviousPage && <BeforeIcon />}
      </div>
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
    padding: "0 1.6rem",
  }),
  beforeIcon: css({
    cursor: "pointer",
  }),
  title: css({
    fontSize: "1.6rem",
    fontWeight: 700,
  }),
};
