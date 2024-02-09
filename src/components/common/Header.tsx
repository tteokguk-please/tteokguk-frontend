import { ReactNode } from "react";

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
import HomeIcon from "@/assets/svg/home.svg";

interface Props {
  showSearchIcon?: true;
  showBackButton?: true;
  showHomeButton?: true;
  actionIcon?: "profile" | "guide";
  className?: string;
  children?: ReactNode;
}

const Header = ({
  showBackButton,
  showSearchIcon,
  showHomeButton,
  actionIcon,
  className,
  children,
}: Props) => {
  const navigation = useRouter();

  const handleClickBefore = () => {
    navigation.back();
  };

  return (
    <header className={classNames(styles.header, className)}>
      {showSearchIcon && (
        <Link to="/user/search" className={styles.icon}>
          <SearchIcon aria-label="검색" />
        </Link>
      )}
      {showBackButton && (
        <div onClick={handleClickBefore} className={styles.icon} aria-label="뒤로 가기">
          <BeforeIcon />
        </div>
      )}
      <div className={styles.title}>
        <h1>{children}</h1>
      </div>
      <div className={styles.actionIcon}>
        {showHomeButton && <HomeIconLink />}
        {actionIcon === "profile" && <ProfileIconLink />}
        {actionIcon === "guide" && <GuideModalButton />}
      </div>
    </header>
  );
};

export default Header;

const HomeIconLink = () => {
  return (
    <Link to="/tteokguks" className={styles.home}>
      <HomeIcon aria-label="홈" />
    </Link>
  );
};

const ProfileIconLink = () => {
  const handleClickProfile = () => {
    gtag("event", "click", { event_category: "마이 페이지 가기" });
  };

  return (
    <Link to="/my-page" onClick={handleClickProfile}>
      <ProfileIcon aria-label="프로필" />
    </Link>
  );
};

const GuideModalButton = () => {
  const guideOverlay = useOverlay();

  const handleClickGuideIcon = () => {
    gtag("event", "click", { event_category: "서비스 가이드 보기" });

    guideOverlay.open(({ isOpen, close }) => <GuideModal isOpen={isOpen} onClose={close} />);
  };

  return (
    <button onClick={handleClickGuideIcon}>
      <GuideIcon aria-label="가이드" />
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
  home: css({
    marginRight: "1.6rem",
  }),
};
