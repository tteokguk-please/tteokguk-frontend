import { ReactNode } from "react";

import { ButtonColor } from "@/components/common/Button";

export interface DialogModalContextProps {
  isOpen: boolean;
  type: "alert" | "confirm";
  title?: ReactNode;
  description: ReactNode;
  confirmButton: {
    text: string;
    color?: ButtonColor;
    applyColorTo?: "background" | "outline";
    onClick?: () => void | Promise<void>;
  };
  cancelButton: {
    text: string;
    color?: ButtonColor;
    applyColorTo?: "background" | "outline";
    onClick?: () => void;
  };
}
