import { useEffect, useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useSearchParams } from "react-router-dom";

import classNames from "classnames";
import { useAtomValue } from "jotai";

import useIntersectionObserver from "@/hooks/useIntersectionObserver";

import { css } from "@styled-system/css";

import ErrorFallbackPage from "./ErrorFallbackPage";

import { Link } from "@/routes/Link";
import TteokgukWithCaptionList from "@/components/common/TteokgukWithCaptionList";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import BottomCTA from "@/components/common/BottomCTA";
import { $tteokguksByTab } from "@/store/tteokguk";
import HeaderLogo from "@/assets/svg/header-logo.svg";
import Loading from "@/components/common/Loading";

const MainPage = () => {
  const tabParams = ["new", "complete"];

  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get("tab") ?? "";
  const tabIndexByParam = tabParams.indexOf(tabParam);
  const [tabIndex, setTabIndex] = useState(tabIndexByParam === -1 ? 0 : tabIndexByParam);
  const isSelectedTab = (index: number) => index === tabIndex;
  const fetchMoreRef = useRef(null);

  const { tteokguks, isFetchingNextPage, hasNextPage, fetchNextPage, isPending, isError, refetch } =
    useAtomValue($tteokguksByTab(tabIndex));

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleSelectTab = (index: number) => {
    setSearchParams({ tab: tabParams[index] });
    setTabIndex(index);
  };

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect,
  });

  useEffect(() => {
    setTabIndex(tabIndexByParam === -1 ? 0 : tabIndexByParam);
  }, [tabIndexByParam, setTabIndex]);

  if (!tteokguks || isError) {
    return <ErrorFallbackPage retry={refetch} />;
  }

  const handleClickNewTteokguk = () => {
    gtag("event", "click", { event_category: "새로운 떡국 보기" });
  };

  const handleClickCompletedTteokguk = () => {
    gtag("event", "click", { event_category: "완성된 보기" });
  };

  return (
    <>
      <Header showSearchIcon actionIcon="profile">
        <HeaderLogo aria-label="용용이" />
      </Header>
      <div className={styles.container}>
        <>
          <Tabs selectedIndex={tabIndex} onSelect={handleSelectTab}>
            <TabList className={styles.tabList}>
              <Tab
                onClick={handleClickNewTteokguk}
                className={classNames(styles.tab, { [styles.selectedTab]: isSelectedTab(0) })}
              >
                새로운 떡국
              </Tab>
              <Tab
                onClick={handleClickCompletedTteokguk}
                className={classNames(styles.tab, { [styles.selectedTab]: isSelectedTab(1) })}
              >
                완성된 떡국
              </Tab>
            </TabList>
            <TabPanel className={styles.tabPanel}>
              {!isPending && tteokguks.length === 0 && (
                <div className={styles.noTteokguk}>
                  <div className={styles.noTteokgukTitle}>현재 응원을 요청하는 떡국이 없어요.</div>
                  <div>나만의 떡국을 만들고, 다른 사람들과 재료를 나눠보세요.</div>
                </div>
              )}
              <TteokgukWithCaptionList tteokguks={tteokguks} />
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              {!isPending && tteokguks.length === 0 && (
                <div className={styles.noTteokguk}>
                  <div className={styles.noTteokgukTitle}>아직 만들어진 떡국이 없어요.</div>
                  <div>도움이 필요한 떡국들에게 재료를 나눠주세요. </div>
                </div>
              )}
              <TteokgukWithCaptionList tteokguks={tteokguks} />
            </TabPanel>
          </Tabs>
          {isPending && <Loading />}

          {!isPending && (
            <BottomCTA>
              <Link to="/tteokguk/create" className={styles.link}>
                <Button color="secondary.100" applyColorTo="background" className={styles.button}>
                  소원 떡국 만들기
                </Button>
              </Link>
            </BottomCTA>
          )}
        </>

        {isFetchingNextPage && <Loading size="small" />}
        <div ref={fetchMoreRef} />
      </div>
    </>
  );
};

export default MainPage;

const styles = {
  container: css({
    position: "relative",
    width: "100%",
    height: "calc(100% - 4.8rem)",
    overflow: "auto",
    paddingBottom: "2rem",
  }),
  tabList: css({
    display: "flex",
    justifyContent: "center",
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
  link: css({
    width: "calc(100% - 4.8rem)",
    maxWidth: "45.2rem",
  }),
  button: css({
    position: "fixed",
    left: "50%",
    transform: "translateX(-50%)",
    width: "calc(100% - 4.8rem)",
    maxWidth: "45.2rem",
  }),
  buttonHidden: css({
    display: "none",
  }),
  isFetchingLoading: css({
    width: "50%",
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
