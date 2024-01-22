import { Outlet } from "react-router-dom";

import { css } from "@styled-system/css";

const Layout = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

const styles = {
  container: css({
    maxWidth: "50rem",
    width: "100%",
    height: "100vh",
    margin: "0 auto",
  }),

  main: css({
    width: "100%",
    height: "100vh",
    flexGrow: 1,
    backgroundColor: "back",
  }),
};
