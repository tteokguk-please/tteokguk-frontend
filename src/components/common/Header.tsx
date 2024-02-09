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
      <div className={styles.leftSection}>
        {showSearchIcon && (
          <Link to="/user/search" className={styles.icon}>
            <SearchIcon aria-label="검색" />
          </Link>
        )}
        {showBackButton && (
          <button onClick={handleClickBefore} className={styles.icon} aria-label="뒤로 가기">
            <BeforeIcon />
          </button>
        )}
      </div>
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
  return (
    <Link to="/my-page">
      <ProfileIcon aria-label="프로필" />
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
  leftSection: css({
    display: "flex",
    flex: 1,
    alignItems: "center",
  }),
  icon: css({
    cursor: "pointer",
  }),
  title: css({
    fontSize: "1.6rem",
    fontWeight: 700,
    userSelect: "none",
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
