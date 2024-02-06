import Lottie from "lottie-react";

import loadingLottie from "@/assets/lottie/loading.json";

interface Props {
  className?: string;
}

const LoadingLottie = ({ className }: Props) => {
  return <Lottie animationData={loadingLottie} loop className={className} />;
};

export default LoadingLottie;
