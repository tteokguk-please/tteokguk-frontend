import { BrowserRouter } from "react-router-dom";

import { OverlayProvider } from "@toss/use-overlay";

import { Routes } from "./routes/Routes";

const App = () => {
  return (
    <BrowserRouter>
      <OverlayProvider>
        <Routes />
      </OverlayProvider>
    </BrowserRouter>
  );
};

export default App;
