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

interface Props {
  hasPreviousPage?: true;
  actionIcon?: "profile" | "guide";
  className?: string;
  children: ReactNode;
}

const Header = ({ hasPreviousPage, actionIcon, className, children }: Props) => {
  const navigation = useRouter();

  const handleClickBefore = () => {
    navigation.back();
  };

  return (
    <header className={classNames(styles.header, className)}>
      <div onClick={handleClickBefore} className={styles.beforeIcon} aria-label="뒤로 가기">
        {hasPreviousPage && <BeforeIcon />}
      </div>
      <div className={styles.title}>
        <h1>{children}</h1>
      </div>
      <div className={styles.actionIcon}>
        {actionIcon === "profile" && <Profile />}
        {actionIcon === "guide" && <Guide />}
      </div>
    </header>
  );
};

export default Header;

const Profile = () => {
  return (
    <Link to="/my-page">
      <ProfileIcon />
    </Link>
  );
};

const Guide = () => {
  const guideOverlay = useOverlay();

  const handleClickGuideIcon = () => {
    guideOverlay.open(({ isOpen, close }) => <GuideModal isOpen={isOpen} close={close} />);
  };

  return (
    <div onClick={handleClickGuideIcon}>
      <GuideIcon />
    </div>
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
  beforeIcon: css({
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
