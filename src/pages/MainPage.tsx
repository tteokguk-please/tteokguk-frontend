import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import { css } from "@styled-system/css";

import TteokgukList from "@/components/common/Tteokguks/TteokgukList";
import Button from "@/components/common/Button";

const MainPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className={styles.container}>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <TabList className={styles.tabList}>
          <Tab className={tabIndex === 0 ? styles.selectedTab : ""}>새로운 떡국</Tab>
          <Tab className={tabIndex === 1 ? styles.selectedTab : ""}>완성된 떡국</Tab>
        </TabList>
        <TabPanel className={styles.tabPanel}>
          <TteokgukList />
        </TabPanel>
        <TabPanel className={styles.tabPanel}>
          <TteokgukList />
        </TabPanel>
      </Tabs>

      <Button color="secondary" applyColorTo="background" className={styles.button}>
        소원 떡국 만들기
      </Button>
    </div>
  );
};

export default MainPage;

const styles = {
  container: css({
    position: "relative",
    height: "100%",
    overflow: "auto",
    _scrollbar: {
      display: "none",
    },
  }),
  tabList: css({
    display: "flex",
    justifyContent: "space-around",
    fontSize: "1.6rem",
    fontWeight: 700,
    borderBottomWidth: "0.1rem",
    borderBottomColor: "primary.45",
    padding: "0.8rem 5.6rem 0.9rem",
    cursor: "pointer",
  }),
  tabPanel: css({
    display: "flex",
    flexFlow: "column wrap",
    marginTop: "2rem",
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
    position: "sticky",
    width: "calc(100% - 5.1rem)",
    bottom: "3rem",
    marginX: "2.4rem",
  }),
};
