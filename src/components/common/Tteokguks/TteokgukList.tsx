import { css } from "@styled-system/css";

import TteokgukCard from "./TteokgukCard";

import { Link } from "@/routes/Link";

const TteokgukList = () => {
  return (
    <ul className={styles.container}>
      {[...Array(12)].map((_, index) => (
        <Link to={`/tteokguks/${index}`}>
          <TteokgukCard tteokgukNumber={1178} nickname="재민" />
        </Link>
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
