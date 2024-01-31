import { Fragment } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";

import { SignupFormValues } from "@/types/form";

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
        onSuccess: ({ nickname, primaryIngredient }) => {
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
      <Header hasPreviousPage>회원가입</Header>
      <SignupForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default SignupPage;
