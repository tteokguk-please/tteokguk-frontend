import { useEffect, useMemo, useRef } from "react";
import useWindowScroll from "./useWindowScroll";

const useBottomCTA = () => {
  const { y: scrollY } = useWindowScroll();
  const prevScrollY = useRef(1);

  useEffect(() => {
    prevScrollY.current = scrollY;
  }, [scrollY]);

  const isVisible = useMemo(() => {
    return prevScrollY.current > scrollY;
  }, [scrollY]);

  return { isVisible };
};

export default useBottomCTA;
