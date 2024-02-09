import { Fragment } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";

import { setLocalStorage } from "@/utils/localStorage";

import { SignupFormValues } from "@/types/form";

import Meta from "./Meta";

import Header from "@/components/common/Header";
import SignupForm from "@/components/Signup/SignupForm";
import WelcomeModal from "@/components/shared/WelcomeModal";
import { $signup } from "@/store/auth";

const SignupPage = () => {
  const welcomeModal = useOverlay();
  const defaultValues: SignupFormValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    privacy: false,
    marketing: false,
  };

  const { mutate: signup } = useAtomValue($signup);

  const handleSubmit = async ({ email, password, nickname, marketing }: SignupFormValues) => {
    signup(
      {
        email,
        password,
        nickname,
        acceptsMarketing: marketing,
      },
      {
        onSuccess: ({ nickname, primaryIngredient, accessToken, refreshToken }) => {
          gtag("event", "sign_up", { event_category: "이메일로 회원가입" });

          setLocalStorage("accessToken", accessToken);
          setLocalStorage("refreshToken", refreshToken);

          welcomeModal.open(({ isOpen, close }) => (
            <WelcomeModal
              isOpen={isOpen}
              onClose={close}
              nickname={nickname}
              uniqueIngredientKey={primaryIngredient}
            />
          ));
        },
      },
    );
  };

  return (
    <Fragment>
      <Meta
        path="/signup"
        title="회원가입 페이지"
        description="더 많은 기능을 사용하기 위해 회원가입을 해보세요"
      />
      <Header showBackButton>회원가입</Header>
      <SignupForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default SignupPage;
