import { Fragment, useState } from "react";

import { css } from "@styled-system/css";

import NoCheckIcon from "@/assets/svg/no-check.svg";
import CheckIcon from "@/assets/svg/check.svg";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";

const SignupPage = () => {
  const [isPrivacyChecked, setIsPrivacyChecked] = useState(true);
  const [isMarketingChecked, setIsMarketingChecked] = useState(false);

  const handleChangePrivacyCheckbox = () => {
    setIsPrivacyChecked(!isPrivacyChecked);
  };

  const handleChangeMarketingCheckbox = () => {
    setIsMarketingChecked(!isMarketingChecked);
  };

  return (
    <Fragment>
      <Header hasPreviousPage>회원가입</Header>
      <form className={styles.container}>
        <div>
          <Label htmlFor="email">이메일</Label>
          <div className={styles.emailContainer}>
            <Input id="email" type="email" placeholder="이메일을 입력해주세요" />
            <button type="button" className={styles.checkDuplicateButton}>
              중복확인
            </button>
          </div>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            type="password"
            placeholder="영어/숫자/특수문자 사용 8자 이상"
            className={styles.passwordInput}
          />
          <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
          <Input
            id="passwordConfirm"
            type="password"
            placeholder="영어/숫자/특수문자 사용 8자 이상"
            className={styles.passwordInput}
          />
          <Label htmlFor="nickname">닉네임</Label>
          <div className={styles.nicknameContainer}>
            <Input id="nickname" type="text" placeholder="닉네임 2~6자를 입력해주세요" />
            <button type="button" className={styles.checkDuplicateButton}>
              중복확인
            </button>
          </div>
        </div>
        <div className={styles.signupButtonContainer}>
          <div>
            <label
              htmlFor="privacy"
              aria-label="개인정보 수집 및 활용 동의"
              className={styles.privacyCheck}
            >
              {isPrivacyChecked ? <CheckIcon /> : <NoCheckIcon />}
              <span className={styles.checkTitle}>(필수) 개인정보 수집 · 활용 동의</span>
            </label>
            <input
              id="privacy"
              type="checkbox"
              className="a11y-hidden"
              checked={isPrivacyChecked}
              onChange={handleChangePrivacyCheckbox}
            />
            <label
              htmlFor="marketing"
              aria-label="마케팅 및 홍보 활용 동의"
              className={styles.privacyCheck}
            >
              {isMarketingChecked ? <CheckIcon /> : <NoCheckIcon />}
              <span className={styles.checkTitle}>(선택) 마케팅 · 홍보 활용 동의</span>
            </label>
            <input
              id="marketing"
              type="checkbox"
              className="a11y-hidden"
              checked={isMarketingChecked}
              onChange={handleChangeMarketingCheckbox}
            />
          </div>
          <Button color="primary.100" applyColorTo="background" className={styles.signupButton}>
            회원가입 하기
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default SignupPage;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",

    height: "100%",
    padding: "10rem 4rem 7.2rem 4rem",
  }),
  emailContainer: css({
    display: "flex",
    marginBottom: "1.6rem",
  }),
  checkDuplicateButton: css({
    display: "inline-block",
    width: "6.4rem",
    height: "3.7rem",
    borderRadius: "1rem",
    fontSize: "1.4rem",
    marginLeft: "0.8rem",
    backgroundColor: "primary.100",
  }),
  passwordInput: css({
    marginBottom: "1.6rem",
  }),
  nicknameContainer: css({
    display: "flex",
  }),
  signupButtonContainer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "7.2rem",
  }),
  privacyCheck: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  checkTitle: css({
    marginLeft: "0.8rem",
  }),
  signupButton: css({
    marginTop: "1.6rem",
  }),
};
