import { useNavigate as useReactNavigate, NavigateOptions } from "react-router-dom";

import { RoutePath } from "./Routes";

const useNavigate = () => {
  const navigate = useReactNavigate();

  const typedNavigate = (to: RoutePath, options?: NavigateOptions) => {
    navigate(to, options);
  };

  return typedNavigate;
};

export default useNavigate;
