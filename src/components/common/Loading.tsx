import { css } from "@styled-system/css";

import runningDragon from "@/assets/images/running-dragon.png";
import ground from "@/assets/images/ground.png";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.runningDragon}>
          <img src={runningDragon} alt="달리는 용용이" />
        </div>
        <div>
          <img src={ground} alt="땅" />
        </div>
        <div>떡국 배달 중...</div>
      </div>
    </div>
  );
};

export default Loading;

const styles = {
  container: css({
    position: "relative",
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "center",
    height: "100vh",
    overflow: "hidden",
    textAlign: "center",
    fontWeight: 700,
    color: "gray.50",
  }),
  runningDragon: css({
    position: "relative",
    animation: "run 2s linear infinite",
    width: "7.3rem",
  }),
};