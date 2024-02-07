import { Fragment, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import classNames from "classnames";
import { useAtomValue } from "jotai";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import ReceivedIngredientsList from "@/components/common/ReceivedIngredientsList";
import { $mySupportedTteokguks, $receivedIngredients } from "@/store/myActivity";
import Loading from "@/components/common/Loading";
import MySupportedTteokgukCardList from "@/components/MyActivity/MySupportedTteokgukCardList";

const MyActivityPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isSelectedTab = (index: number) => index === tabIndex;
  const {
    mySupportedTteokguks,
    isPending: isMySupportedTteokguksPending,
    handleSupportedTtoekguksIntersect,
  } = useAtomValue($mySupportedTteokguks);
  const fetchMoreRef = useRef(null);

  const {
    receivedIngredientList,
    handleReceivedIngredeintIntersect,
    isPending: isReceivedTteokgukPending,
  } = useAtomValue($receivedIngredients);

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect:
      tabIndex === 0
        ? () => handleReceivedIngredeintIntersect({ enabled: isSelectedTab(0) })
        : () => handleSupportedTtoekguksIntersect({ enabled: isSelectedTab(1) }),
  });
  console.log(mySupportedTteokguks);

  return (
    <Fragment>
      <Header showBackButton>활동 내역</Header>
      <div className={styles.container}>
        {(isReceivedTteokgukPending || isMySupportedTteokguksPending) && <Loading />}
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className={styles.tabList}>
            <Tab className={classNames({ [styles.selectedTab]: isSelectedTab(0) })}>
              받은 떡국 재료
            </Tab>
            <Tab className={classNames({ [styles.selectedTab]: isSelectedTab(1) })}>
              내가 응원한 떡국
            </Tab>
          </TabList>
          <TabPanel className={styles.receivedTab}>
            {receivedIngredientList && (
              <ReceivedIngredientsList receivedIngredientList={receivedIngredientList} />
            )}
          </TabPanel>
          <TabPanel className={styles.mySupportedTab}>
            {mySupportedTteokguks && (
              <MySupportedTteokgukCardList tteokguks={mySupportedTteokguks} />
            )}
          </TabPanel>
        </Tabs>
        <div ref={fetchMoreRef} />
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
  receivedTab: css({
    display: "flex",
    flexFlow: "column wrap",
    paddingX: "1.8rem",
    width: "100%",
  }),
  mySupportedTab: css({
    display: "flex",
    flexFlow: "column wrap",
    alignItems: "center",
    paddingLeft: "1.6rem",
  }),
  tteokgukList: css({
    display: "flex",
    flexFlow: "row wrap",
    gap: "1.6rem",
    width: "100%",
  }),
};
