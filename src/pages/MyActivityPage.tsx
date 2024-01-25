import { Fragment, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import classNames from "classnames";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import ReceivedIngredientsList from "@/components/MyActivityPage/ReceivedIngredientsList";

const MyActivityPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isSelectedTab = (index: number) => index === tabIndex;

  return (
    <Fragment>
      <Header hasPreviousPage>활동 내역</Header>
      <div className={styles.container}>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className={styles.tabList}>
            <Tab className={classNames({ [styles.selectedTab]: isSelectedTab(0) })}>
              새로운 떡국
            </Tab>
            <Tab className={classNames({ [styles.selectedTab]: isSelectedTab(1) })}>
              완성된 떡국
            </Tab>
          </TabList>
          <TabPanel className={styles.tabPanel}>
            <ReceivedIngredientsList />
          </TabPanel>
          <TabPanel className={styles.tabPanel}></TabPanel>
        </Tabs>
      </div>
    </Fragment>
  );
};

export default MyActivityPage;

const styles = {
  container: css({
    height: "calc(100% - 4.8rem)",
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
    paddingX: "1.8rem",
  }),
  selectedTab: css({
    position: "relative",
    outline: "none",
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
};
