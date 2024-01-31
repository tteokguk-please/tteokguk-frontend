import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import { OverlayProvider } from "@toss/use-overlay";

import { Routes } from "./routes/Routes";
import ToastContainer from "./components/common/ToastContainer";
import { DialogModalProvider } from "./components/common/DialogModal";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>error</div>}>
        <Suspense fallback={<div>loading</div>}>
          <OverlayProvider>
            <ToastContainer />
            <DialogModalProvider>
              <Routes />
            </DialogModalProvider>
          </OverlayProvider>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
