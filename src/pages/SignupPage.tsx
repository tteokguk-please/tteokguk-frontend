import { Fragment } from "react";

import Header from "@/components/common/Header";
import { SignupFormValues } from "@/types/form/signup";
import SignupForm from "@/components/Signup/SignupForm";

const SignupPage = () => {
  const defaultValues: SignupFormValues = {
    email: "",
    password: "",
    passwordConfirm: "",
    nickname: "",
    privacy: true,
    marketing: false,
  };

  const handleSubmit = (values: SignupFormValues) => {
    console.log(values);
  };

  return (
    <Fragment>
      <Header hasPreviousPage>회원가입</Header>
      <SignupForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default SignupPage;
