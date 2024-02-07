import { css } from "@styled-system/css";

import runningDragon from "@/assets/images/running-dragon.png";
import ground from "@/assets/images/ground.png";

interface Props {
  size?: "full" | "small";
}

const Loading = ({ size = "full" }: Props) => {
  return (
    <div className={styles.container(size)}>
      <div>
        <div className={styles.runAnimation}>
          <div className={styles.runningDragon(size)}>
            <img src={runningDragon} alt="달리는 용용이" />
          </div>
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
  container: (size: "full" | "small") =>
    css({
      position: "relative",
      display: "flex",
      flexFlow: "row wrap",
      alignItems: "center",
      justifyContent: "center",
      width: size === "full" ? "100%" : "60%",
      height: size === "full" ? "calc(100vh - 12rem)" : "auto",
      margin: size === "full" ? "0" : "4.8rem auto",
      textAlign: "center",
      overflow: "hidden",
      fontWeight: 700,
      color: "gray.50",
    }),
  runAnimation: css({
    animation: "run 1.5s linear infinite",
  }),
  runningDragon: (size: "full" | "small") =>
    css({
      position: "relative",
      width: size === "full" ? "7.3rem" : "5rem",
    }),
};
