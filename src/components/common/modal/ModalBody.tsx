import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const ModalBody = ({ children, className }: Props) => {
  return <div className={className}>{children}</div>;
};

export default ModalBody;
