import { useForm } from "react-hook-form";
import { MouseEvent, useEffect, useState } from "react";

import { useAtomValue } from "jotai";

import { useDailog } from "@/hooks/useDialog";

import { css } from "@styled-system/css";

import { NicknameFormValues } from "@/types/form";

import PrivacyConfirmView from "../shared/PrivacyConfirmView";
import MarketingConfirmView from "../shared/MarketingConfirmView";

import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import CheckIcon from "@/assets/svg/check.svg";
import { $checkNickname } from "@/store/auth";

interface Props {
  defaultValues: NicknameFormValues;
  onSubmit: (values: NicknameFormValues) => void | Promise<void>;
}

const NicknameForm = ({ defaultValues, onSubmit }: Props) => {
  const { confirm } = useDailog();
  const {
    register,
    watch,
    setValue,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { nickname, privacy, marketing } = watch();

  const validateNickname = (nickname: string) => nickname.length >= 2 && nickname.length <= 6;

  const nicknameRegister = register("nickname", {
    required: true,
    validate: (nickname: string) => {
      return validateNickname(nickname) || "닉네임은 2~6자 사이여야 합니다.";
    },
  });

  const { data: checkNicknameReponse, mutate: checkNickname } = useAtomValue($checkNickname);
  const [isExistNickname, setIsExistNickname] = useState<boolean | null>(null);
  const isDisabledSignupButton = !isValid || isExistNickname !== false;

  const handleCheckNickname = () => {
    checkNickname(nickname);
  };

  const handleClickPrivacy = async (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const confirmed = await confirm({
      description: <PrivacyConfirmView />,
      confirmButton: { text: "동의" },
      cancelButton: { text: "미동의" },
    });
    setValue("privacy", confirmed, { shouldValidate: true });
  };

  const handleClickMarketing = async (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();

    const confirmed = await confirm({
      description: <MarketingConfirmView />,
      confirmButton: { text: "동의" },
      cancelButton: { text: "미동의" },
    });
    setValue("marketing", confirmed, { shouldValidate: true });
  };

  useEffect(() => {
    if (checkNicknameReponse) {
      setIsExistNickname(checkNicknameReponse.isExist);
    }
    if (checkNicknameReponse?.isExist) {
      setError("nickname", { message: "이미 사용 중인 닉네임입니다." });
    }
  }, [checkNicknameReponse, setIsExistNickname, setError]);

  useEffect(() => {
    setIsExistNickname(null);
  }, [nickname, setIsExistNickname]);

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div>
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
            className={styles.nicknameInput}
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
      <div className={styles.footer}>
        <div className={styles.agreementContainer}>
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
            onChange={(e) => e.preventDefault()}
            onClick={handleClickPrivacy}
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
            onChange={(e) => e.preventDefault()}
            onClick={handleClickMarketing}
          />
        </div>
        <Button disabled={isDisabledSignupButton} color="primary.100" applyColorTo="background">
          회원가입 완료하기
        </Button>
      </div>
    </form>
  );
};

export default NicknameForm;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 4.8rem)",
    paddingX: "4rem",
    "@media (max-width: 500px)": {
      paddingTop: "0.8rem",
    },
    "@media (min-width: 501px)": {
      paddingTop: "3.2rem",
    },
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
  nicknameContainer: css({
    display: "flex",
    width: "100%",
  }),
  nicknameInput: css({
    flex: 1,
  }),
  checkDuplicateButton: css({
    display: "inline-block",
    minWidth: "6.4rem",
    height: "3.7rem",
    borderRadius: "1rem",
    fontSize: "1.4rem",
    marginLeft: "0.8rem",
    backgroundColor: "primary.100",
    "@media (min-width: 501px)": {
      width: "9.9rem",
    },
  }),
  privacyCheck: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    fontSize: "1.4rem",
    cursor: "pointer",
  }),
  checkTitle: css({
    marginLeft: "0.8rem",
  }),
  footer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 500px)": {
      marginTop: "29.6rem",
    },
    "@media (min-width: 501px)": {
      marginTop: "7.2rem",
    },
  }),
  agreementContainer: css({
    marginBottom: "1.6rem",
  }),
};
