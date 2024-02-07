import { useRef, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

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
  const [tabIndex, setTabIndex] = useState(0);
  const isSelectedTab = (index: number) => index === tabIndex;
  const fetchMoreRef = useRef(null);

  const { tteokguks, isFetchingNextPage, hasNextPage, fetchNextPage, isPending, isError, refetch } =
    useAtomValue($tteokguksByTab(tabIndex));

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect,
  });

  if (!tteokguks || isError) {
    return <ErrorFallbackPage retry={refetch} />;
  }

  return (
    <>
      <Header showSearchIcon actionIcon="profile">
        <Link to="/tteokguks">
          <HeaderLogo aria-label="용용이" />
        </Link>
      </Header>
      <div className={styles.container}>
        <>
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
              <TteokgukWithCaptionList tteokguks={tteokguks} />
              {isFetchingNextPage && <Loading size="small" />}
            </TabPanel>
            <TabPanel className={styles.tabPanel}>
              <TteokgukWithCaptionList tteokguks={tteokguks} />
              {isFetchingNextPage && <Loading size="small" />}
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

        <div ref={fetchMoreRef} />
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
};
