import { Fragment } from "react";

import Header from "@/components/common/Header";
import { NicknameFormValues } from "@/types/form";
import NicknameForm from "@/components/Nickname/NicknameForm";

const NicknamePage = () => {
  const defaultValues: NicknameFormValues = { nickname: "", privacy: true, marketing: false };

  const handleSubmit = (values: NicknameFormValues) => {
    console.log(values);
  };

  return (
    <Fragment>
      <Header hasPreviousPage>닉네임 설정하기</Header>
      <NicknameForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default NicknamePage;
