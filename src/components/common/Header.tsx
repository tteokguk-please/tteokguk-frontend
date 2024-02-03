import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

import classNames from "classnames";
import { useOverlay } from "@toss/use-overlay";

import { css } from "@styled-system/css";

import useRouter from "@/routes/useRouter";
import { Link } from "@/routes/Link";
import GuideModal from "@/components/shared/GuideModal";
import BeforeIcon from "@/assets/svg/before.svg";
import ProfileIcon from "@/assets/svg/profile.svg";
import GuideIcon from "@/assets/svg/guide.svg";
import SearchIcon from "@/assets/svg/search.svg";

interface Props {
  hasPreviousPage?: true;
  actionIcon?: "profile" | "guide";
  className?: string;
  children?: ReactNode;
}

const Header = ({ hasPreviousPage, actionIcon, className, children }: Props) => {
  const location = useLocation();
  const navigation = useRouter();

  const handleClickBefore = () => {
    navigation.back();
  };

  const isMainPage = location.pathname === "/tteokguks";

  return (
    <header className={classNames(styles.header, className)}>
      {isMainPage && (
        <Link to="/search/user" className={styles.icon}>
          <SearchIcon aria-label="검색" />
        </Link>
      )}
      {!isMainPage && (
        <div onClick={handleClickBefore} className={styles.icon} aria-label="뒤로 가기">
          {hasPreviousPage && <BeforeIcon />}
        </div>
      )}
      <div className={styles.title}>
        <h1>{children}</h1>
      </div>
      <div className={styles.actionIcon}>
        {actionIcon === "profile" && <ProfileIconLink />}
        {actionIcon === "guide" && <GuideModalButton />}
      </div>
    </header>
  );
};

export default Header;

const ProfileIconLink = () => {
  return (
    <Link to="/my-page">
      <ProfileIcon />
    </Link>
  );
};

const GuideModalButton = () => {
  const guideOverlay = useOverlay();

  const handleClickGuideIcon = () => {
    guideOverlay.open(({ isOpen, close }) => <GuideModal isOpen={isOpen} onClose={close} />);
  };

  return (
    <button onClick={handleClickGuideIcon}>
      <GuideIcon />
    </button>
  );
};

const styles = {
  header: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    height: "4.8rem",
    padding: "0 1.6rem",
  }),
  icon: css({
    flex: 1,
    cursor: "pointer",
  }),
  title: css({
    fontSize: "1.6rem",
    fontWeight: 700,
  }),
  actionIcon: css({
    display: "flex",
    justifyContent: "flex-end",
    flex: 1,
  }),
};
