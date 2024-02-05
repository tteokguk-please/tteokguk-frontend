import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { OverlayProvider } from "@toss/use-overlay";

import { Routes } from "./routes/Routes";
import ToastContainer from "./components/common/ToastContainer";
import { DialogModalProvider } from "./components/common/DialogModal";
import ErrorFallbackPage from "./pages/ErrorFallbackPage";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary FallbackComponent={ErrorFallbackPage}>
        <OverlayProvider>
          <ToastContainer />
          <DialogModalProvider>
            <Routes />
          </DialogModalProvider>
        </OverlayProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
