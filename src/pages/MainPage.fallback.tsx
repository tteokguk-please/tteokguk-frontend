import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import { Link } from "@/routes/Link";
import HeaderLogo from "@/assets/svg/header-logo.svg";

const MainPageFallback = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header showSearchIcon actionIcon="profile">
          <Link to="/tteokguks">
            <HeaderLogo aria-label="용용이" />
          </Link>
        </Header>
        <div className={styles.tabContainer}>
          <Tabs selectedIndex={0} onSelect={() => {}}>
            <TabList className={styles.tabList}>
              <Tab className={styles.selectedTab}>새로운 떡국</Tab>
              <Tab>완성된 떡국</Tab>
            </TabList>
            <TabPanel className={styles.tabPanel}>
              <Loading />
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              <Loading />
            </TabPanel>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default MainPageFallback;

const styles = {
  container: css({
    maxWidth: "50rem",
    width: "100%",
    height: "100vh",
    margin: "0 auto",
  }),

  main: css({
    width: "100%",
    minHeight: "100vh",
    flexGrow: 1,
    backgroundColor: "back",
  }),

  tabContainer: css({
    position: "relative",
    height: "calc(100% - 4.8rem)",
    overflow: "auto",
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
