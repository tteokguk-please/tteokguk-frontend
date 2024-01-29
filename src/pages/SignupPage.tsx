import { Fragment } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";

import { SignupFormValues } from "@/types/form";

import Header from "@/components/common/Header";
import SignupForm from "@/components/Signup/SignupForm";
import WelcomModal from "@/components/shared/WelcomModal";
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
          welcomModal.open(({ isOpen, close }) => (
            <WelcomModal
              isOpen={isOpen}
              onClose={close}
              nickname={nickname}
              uniqueIngredient={INGREDIENT_NAME_BY_KEY[primaryIngredient]}
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
