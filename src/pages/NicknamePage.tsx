import { Fragment, useEffect } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";
import { toast } from "sonner";

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
        onSuccess: ({ nickname, primaryIngredient, accessToken, refreshToken }) => {
          localStorage.removeItem("kakaoToken");
          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

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

  useEffect(() => {
    toast("카카오 로그인이 정상적으로 완료되었습니다");
  }, []);

  return (
    <Fragment>
      <Header showBackButton>닉네임 설정하기</Header>
      <NicknameForm defaultValues={defaultValues} onSubmit={handleSubmit} />
    </Fragment>
  );
};

export default NicknamePage;
