import { useNavigate as useReactNavigate, NavigateOptions } from "react-router-dom";

import { RoutePath } from "./Routes";

const useNavigate = () => {
  const ReactNavigate = useReactNavigate();

  const navigate = (to: RoutePath, options?: NavigateOptions) => {
    ReactNavigate(to, options);
  };

  return navigate;
};

export default useNavigate;
