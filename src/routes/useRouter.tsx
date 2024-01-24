import { useMemo } from "react";
import { useNavigate, NavigateOptions } from "react-router-dom";

import { RoutePath } from "./Routes";

const useRouter = () => {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      back(step = 1) {
        navigate(-step);
      },
      push(path: RoutePath, options?: NavigateOptions) {
        navigate(path, options);
      },
      replace(path: RoutePath) {
        navigate({ pathname: path }, { replace: true });
      },
    };
  }, [navigate]);
};

export default useRouter;
