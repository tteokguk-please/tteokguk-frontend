import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { SignupFormValues } from "@/types/form";

import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import Button from "@/components/common/Button";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import CheckIcon from "@/assets/svg/check.svg";
import { $checkEmail, $checkNickname } from "@/store/auth";

interface Props {
  defaultValues: SignupFormValues;
  onSubmit: (values: SignupFormValues) => void | Promise<void>;
}

const EMAIL_REGEX = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const PASSWORD_REGEX = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$/;

const SignupForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormValues>({
    mode: "onChange",
    defaultValues,
  });

  const { password, passwordConfirm, privacy, marketing, email, nickname } = watch();

  const validateEmail = EMAIL_REGEX.test(email);
  const validateNickname = (nickname: string) => nickname.length >= 2 && nickname.length <= 6;

  const emailRegister = register("email", {
    required: true,
    pattern: {
      value: EMAIL_REGEX,
      message: "이메일 형식을 확인해주세요.",
    },
  });

  const passwordRegister = register("password", {
    required: true,
    validate: (password: string) => {
      if (!PASSWORD_REGEX.test(password)) {
        return "영어/숫자/특수문자를 사용해주세요.";
      }
      if (password.length < 8) {
        return "8자 이상 입력해주세요.";
      }
      return true;
    },
  });

  const passwordConfirmRegister = register("passwordConfirm", {
    validate: (passwordConfirm: string) =>
      passwordConfirm === password || "비밀번호가 일치하지 않습니다.",
  });

  const nicknameRegister = register("nickname", {
    required: true,
    validate: (nickname: string) => {
      return validateNickname(nickname) || "닉네임은 2~6자 사이여야 합니다.";
    },
  });

  const { data: checkEmailReponse, mutate: checkEmail } = useAtomValue($checkEmail);
  const { data: checkNicknameReponse, mutate: checkNickname } = useAtomValue($checkNickname);

  const [isExistEmail, setIsExistEmail] = useState<boolean | null>(null);
  const [isExistNickname, setIsExistNickname] = useState<boolean | null>(null);
  const isDisabledSignupButton = !isValid || isExistEmail !== false || isExistNickname !== false;

  const handleCheckEmail = () => {
    checkEmail(email);
  };

  const handleCheckNickname = () => {
    checkNickname(nickname);
  };

  useEffect(() => {
    if (checkEmailReponse) {
      setIsExistEmail(checkEmailReponse.isExist);
    }
    if (checkEmailReponse?.isExist) {
      setError("email", { message: "이미 사용 중인 이메일입니다." });
    }
  }, [checkEmailReponse, setIsExistEmail, setError]);

  useEffect(() => {
    if (checkNicknameReponse) {
      setIsExistNickname(checkNicknameReponse.isExist);
    }
    if (checkNicknameReponse?.isExist) {
      setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
    }
  }, [checkNicknameReponse, setIsExistNickname, setError]);

  useEffect(() => {
    setIsExistEmail(null);
  }, [email, setIsExistEmail]);

  useEffect(() => {
    setIsExistNickname(null);
  }, [nickname, setIsExistNickname]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <div>
          <div className={styles.labelContainer}>
            <Label htmlFor="email">이메일</Label>
            {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
            {isExistEmail === false && (
              <p className={styles.successMessage}>사용 가능한 이메일입니다.</p>
            )}
          </div>
          <div className={styles.emailContainer}>
            <Input {...emailRegister} id="email" type="email" placeholder="이메일을 입력해주세요" />
            <button
              type="button"
              className={styles.checkDuplicateButton}
              disabled={!validateEmail}
              onClick={handleCheckEmail}
            >
              중복확인
            </button>
          </div>

          <div className={styles.labelContainer}>
            <Label htmlFor="password">비밀번호</Label>
            {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
          </div>
          <Input
            {...passwordRegister}
            id="password"
            type="password"
            placeholder="영어/숫자/특수문자 사용 8자 이상"
            className={styles.passwordInput}
          />

          <div className={styles.labelContainer}>
            <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
            {errors.passwordConfirm && (
              <p className={styles.errorMessage}>{errors.passwordConfirm.message}</p>
            )}
            {passwordConfirm && !errors.passwordConfirm && (
              <p className={styles.successMessage}>비밀번호가 일치합니다.</p>
            )}
          </div>
          <Input
            {...passwordConfirmRegister}
            id="passwordConfirm"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            className={styles.passwordInput}
          />

          <div className={styles.labelContainer}>
            <Label htmlFor="nickname">닉네임</Label>
            {errors.nickname && <p className={styles.errorMessage}>{errors.nickname.message}</p>}
            {isExistNickname === false && (
              <p className={styles.successMessage}>사용 가능한 닉네임입니다.</p>
            )}
          </div>
          <div className={styles.nicknameContainer}>
            <Input
              {...nicknameRegister}
              id="nickname"
              type="text"
              placeholder="닉네임 2~6자를 입력해주세요"
            />
            <button
              type="button"
              className={styles.checkDuplicateButton}
              disabled={!validateNickname(nickname)}
              onClick={handleCheckNickname}
            >
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
              {privacy ? <CheckIcon /> : <NoCheckIcon />}
              <span className={styles.checkTitle}>(필수) 개인정보 수집 · 활용 동의</span>
            </label>
            <input
              {...register("privacy", { required: true })}
              id="privacy"
              type="checkbox"
              className="a11y-hidden"
            />

            <label
              htmlFor="marketing"
              aria-label="마케팅 및 홍보 활용 동의"
              className={styles.privacyCheck}
            >
              {marketing ? <CheckIcon /> : <NoCheckIcon />}
              <span className={styles.checkTitle}>(선택) 마케팅 · 홍보 활용 동의</span>
            </label>
            <input
              {...register("marketing")}
              id="marketing"
              type="checkbox"
              className="a11y-hidden"
            />
          </div>
          <Button
            color="primary.100"
            applyColorTo="background"
            disabled={isDisabledSignupButton}
            className={styles.signupButton}
          >
            회원가입 하기
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default SignupForm;

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
  labelContainer: css({
    display: "flex",
    alignItems: "baseline",
    marginBottom: "0.6rem",
  }),
  errorMessage: css({
    fontSize: "1.2rem",
    color: "red.100",
    marginLeft: "0.4rem",
  }),
  successMessage: css({
    fontSize: "1.2rem",
    color: "green.100",
    marginLeft: "0.4rem",
  }),
};
