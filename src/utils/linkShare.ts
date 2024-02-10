import { toast } from "sonner";

export const copyLink = async ({
  path,
  eventCategory,
}: {
  path: string;
  eventCategory: string;
}) => {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}${path}`);

    toast("링크 복사가 완료되었습니다.");
    gtag("event", "click", { event_category: eventCategory });
  } catch (error) {
    console.error(error);
  }
};
