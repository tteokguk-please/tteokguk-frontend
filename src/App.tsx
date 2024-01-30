import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

import { OverlayProvider } from "@toss/use-overlay";

import { Routes } from "./routes/Routes";
import ToastContainer from "./components/common/ToastContainer";

const App = () => {
  return (
    <BrowserRouter>
      <OverlayProvider>
        <ToastContainer />
        <Suspense fallback={<div>loading</div>}>
          <Routes />
        </Suspense>
      </OverlayProvider>
    </BrowserRouter>
  );
};

export default App;
