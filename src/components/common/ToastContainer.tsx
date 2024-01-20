import { Toaster } from "sonner";

const ToastContainer = () => {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={1}
      toastOptions={{ duration: 2000, style: styles.container }}
    />
  );
};

export default ToastContainer;

const styles = {
  container: {
    diplay: "flex",
    justifyContent: "center",
    fontSize: "1.5rem",
    height: "4.2rem",
    backgroundColor: "#929292",
    color: "#ffffff",
    marginBottom: "1.2rem",
    borderRadius: "0.8rem",
  },
};
