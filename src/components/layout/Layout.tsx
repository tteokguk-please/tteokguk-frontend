import { Outlet } from "react-router-dom";

import { css } from "@styled-system/css";

const container = css({
  maxWidth: "50rem",
  width: "100%",
  height: "100vh",
  margin: "0 auto",
});

const main = css({
  width: "100%",
  height: "100vh",
  flexGrow: 1,
});

const Layout = () => {
  return (
    <div className={container}>
      <main className={main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
