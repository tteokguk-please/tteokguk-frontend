import { css } from "@styled-system/css";

import TteokgukCard from "./TteokgukCard";

const TteokgukList = () => {
  return (
    <ul className={styles.container}>
      {[...Array(12)].map((_, index) => (
        <TteokgukCard id={index} tteokgukNumber={1178} nickname="재민" />
      ))}
    </ul>
  );
};

export default TteokgukList;

const styles = {
  container: css({
    display: "flex",
    flexFlow: "row wrap",
    gap: "1.6rem",
  }),
};
