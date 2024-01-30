import classNames from "classnames";

import { css } from "@styled-system/css";

import { Tteokguk } from "@/types/tteokguk";

import tteokgukComplete from "@/assets/images/tteokguk-complete.png";
import tteokgukIncomplete from "@/assets/images/tteokguk-incomplete.png";
import { Link } from "@/routes/Link";

interface Props {
  tteokguks: Tteokguk[];
  className?: string;
}

const TteokgukList = ({ tteokguks, className }: Props) => {
  return (
    <ul className={classNames(styles.tteokgukList, className)}>
      {tteokguks.map(({ tteokgukId, completion }) => (
        <Link to={`/tteokguks/${tteokgukId}`}>
          <li className={styles.tteokgukListItem}>
            <img
              src={completion ? tteokgukComplete : tteokgukIncomplete}
              alt={completion ? "완성된 떡국" : "미완성 떡국"}
            />
          </li>
        </Link>
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
  }),
};
