import { Fragment } from "react";
import { useOverlay } from "@toss/use-overlay";

import Header from "@/components/common/Header";
import SignupForm from "@/components/Signup/SignupForm";
import WelcomModal from "@/components/shared/WelcomModal";
import { SignupFormValues } from "@/types/form/signup";

const SignupPage = () => {
  const defaultValues: SignupFormValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    privacy: true,
    marketing: false,
  };

  const welcomModal = useOverlay();

  const handleSubmit = (values: SignupFormValues) => {
    console.log(values);
    welcomModal.open(({ isOpen, close }) => (
      <WelcomModal isOpen={isOpen} onClose={close} nickname="민수르" uniqueIngredient="성공마늘" />
    ));
  };

  return (
    <Fragment>
      <Header hasPreviousPage>회원가입</Header>
      <SignupForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default SignupPage;
