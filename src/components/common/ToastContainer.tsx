import { Toaster } from "sonner";

const ToastContainer = () => {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={1}
      toastOptions={{ duration: 20000, style: styles.container }}
    />
  );
};

export default ToastContainer;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    fontSize: "1.5rem",
    backgroundColor: "#929292",
    fontFamily: "Pretendard Variable",
    color: "#ffffff",
    marginBottom: "3.2rem",
    padding: "1.2rem 0",
    borderRadius: "0.8rem",
  },
};
