import { DialogModalContext } from "@/components/common/DialogModal";
import { DialogModalContextProps } from "@/types/dialog";
import { useContext } from "react";

type AlertParams = Omit<DialogModalContextProps, "isOpen" | "type" | "cancelButton">;
type ConfirmParams = Omit<DialogModalContextProps, "isOpen" | "type">;
type OpenDialogModalParams = Omit<DialogModalContextProps, "isOpen">;

export const useDailog = () => {
  const [, setDialogModalProps] = useContext(DialogModalContext);

  const handleOpenDialogModal = (params: OpenDialogModalParams) =>
    setDialogModalProps({ ...params, isOpen: true });

  const handleCloseDialogModal = () =>
    setDialogModalProps({
      isOpen: false,
      type: "alert",
      description: "",
      confirmButton: {
        text: "",
      },
      cancelButton: {
        text: "",
      },
    });

  const alert = (params: AlertParams) =>
    new Promise<boolean>((resolve) => {
      handleOpenDialogModal({
        ...params,
        type: "alert",
        confirmButton: {
          ...params.confirmButton,
          onClick: async () => {
            await params.confirmButton.onClick?.();
            handleCloseDialogModal();
            resolve(true);
          },
        },
        cancelButton: {
          text: "",
        },
      });
    });

  const confirm = (params: ConfirmParams) =>
    new Promise<boolean>((resolve) => {
      handleOpenDialogModal({
        ...params,
        type: "confirm",
        confirmButton: {
          ...params.confirmButton,
          onClick: async () => {
            await params.confirmButton.onClick?.();
            handleCloseDialogModal();
            resolve(true);
          },
        },
        cancelButton: {
          ...params.cancelButton,
          onClick: async () => {
            handleCloseDialogModal();
            resolve(false);
          },
        },
      });
    });

  return {
    alert,
    confirm,
  };
};
