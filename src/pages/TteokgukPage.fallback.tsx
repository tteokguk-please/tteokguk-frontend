import { Fragment } from "react";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import Loading from "@/components/common/Loading";

const TteokgukPageFallback = () => {
  return (
    <Fragment>
      <Header showBackButton actionIcon="profile">
        소원 떡국
      </Header>
      <div className={styles.container}>
        <Loading />
      </div>
    </Fragment>
  );
};

export default TteokgukPageFallback;

const styles = {
  container: css({
    height: "calc(100% - 5.9rem)",
    paddingX: "2.4rem",
    marginTop: "1.1rem",
    paddingBottom: "2rem",
  }),
};
