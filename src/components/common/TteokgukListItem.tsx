import { css } from "@styled-system/css";

import tteokgukComplete from "@/assets/images/tteokguk-complete.png";
import tteokgukInComplete from "@/assets/images/tteokguk-incomplete.png";

interface Props {
  isCompleted: boolean;
  label: "완성된 떡국" | "미완성 떡국";
}

const TteokgukListItem = ({ isCompleted = false, label }: Props) => {
  return (
    <li className={styles.tteokgukListItem}>
      <img src={isCompleted ? tteokgukComplete : tteokgukInComplete} alt={label} />
    </li>
  );
};

export default TteokgukListItem;

const styles = {
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
