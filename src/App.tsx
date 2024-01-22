import { BrowserRouter } from "react-router-dom";

import { OverlayProvider } from "@toss/use-overlay";

import { Routes } from "./routes/Routes";
import ToastContainer from "./components/common/ToastContainer";

const App = () => {
  return (
    <BrowserRouter>
      <OverlayProvider>
        <ToastContainer />
        <Routes />
      </OverlayProvider>
    </BrowserRouter>
  );
};

export default App;
