import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import { Link } from "@/routes/Link";
import HeaderLogo from "@/assets/svg/header-logo.svg";
import classNames from "classnames";

const MainPageFallback = () => {
  return (
    <>
      <Header showSearchIcon actionIcon="profile">
        <Link to="/tteokguks">
          <HeaderLogo aria-label="용용이" />
        </Link>
      </Header>
      <div className={styles.tabContainer}>
        <Tabs selectedIndex={0} onSelect={() => {}}>
          <TabList className={styles.tabList}>
            <Tab className={classNames(styles.tab, styles.selectedTab)}>새로운 떡국</Tab>
            <Tab className={styles.tab}>완성된 떡국</Tab>
          </TabList>
          <TabPanel className={styles.tabPanel}>
            <Loading />
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <Loading />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};

export default MainPageFallback;

const styles = {
  tabContainer: css({
    position: "relative",
    width: "100%",
    height: "calc(100% - 4.8rem)",
    overflow: "auto",
    paddingBottom: "2rem",
  }),

  tabList: css({
    display: "flex",
    justifyContent: "space-evenly",
    fontSize: "1.6rem",
    fontWeight: 700,
    borderBottomWidth: "0.1rem",
    borderBottomColor: "primary.45",
    padding: "0.8rem 0 0.9rem",
    marginBottom: "2rem",
    cursor: "pointer",
  }),

  tab: css({
    width: "50%",
    textAlign: "center",
    outline: "none",
  }),

  selectedTab: css({
    position: "relative",
    _after: {
      content: '""',
      position: "absolute",
      bottom: "-0.9rem",
      left: "50%",
      transform: "translateX(-50%)",
      width: "9.4rem",
      height: "0.4rem",
      backgroundColor: "primary.100",
    },
  }),

  tabPanel: css({
    display: "flex",
    flexFlow: "column wrap",
    paddingLeft: "1.6rem",
  }),
};
