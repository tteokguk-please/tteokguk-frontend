import { BrowserRouter } from "react-router-dom";

import { OverlayProvider } from "@toss/use-overlay";

import { Routes } from "./routes/Routes";
import ToastContainer from "./components/common/ToastContainer";
import { DialogModalProvider } from "./components/common/DialogModal";

const App = () => {
  return (
    <BrowserRouter>
      <OverlayProvider>
        <ToastContainer />
        <DialogModalProvider>
          <Routes />
        </DialogModalProvider>
      </OverlayProvider>
    </BrowserRouter>
  );
};

export default App;
