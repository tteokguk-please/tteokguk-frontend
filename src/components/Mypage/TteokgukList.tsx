import { css } from "@styled-system/css";

import TteokgukListItem from "./TteokgukListItem";

const TteokgukList = () => {
  return (
    <ul className={styles.tteokgukList}>
      {[...Array(20)].map(() => (
        <TteokgukListItem isCompleted label="완성된 떡국" />
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
    _scrollbar: {
      display: "none",
    },
  }),
};
