import { ButtonColor } from "@/components/common/Button";
import { ReactNode } from "react";

export interface DialogModalContextProps {
  isOpen: boolean;
  type: "alert" | "confirm";
  title?: string;
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
