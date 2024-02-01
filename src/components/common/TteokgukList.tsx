import classNames from "classnames";

import { css } from "@styled-system/css";

import { UserTteokguk } from "@/types/tteokguk";

import TteokgukImage from "./TteokgukImage";

import { Link } from "@/routes/Link";

interface Props {
  tteokguks: UserTteokguk[];
  className?: string;
}

const TteokgukList = ({ tteokguks, className }: Props) => {
  return (
    <ul className={classNames(styles.tteokgukList, className)}>
      {tteokguks.map(({ tteokgukId, completion }) => (
        <Link to={`/tteokguks/${tteokgukId}`}>
          <li className={styles.tteokgukListItem}>
            <TteokgukImage completion={completion} />
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
