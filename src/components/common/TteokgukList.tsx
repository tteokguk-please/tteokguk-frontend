import classNames from "classnames";

import { css } from "@styled-system/css";

import tteokgukComplete from "@/assets/images/tteokguk-complete.png";

interface Props {
  className?: string;
}

const TteokgukList = ({ className }: Props) => {
  return (
    <ul className={classNames(styles.tteokgukList, className)}>
      {[...Array(26)].map(() => (
        <li className={styles.tteokgukListItem}>
          <img src={tteokgukComplete} alt="완성된 떡국" />
        </li>
      ))}
    </ul>
  );
};

export default TteokgukList;

const styles = {
  tteokgukList: css({
    display: "flex",
    flexDirection: "row",
    gap: "1.2rem",
    overflowX: "auto",
    marginTop: "0.8rem",
  }),
  tteokgukListItem: css({
    width: "9.6rem",
    height: "9.6rem",
    flex: "0 0 auto",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
    overflow: "hidden",
    _scrollbar: {
      display: "none",
    },
  }),
};
