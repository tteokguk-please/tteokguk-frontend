import { Fragment, useEffect } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";

import Header from "@/components/common/Header";
import SignupForm from "@/components/Signup/SignupForm";
import WelcomModal from "@/components/shared/WelcomModal";
import { SignupFormValues } from "@/types/form/signup";
import { $signup } from "@/store/auth";
import { INGREDIENT_NAME_BY_KEY } from "@/constants/ingredient";

const SignupPage = () => {
  const welcomModal = useOverlay();
  const defaultValues: SignupFormValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    privacy: true,
    marketing: false,
  };

  const { mutate: signup, data: signupResponse, error: signupError } = useAtomValue($signup);

  const handleSubmit = async ({ email, password, nickname, marketing }: SignupFormValues) => {
    signup({
      email,
      password,
      nickname,
      acceptsMarketing: marketing,
    });
  };

  useEffect(() => {
    if (signupResponse) {
      welcomModal.open(({ isOpen, close }) => (
        <WelcomModal
          isOpen={isOpen}
          onClose={close}
          nickname={signupResponse.nickname}
          uniqueIngredient={INGREDIENT_NAME_BY_KEY[signupResponse.primaryIngredient]}
        />
      ));
    }
    if (signupError) {
      // TODO: 예외 처리
      console.log("signup error");
    }
  }, [signupResponse, signupError]);

  return (
    <Fragment>
      <Header hasPreviousPage>회원가입</Header>
      <SignupForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default SignupPage;
