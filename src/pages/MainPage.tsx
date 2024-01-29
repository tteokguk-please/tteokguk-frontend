import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import classNames from "classnames";

import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import TteokgukWithCaptionList from "@/components/common/TteokgukWithCaptionList";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import HeaderLogo from "@/assets/svg/header-logo.svg";

const MainPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isSelectedTab = (index: number) => index === tabIndex;

  return (
    <>
      <Header actionIcon="profile">
        <Link to="/tteokguks">
          <HeaderLogo aria-label="용용이" />
        </Link>
      </Header>
      <div className={styles.container}>
        <Tabs selectedIndex={tabIndex} onSelect={(index: number) => setTabIndex(index)}>
          <TabList className={styles.tabList}>
            <Tab className={classNames({ [styles.selectedTab]: isSelectedTab(0) })}>
              새로운 떡국
            </Tab>
            <Tab className={classNames({ [styles.selectedTab]: isSelectedTab(1) })}>
              완성된 떡국
            </Tab>
          </TabList>
          <TabPanel className={styles.tabPanel}>
            <TteokgukWithCaptionList />
          </TabPanel>
          <TabPanel className={styles.tabPanel}>
            <TteokgukWithCaptionList />
          </TabPanel>
        </Tabs>

        <Link to="/tteokguk/create">
          <Button
            color="secondary.100"
            applyColorTo="background"
            className={classNames(styles.button)}
          >
            소원 떡국 만들기
          </Button>
        </Link>
      </div>
    </>
  );
};

export default MainPage;

const styles = {
  container: css({
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
  tabPanel: css({
    display: "flex",
    flexFlow: "column wrap",
    paddingLeft: "1.6rem",
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
  button: css({
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "3rem",
    width: "calc(100% - 4.8rem)",
    maxWidth: "45.2rem",
  }),
  buttonHidden: css({
    display: "none",
  }),
};
