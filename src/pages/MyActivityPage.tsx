import { Fragment, useEffect, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames";
import { useAtomValue } from "jotai";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { css } from "@styled-system/css";

import Meta from "./Meta";

import Header from "@/components/common/Header";
import ReceivedIngredientsList from "@/components/common/ReceivedIngredientsList";
import { $mySupportedTteokguks, $receivedIngredients } from "@/store/myActivity";
import Loading from "@/components/common/Loading";
import MySupportedTteokgukCardList from "@/components/MyActivity/MySupportedTteokgukCardList";

const MyActivityPage = () => {
  const tabParams = ["ingredient", "support"];

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") ?? "";
  const tabIndexByParam = tabParams.indexOf(tabParam);
  const [tabIndex, setTabIndex] = useState(tabIndexByParam === -1 ? 0 : tabIndexByParam);
  const isSelectedTab = (index: number) => index === tabIndex;
  const {
    mySupportedTteokguks,
    handleSupportedTtoekguksIntersect,
    isPending: isMySupportedTteokguksPending,
    isFetchingNextPage: isMySupportedTteokgukFetchingNextPage,
  } = useAtomValue($mySupportedTteokguks);
  const fetchMoreRef = useRef(null);

  const {
    receivedIngredientList,
    handleReceivedIngredeintIntersect,
    isPending: isReceivedIngredeintPending,
    isFetchingNextPage: isReceivedTteokgukFetchingNextPage,
  } = useAtomValue($receivedIngredients);

  const isPending = isReceivedIngredeintPending || isMySupportedTteokguksPending;
  const isFetchingNextPage =
    isReceivedTteokgukFetchingNextPage || isMySupportedTteokgukFetchingNextPage;

  const handleSelectTab = (index: number) => {
    setSearchParams({ tab: tabParams[index] });
    setTabIndex(index);
  };

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect:
      tabIndex === 0
        ? () => handleReceivedIngredeintIntersect({ enabled: isSelectedTab(0) })
        : () => handleSupportedTtoekguksIntersect({ enabled: isSelectedTab(1) }),
  });

  const handleClickReceivedIngredient = () => {
    gtag("event", "click", { event_category: "받은 떡국 재료 보기" });
  };

  const handleClickMySupportedTteokguk = () => {
    gtag("event", "click", { event_category: "내가 응원한 떡국 보기" });
  };

  useEffect(() => {
    setTabIndex(tabIndexByParam === -1 ? 0 : tabIndexByParam);
  }, [tabIndexByParam, setTabIndex]);

  return (
    <Fragment>
      <Meta
        path="/my-page/activity"
        title="활동내역 페이지"
        description="내가 응원한 떡국과 받은 재료들을 확인해보세요"
      />
      <Header showBackButton>활동 내역</Header>
      <div className={styles.container}>
        <Tabs selectedIndex={tabIndex} onSelect={handleSelectTab}>
          <TabList className={styles.tabList}>
            <Tab
              onClick={handleClickReceivedIngredient}
              className={classNames(styles.tab, { [styles.selectedTab]: isSelectedTab(0) })}
            >
              받은 떡국 재료
            </Tab>
            <Tab
              onClick={handleClickMySupportedTteokguk}
              className={classNames(styles.tab, { [styles.selectedTab]: isSelectedTab(1) })}
            >
              내가 응원한 떡국
            </Tab>
          </TabList>
          <TabPanel className={styles.receivedTab}>
            {!isPending && receivedIngredientList?.length === 0 && (
              <div className={styles.noTteokguk}>
                <div className={styles.noTteokgukTitle}>친구들에게 떡국 재료를 요청해보세요.</div>
                <div>
                  <div>내 떡국 주소를 친구들에게 공유하고,</div>
                  친구들에게 도움을 요청해보세요!
                </div>
              </div>
            )}
            {receivedIngredientList && (
              <ReceivedIngredientsList receivedIngredientList={receivedIngredientList} />
            )}
          </TabPanel>
          <TabPanel className={styles.mySupportedTab}>
            {!isPending && mySupportedTteokguks?.length === 0 && (
              <div className={styles.noTteokguk}>
                <div className={styles.noTteokgukTitle}>아직 응원하신 떡국이 없어요.</div>
                <div>
                  <div>메인페이지나 랜덤방문을 통해 다른 사람들에게</div> 응원의 재료를
                  전달해보세요!
                </div>
              </div>
            )}
            {mySupportedTteokguks && (
              <MySupportedTteokgukCardList tteokguks={mySupportedTteokguks} />
            )}
          </TabPanel>
        </Tabs>
        {isPending && <Loading />}

        {isFetchingNextPage && <Loading size="small" />}
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
  tab: css({
    width: "50%",
    textAlign: "center",
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
  noTteokguk: css({
    textAlign: "center",
    marginTop: "1.6rem",
    fontSize: "1.4rem",
  }),
  noTteokgukTitle: css({
    fontSize: "1.6rem",
    fontWeight: 700,
    marginBottom: "0.8rem",
  }),
};
