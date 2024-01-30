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
      <OverlayProvider>
        <ToastContainer />
        <ErrorBoundary fallback={<div>error</div>}>
          <Suspense fallback={<div>loading</div>}>
            <DialogModalProvider>
              <Routes />
            </DialogModalProvider>
          </Suspense>
        </ErrorBoundary>
      </OverlayProvider>
    </BrowserRouter>
  );
};

export default App;
