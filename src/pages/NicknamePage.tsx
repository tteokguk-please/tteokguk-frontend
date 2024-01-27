import { Fragment } from "react";
import { useForm } from "react-hook-form";

import { css } from "@styled-system/css";

import Header from "@/components/common/Header";
import Label from "@/components/common/Label";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

function NicknamePage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: { nickname: "" },
  });

  const nicknameRegister = register("nickname", {
    required: true,
    validate: (nickname: string) => {
      return (nickname.length >= 2 && nickname.length <= 6) || "닉네임은 2~6자 사이여야 합니다.";
    },
  });

  const onSubmit = ({ nickname }: { nickname: string }) => {
    console.log(nickname);
  };

  return (
    <Fragment>
      <Header hasPreviousPage>닉네임 설정하기</Header>
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
        <Button
          disabled={!isValid}
          color="primary.100"
          applyColorTo="background"
          className={styles.signupButton}
        >
          회원가입 완료하기
        </Button>
      </div>
    </Fragment>
  );
}

export default NicknamePage;

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
  signupButton: css({
    marginTop: "34.2rem",
  }),
};
