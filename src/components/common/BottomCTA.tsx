import { ReactNode } from "react";
import { css } from "@styled-system/css";
import useBottomCTA from "@/hooks/useBottomCTA";

interface Props {
  children: ReactNode;
}

const BottomCTA = ({ children }: Props) => {
  const { isVisible } = useBottomCTA();
  return <div className={styles.container(isVisible)}>{children}</div>;
};

export default BottomCTA;

const styles = {
  container: (isVisible: boolean) =>
    css({
      display: "flex",
      justifyContent: "center",
      position: "fixed",
      bottom: 0,
      left: 0,
      width: "100%",
      padding: "1rem 0 4rem 0",
      transform: isVisible ? "translateY(0%)" : "translateY(100%)",
      transition: "transform 0.4s",
    }),
};
