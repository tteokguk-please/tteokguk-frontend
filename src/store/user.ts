import { getUserDetails } from "@/apis/user";
import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

export const $userDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});
