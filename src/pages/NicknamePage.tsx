import { Fragment } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";

import { NicknameFormValues } from "@/types/form";

import Header from "@/components/common/Header";
import NicknameForm from "@/components/Nickname/NicknameForm";
import { $postKakaoUserSignup } from "@/store/auth";
import WelcomeModal from "@/components/shared/WelcomeModal";

const NicknamePage = () => {
  const welcomeModal = useOverlay();
  const defaultValues: NicknameFormValues = { nickname: "", privacy: false, marketing: false };

  const { mutate: postKakaoUserSignup } = useAtomValue($postKakaoUserSignup);

  const handleSubmit = ({ nickname, marketing }: NicknameFormValues) => {
    postKakaoUserSignup(
      {
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
      <Header hasPreviousPage>닉네임 설정하기</Header>
      <NicknameForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default NicknamePage;
