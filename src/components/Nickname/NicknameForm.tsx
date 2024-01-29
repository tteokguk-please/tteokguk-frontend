import { useForm } from "react-hook-form";

import { css } from "@styled-system/css";

import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import CheckIcon from "@/assets/svg/check.svg";
import { NicknameFormValues } from "@/types/form";

interface Props {
  defaultValues: NicknameFormValues;
  onSubmit: (values: NicknameFormValues) => void | Promise<void>;
}

const NicknameForm = ({ defaultValues, onSubmit }: Props) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { privacy, marketing } = watch();

  const nicknameRegister = register("nickname", {
    required: true,
    validate: (nickname: string) => {
      return (nickname.length >= 2 && nickname.length <= 6) || "닉네임은 2~6자 사이여야 합니다.";
    },
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.labelContainer}>
          <Label htmlFor="nickname">닉네임</Label>
          {errors.nickname && <p className={styles.errorMessage}>{errors.nickname.message}</p>}
        </div>
        <div className={styles.nicknameContainer}>
          <Input
            {...nicknameRegister}
            id="nickname"
            type="text"
            placeholder="닉네임 2~6자를 입력해주세요"
          />
          <button type="button" className={styles.checkDuplicateButton}>
            중복확인
          </button>
        </div>
      </form>
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
        <Button disabled={!isValid} color="primary.100" applyColorTo="background">
          회원가입 완료하기
        </Button>
      </div>
    </div>
  );
};

export default NicknameForm;

const styles = {
  container: css({
    height: "calc(100vh - 4.8rem)",
    paddingX: "4rem",
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
  nicknameContainer: css({
    display: "flex",
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
  privacyCheck: css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  }),
  checkTitle: css({
    marginLeft: "0.8rem",
  }),
  footer: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "34.2rem",
  }),
  agreementContainer: css({
    marginBottom: "1.6rem",
  }),
};
