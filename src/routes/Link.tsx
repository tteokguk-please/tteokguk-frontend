import { Link as ReactLink, LinkProps } from "react-router-dom";

import { RoutePath } from "./Routes";

interface CustomLinkProps extends Omit<LinkProps, "to"> {
  to: RoutePath;
}

export const Link = ({ to, ...props }: CustomLinkProps) => {
  return <ReactLink to={to} {...props} />;
};
